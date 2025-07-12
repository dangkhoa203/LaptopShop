using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
namespace APIShopLaptop.Feature.Admin.Products.Images {
    public class AddImageToProduct : IEndpoint {
        public record Request(IFormFileCollection Images);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Products/{id}/Images", Handler).WithTags("Admin_Products").DisableAntiforgery();
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler([FromRoute] string id, [FromForm] Request request, IWebHostEnvironment env, ApplicationDBContext context) {
            Product? Product = await context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (Product == null) {
                return Results.NotFound(new Response(false, "Không tìm thấy sản phẩm!"));
            }
            string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
            string ProductImagePath = Path.Combine(StoragePath, id);
            List<ProductImage> Images = new ();
            for (int i = 0; i < request.Images.Count; i++) {
                var file = request.Images[i];
                var stream = file.OpenReadStream();
                var ProductImage = new ProductImage();
                using (Image image = Image.Load(stream)) {
                    image.Mutate(x => { x.Resize(1000, 1000); });
                    image.SaveAsJpeg(Path.Combine(ProductImagePath, $"{ProductImage.Id}.jpg"));
                }
                ProductImage.Product = Product;
                Images.Add(ProductImage);
            }
            await context.ProductImages.AddRangeAsync(Images);
            if (await context.SaveChangesAsync() > 0) {
                return Results.Ok(new Response(true, ""));
            }
            foreach (var image in Images) {
                if (File.Exists(Path.Combine(ProductImagePath, $"{image.Id}.jpg"))) {
                    File.Delete(Path.Combine(ProductImagePath, $"{image.Id}.jpg"));
                }
            }
            return Results.BadRequest(new Response(false, "Lỗi thực hiện"));
        }
    }
}
