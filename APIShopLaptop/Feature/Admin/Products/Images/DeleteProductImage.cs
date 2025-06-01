using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Images {
    public class DeleteProductImage : IEndpoint {
        public record Request(string Id);
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapDelete("/api/Admin/Products/{id}/Images", Handler).WithTags("Admin_Products");
        }
        public static async Task<IResult> Handler([FromBody]Request request, string id, ApplicationDBContext context, IWebHostEnvironment env) {
            try {
                string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
                string ProductImagePath = Path.Combine(StoragePath, id);
                var image = await context.ProductImages.FirstOrDefaultAsync(i => i.Id == request.Id);
                if (image == null) {
                    return Results.BadRequest(new Response(false, "Không tìm thấy ảnh!"));
                }
                context.ProductImages.Remove(image);
                if (await context.SaveChangesAsync() > 0) {
                    if (File.Exists($"{ProductImagePath}/{request.Id}.jpg")) {
                        File.Delete($"{ProductImagePath}/{request.Id}.jpg");
                    }
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi thực hiện!"));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, "Lỗi Server"));
            }
        }
    }
}
