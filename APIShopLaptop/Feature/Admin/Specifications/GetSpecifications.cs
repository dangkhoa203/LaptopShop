using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Specifications {
    public class GetSpecifications:IEndpoint {
        public record SpecificationDTO(string Id, string Name);
        public record Response(bool Success, List<SpecificationDTO>? data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Specifications", Handler).WithTags("Specifications");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var brands = await context.Specifications
                     .Select(b => new SpecificationDTO(
                         b.Id,
                         b.Name
                         ))
                     .ToListAsync();

                return Results.Ok(new Response(true, brands, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
