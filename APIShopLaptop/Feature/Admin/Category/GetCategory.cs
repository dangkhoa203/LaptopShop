using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Category {
    public class GetCategory:IEndpoint {
        public record CategoryDTO(string Id, string Name);
        public record Response(bool Success, List<CategoryDTO>? Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Category", Handler).WithTags("Admin_Category");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Categories = await context.SubCaterories
                     .Include(c=>c.MainCaterory)
                     .Select(c => new CategoryDTO(
                         c.Id,
                         $"{c.MainCaterory.Name} > {c.Name}"
                         ))
                     .ToListAsync();

                return Results.Ok(new Response(true, Categories, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
