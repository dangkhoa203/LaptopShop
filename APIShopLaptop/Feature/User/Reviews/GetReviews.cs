using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Reviews {
    public class GetReviews : IEndpoint {
        public record ReviewDTO(string Id, string Content,float Score,string productId,string productName,DateTime ReviewDate);
        public record Response(bool Success, List<ReviewDTO>? Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Reviews", Handler).WithTags("Reviews");
        }
        [Authorize(Roles = "User")]
        private static async Task<IResult> Handler(ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Account = await context.Users.Include(u => u.Reviews).ThenInclude(r=>r.Product).FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (Account == null) {
                    return Results.BadRequest(new Response(false,[],"Lỗi xảy ra khi đang thực hiện!"));
                }
                var Reviews= Account.Reviews.Select(r=>new ReviewDTO(r.Id,r.Content,r.Score,r.Product.Id,r.Product.Name,r.DateOfReview)).ToList();
                return Results.Ok(new Response(true, Reviews, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi server đã xảy ra!"));
            }

        }
    }
}
