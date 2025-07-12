using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Category {
    public class GetProductCategories : IEndpoint {
        public record Response(bool Success,List<string> data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Products/{id}/Category", Handler).WithTags("Admin_Products");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(string id, ApplicationDBContext context) {
            try {
                var Product = await context.Products
                    .Include(p=>p.CateroryItems)
                    .Where(p => p.Id == id)
                    .FirstOrDefaultAsync();
                if (Product == null)
                    return Results.NotFound(new Response(false, null, "Không tìm thấy sản phẩm!"));

                return Results.Ok(new Response(true, Product.CateroryItems.Select(i=>i.CateroryId).ToList(), ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi server đã xảy ra!"));
            }
        }
    }
}
