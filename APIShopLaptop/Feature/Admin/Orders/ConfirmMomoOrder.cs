using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Middleware.Momo;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.Orders {
    public class ConfirmMomoOrder : IEndpoint {
        public record Request(string orderId);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Orders/Confirm", Handler).WithTags("Admin_Orders");
        }

        private static async Task<IResult> Handler([FromBody] Request request, MoMoService moMoService, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Order = await context.Orders
                    .Include(o=>o.MomoTransaction)
                    .Where(o =>o.PaymentMethod == PAYMENTMETHOD.MOMO)
                    .FirstOrDefaultAsync(o => o.Id == request.orderId);
                if (Order == null) {
                    return Results.BadRequest(new Response(false, "Lỗi"));
                }
                if(!Order.MomoTransaction.IsPaid) {
                    return Results.BadRequest(new Response(false, "Đơn hàng chưa thanh toán!"));
                }
                Order.Status = ORDERSTATUS.WAITING;
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, "Lỗi Server"));
            }
        }
    }
}
