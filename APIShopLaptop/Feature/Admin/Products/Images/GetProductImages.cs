using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Images {
    public class GetProductImages : IEndpoint {
        public record Response(bool Success, List<string> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Products/{id}/Images", Handler).WithTags("Admin_Products");
        }
        private static async Task<IResult> Handler([FromRoute] string id, ApplicationDBContext context) {
            try {
                var Images = await context.Products
                    .Where(p => p.Id == id)
                    .Include(p => p.Images)
                    .Select(p => p.Images.Where(i => !i.IsThumbnail).Select(i => i.Id).ToList())
                    .FirstOrDefaultAsync();
                if (Images == null)
                    return Results.NotFound(new Response(false, [], "Không tìm thấy sản phẩm!"));
                return Results.Ok(new Response(true, Images, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, null, "Lỗi đã xảy ra!"));
            }
        }
    }
}
