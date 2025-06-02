using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products {
    public class GetProducts:IEndpoint {
        public record ProductDTO(string Id, string Name,float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount, PRODUCTSTATUS Status,string BrandName);
        public record Response(bool Success, List<ProductDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Products", Handler).WithTags("Admin_Products");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Products = await context.Products
                    .Include(p=>p.Brand)
                    .Select(p => new ProductDTO(
                        p.Id,
                        p.Name,
                        p.Price,
                        p.Quantity,
                        p.IsDiscount,
                        p.PriceAfterDiscount,
                        p.Status,
                        p.Brand.Name
                        ))
                    .ToListAsync();

                return Results.Ok(new Response(true, Products, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}
