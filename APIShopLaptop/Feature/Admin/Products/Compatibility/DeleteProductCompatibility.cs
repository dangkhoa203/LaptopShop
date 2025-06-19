using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Compatibility {
    public class DeleteProductCompatibility : IEndpoint {
        public record Request(string Id);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapDelete("/api/Admin/Products/{id}/Compatibility", Handler).WithTags("Admin_Products");
        }

        private static async Task<IResult> Handler([FromBody] Request request, string id, ApplicationDBContext context) {
            try {
                var Data = await context.CompatibilityData.FirstOrDefaultAsync(d => d.ProductId == id && d.SpecificationId == request.Id);
                if (Data == null) {
                    return Results.NotFound(new Response(false, "Không tìm thấy thông số!"));
                }
                context.CompatibilityData.Remove(Data);
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!"));
            }
        }
    }
}
