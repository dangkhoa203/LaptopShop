using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Category {
    public class GetCaterory:IEndpoint {
        public record CateroryDTO(string Id, string Name);
        public record Response(bool Success, List<CateroryDTO>? data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Category", Handler).WithTags("Admin-Category");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var caterories = await context.SubCaterories
                     .Include(c=>c.MainCaterory)
                     .Select(c => new CateroryDTO(
                         c.Id,
                         $"{c.MainCaterory.Name} > {c.Name}"
                         ))
                     .ToListAsync();

                return Results.Ok(new Response(true, caterories, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
