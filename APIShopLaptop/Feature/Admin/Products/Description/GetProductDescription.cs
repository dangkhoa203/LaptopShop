using APIShopLaptop.Data;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Description {
    public class GetProductDescription {
        public record Response(bool Success, string Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Products/{id}/Description", Handler).WithTags("Admin_Products");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler([FromRoute] string id, ApplicationDBContext context) {
            try {
                var Description = await context.Products
                    .Where(p => p.Id == id)
                    .Select(p => p.Description)
                    .FirstOrDefaultAsync();

                if (Description == null)
                    return Results.NotFound(new Response(false, null, "Không tìm thấy sản phẩm!"));
                return Results.Ok(new Response(true, Description, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, null, "Lỗi đã xảy ra!"));
            }
        }
    }
}
