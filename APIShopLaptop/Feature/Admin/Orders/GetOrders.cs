using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Orders {
    public class GetOrders:IEndpoint {
        public record OrderDTO(string Id, DateTime DateOfOrder,ORDERSTATUS Status, string UserID,string UserName,bool IsMomoPaid, PAYMENTMETHOD PaymentMethod);
        public record Response(bool Success, List<OrderDTO>? data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Orders", Handler).WithTags("Admin_Orders");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Orders = await context.Orders
                     .Include(o => o.User)
                     .Include(o=>o.MomoTransaction)
                     .Include(o => o.Details)
                        .ThenInclude(d => d.ProductNavigation)
                     .OrderByDescending(o=>o.DateOfOrder)   
                     .Select(o => new OrderDTO(
                         o.Id,
                         o.DateOfOrder,
                         o.Status,
                         o.User.Id,
                         o.User.UserName,
                         o.MomoTransaction == null ? false : o.MomoTransaction.IsPaid,
                         o.PaymentMethod
                         ))
                     .ToListAsync();
                return Results.Ok(new Response(true, Orders, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
