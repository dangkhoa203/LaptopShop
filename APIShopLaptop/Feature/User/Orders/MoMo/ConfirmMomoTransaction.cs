using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Middleware.Momo;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Orders.MoMo {
    public class ConfirmMomoTransaction : IEndpoint {
        public record Request(string orderId,string requestId, string transactionId);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Orders/Momo/Confirm", Handler).WithTags("Orders");
        }

        private static async Task<IResult> Handler([FromBody] Request request, MoMoService moMoService, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Id = request.orderId.Substring(0,9);
                var Order = await context.Orders.Include(o => o.MomoTransaction)
                    .Where(o =>
                    !o.MomoTransaction.IsPaid &&
                    o.PaymentMethod == PAYMENTMETHOD.MOMO)
                    .FirstOrDefaultAsync(o => o.Id == Id);
                if (Order == null) {
                    return Results.BadRequest(new Response(false, "Lỗi"));
                }
                if (Order.MomoTransaction.RequestId != request.requestId) {
                    return Results.BadRequest(new Response(false, "Lỗi"));
                }
                Order.MomoTransaction.IsPaid = true;
                Order.MomoTransaction.TransactionDate = DateTime.Now;
                Order.MomoTransaction.TransactionId = request.transactionId;
                Order.MomoTransaction.RequestId = "";

                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, "Lỗi server!"));
            }
        }
    }
}
