using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Reviews {
    public class GetReviewAble : IEndpoint {
        public record DetailDTO(string OrderId,string ProductId,string ProductName,DateTime OrderDate);
        public record Response(bool Success, List<DetailDTO>? data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Reviews/ReviewAble", Handler).WithTags("Reviews");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Orders = await context.Users
                    .Include(u => u.Orders)
                        .ThenInclude(u => u.Details)
                            .ThenInclude(d=>d.ProductNavigation)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Orders.Where(o=>o.Status == ORDERSTATUS.FINISHED).ToList())
                    .FirstOrDefaultAsync();
                List<DetailDTO> ReviewAble=[];
                foreach(var order in Orders) {
                    foreach(var detail in order.Details) {
                        if(await context.Reviews
                                .Include(r => r.Product)
                                .Include(r => r.Order)
                                .FirstOrDefaultAsync(r => r.Product.Id == detail.ProductId && r.Order.Id == detail.OrderId) == null
                            ) {
                            ReviewAble.Add(new DetailDTO(detail.OrderId, detail.ProductId,detail.ProductNavigation.Name,order.DateOfOrder));
                        }
                    }
                }
                return Results.Ok(new Response(true, ReviewAble, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
