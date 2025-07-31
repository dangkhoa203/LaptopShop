using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Specifications {
    public class GetSpecifications:IEndpoint {
        public record SpecificationDTO(string Id, string Name,bool searchAble);
        public record Response(bool Success, List<SpecificationDTO>? Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Specifications", Handler).WithTags("Admin_Specifications");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Specifications = await context.Specifications
                    .OrderBy(b=>b.Name)
                     .Select(b => new SpecificationDTO(
                         b.Id,
                         b.Name,
                         b.SearchAble
                         ))
                     .ToListAsync();

                return Results.Ok(new Response(true, Specifications, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
