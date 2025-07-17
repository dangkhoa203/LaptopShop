using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace APIShopLaptop.Feature.Admin.Products.Images {
    public class UpdateProductThumbnail : IEndpoint {
        public record Request(IFormFile Thumbnail);
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Product/{id}/Thumbnail", Handler).WithTags("Admin_Product").DisableAntiforgery();
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler([FromForm] Request request, string id, ApplicationDBContext context, IWebHostEnvironment env) {
            var NewThumbnail = new ProductImage() { IsThumbnail = true };
            string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
            string ProductImagePath = Path.Combine(StoragePath, id);
            try {
                var Product = await context.Products
                    .Include(p => p.Images)
                    .Where(p => p.Id == id)
                    .FirstOrDefaultAsync();
                NewThumbnail.Product = Product;
                var productThumbnail = Product.Images.FirstOrDefault(i => i.IsThumbnail);
                Product.Images.Remove(productThumbnail);
                context.ProductImages.Remove(productThumbnail);

                Product.Images.Add(NewThumbnail);
                if (await context.SaveChangesAsync() > 0) {
                    var stream = request.Thumbnail.OpenReadStream();
                    var newThumbnail = new ProductImage();
                    using (Image image = Image.Load(stream)) {
                        image.Mutate(x => { x.Resize(600, 600); });
                        image.SaveAsJpeg(Path.Combine($"{ProductImagePath}/{NewThumbnail.Id}.jpg"));
                    }
                    File.Delete($"{ProductImagePath}/{productThumbnail.Id}.jpg");
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi thực hiện"));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, "Lỗi server!"));
            }
        }
    }
}
