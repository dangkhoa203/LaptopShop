using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;

namespace APIShopLaptop.Feature.Admin.Products.Images {
    public class GetProductImage : IEndpoint {
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Product/{id}/Images/{imageId}", Handler).WithTags("Admin_Product");
        }
        private static async Task<IResult> Handler(string id, string imageId, ApplicationDBContext context, IWebHostEnvironment env) {
            string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
            string ProductImagePath = Path.Combine(StoragePath, id);
            var image = File.OpenRead($"{ProductImagePath}/{imageId}.jpg");
            return Results.File(image, "image/jpeg");
        }
    }
}
