using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Brands {
    public class GetBrands:IEndpoint {
        public record BrandDTO(string Id, string Name, string Tag,int ProductCount);
        public record Response(bool Success, List<BrandDTO>? Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Brands", Handler).WithTags("Admin_Brands");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Brands = await context.Brands
                     .Include(b => b.Products)
                     .OrderByDescending(b=>b.CreatedAt)
                     .Select(b => new BrandDTO(
                         b.Id,
                         b.Name,
                         b.Tag,
                         b.Products.Count
                         ))
                     .ToListAsync();
                
                return Results.Ok(new Response(true, Brands, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
