using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Products {
    public class GetProductReviews : IEndpoint {
        public record ReviewDTO(string Content, float Score, string UserName);
        public record Response(bool Success, List<ReviewDTO> Data,int Total, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Products/{id}/Reviews", Handler).WithTags("Products");
        }
        private static async Task<IResult> Handler([FromRoute] string id, [FromQuery]int preview, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Product = await context.Products
                    .Include(p => p.Reviews)
                        .ThenInclude(r => r.User)
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (Product == null) {
                    return Results.BadRequest(new Response(false, [],0, "Lỗi đã xảy ra!"));
                }
                int Total=Product.Reviews.Count;
                List<ReviewDTO> Reviews;
                if (preview == 0) {
                    Reviews = Product.Reviews.Select(r => new ReviewDTO(r.Content, r.Score, r.User.UserName)).ToList();
                }
                else {
                    Reviews = Product.Reviews.Select(r => new ReviewDTO(r.Content, r.Score, r.User.UserName)).Take(3).ToList();
                }
                return Results.Ok(new Response(true, Reviews,0, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [],0, "Lỗi đã xảy ra!"));
            }
        }
    }
}