using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Compatibility {
    public class GetProductCompatibility : IEndpoint {
        public record SpecificationDTO(string Id, string Name, string Value);
        public record Response(bool Success, List<SpecificationDTO> data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Products/{id}/Compatibility", Handler).WithTags("Admin_Products");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(string id, ApplicationDBContext context) {
            try {
                var Product = await context.Products
                    .Include(p => p.Compatibilitys)
                    .ThenInclude(s => s.SpecificationNavigation)
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (Product == null)
                    return Results.NotFound(new Response(false, null, "Không tìm thấy sản phẩm!"));
                return Results.Ok(new Response(true, Product.Compatibilitys.Select(s => new SpecificationDTO(s.SpecificationId, s.SpecificationNavigation.Name, s.Value)).ToList(), ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi server đã xảy ra!"));
            }
        }
    }
}
