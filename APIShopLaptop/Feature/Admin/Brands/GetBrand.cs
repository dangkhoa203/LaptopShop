using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Brands {
    public class GetBrand:IEndpoint {
        public record ProductDTO(string Id,string Name);
        public record BrandDTO(string Id,string Name,string Tag,List<ProductDTO> Products);
        public record Response(bool Success, BrandDTO? data, string ErrorMessage);
         public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Brands/{id}", Handler).WithTags("Brands");
         }
        private static async Task<IResult> Handler(string id, ApplicationDBContext context) {
            try {
                BrandDTO? brand = await context.Brands
                     .Include(b => b.Products)
                     .Select(b => new BrandDTO(
                         b.Id,
                         b.Name,
                         b.Tag,
                         b.Products.Select(p => new ProductDTO(p.Id, p.Name)).ToList()
                         ))
                     .FirstOrDefaultAsync(b=>b.Id==id);
                if (brand != null)
                    return Results.Ok(new Response(true, brand, ""));

                return Results.NotFound(new Response(false, null, "Không tìm thấy dữ liệu!"));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
