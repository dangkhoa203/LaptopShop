using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using static APIShopLaptop.Feature.User.Cart.GetCurrentCart;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using APIShopLaptop.Model.Enum;

namespace APIShopLaptop.Feature.User.Orders {
    public class GetOrders:IEndpoint {
        public record OrderDTO(string Id,DateTime OrderDate,float Value,ORDERSTATUS Status,List<string> DetailId,bool IsMomoPaid,PAYMENTMETHOD PaymentMethod);
        public record Response(bool Success, List<OrderDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Orders", Handler).WithTags("Order");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context, ClaimsPrincipal User) {
            try {

                var Order = await context.Users
                    .Include(u => u.Orders)
                        .ThenInclude(u => u.Details)
                    .Include(u => u.Orders)
                        .ThenInclude(u=>u.MomoTransaction)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Orders)
                    .FirstOrDefaultAsync();

                var Data = Order.OrderByDescending(o=>o.DateOfOrder).Select(o => new OrderDTO(
                        o.Id,
                        o.DateOfOrder,
                        o.Value,
                        o.Status,
                        o.Details.Select(d => d.ProductId).ToList(),
                        o.MomoTransaction==null ? false : o.MomoTransaction.IsPaid,
                        o.PaymentMethod
                    )).ToList();
                return Results.Ok(new Response(true, Data, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi server!"));
            }

        }
    }
}
