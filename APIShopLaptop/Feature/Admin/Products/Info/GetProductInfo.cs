using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Info {
    public class GetProductInfo : IEndpoint {
        public record ProductDTO(string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount, PRODUCTSTATUS Status, string BrandId);
        public record Response(bool Success, ProductDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Products/{id}/Info", Handler).WithTags("Admin_Products");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler([FromRoute] string id, ApplicationDBContext context) {
            try {
                var Product = await context.Products
                    .Where(p => p.Id == id)
                    .Include(p => p.Brand)
                    .Select(p => new ProductDTO(
                        p.Name,
                        p.Price,
                        p.Quantity,
                        p.IsDiscount,
                        p.PriceAfterDiscount,
                        p.Status,
                        p.Brand.Id
                        ))
                    .FirstOrDefaultAsync();
                if (Product == null)
                    return Results.NotFound(new Response(false, null, "Không tìm thấy sản phẩm!"));
                return Results.Ok(new Response(true, Product, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, null, "Lỗi đã xảy ra!"));
            }
        }
    }
}
