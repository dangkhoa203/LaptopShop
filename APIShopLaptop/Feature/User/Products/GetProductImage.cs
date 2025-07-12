using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;

namespace APIShopLaptop.Feature.User.Products {
    public class GetProductImage : IEndpoint {
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Products/{id}/Images/{imageId}", Handler).WithTags("Product");
        }
        private static async Task<IResult> Handler(string id, string imageId, ApplicationDBContext context, IWebHostEnvironment env) {
            string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
            string ProductImagePath = Path.Combine(StoragePath, id);
            var Image = File.OpenRead($"{ProductImagePath}/{imageId}.jpg");
            return Results.File(Image, "image/jpeg");
        }
    }
}
