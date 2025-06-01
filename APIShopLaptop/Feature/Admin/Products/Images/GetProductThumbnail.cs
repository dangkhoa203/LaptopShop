using APIShopLaptop.Data;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Images {
    public class GetProductThumbnail {
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Product/{id}/Thumbnail", Handler).WithTags("Admin_Product");
        }
        private static async Task<IResult> Handler(string id, ApplicationDBContext context, IWebHostEnvironment env) {
            string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
            string ProductImagePath = Path.Combine(StoragePath, id);
            var thumbnail = await context.Products
                .Include(p => p.Images)
                .Where(p => p.Id == id)
                .Select(p => p.Images.FirstOrDefault(i => i.IsThumbnail).Id)
                .FirstOrDefaultAsync();
            var image = File.OpenRead($"{ProductImagePath}/{thumbnail}.jpg");
            return Results.File(image, "image/jpeg");
        }
    }
}
