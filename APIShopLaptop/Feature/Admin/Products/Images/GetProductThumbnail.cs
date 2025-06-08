using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Images {
    public class GetProductThumbnail:IEndpoint {
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Product/{id}/Thumbnail", Handler).WithTags("Admin_Product");
        }
        private static async Task<IResult> Handler(string id, ApplicationDBContext context, IWebHostEnvironment env) {
            string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
            string ProductImagePath = Path.Combine(StoragePath, id);
            var Thumbnail = await context.Products
                .Include(p => p.Images)
                .Where(p => p.Id == id)
                .Select(p => p.Images.FirstOrDefault(i => i.IsThumbnail).Id)
                .FirstOrDefaultAsync();
            var image = File.OpenRead($"{ProductImagePath}/{Thumbnail}.jpg");
            return Results.File(image, "image/jpeg");
        }
    }
}
