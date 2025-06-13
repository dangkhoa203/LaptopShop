using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Caterory {
    public class GetProductsFromSubCaterory : IEndpoint {
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount);
        public record Response(bool Success, List<ProductDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Category/Sub/{id}/{page}", Handler).WithTags("Caterory");
        }
        private static async Task<IResult> Handler(string Id,int page, ApplicationDBContext context) {
            try {
                int perPage = 12;
                var Products = await context.CateroryItems
                    .Where(i => i.CateroryId == Id)
                    .Include(i => i.ProductNavigation)
                    .Where(i => i.ProductNavigation.Status == PRODUCTSTATUS.ACTIVE)
                    .Skip(perPage*(page- 1))
                    .Select(i => new ProductDTO(
                            i.ProductNavigation.Id,
                            i.ProductNavigation.Name,
                            i.ProductNavigation.Price,
                            i.ProductNavigation.Quantity,
                            i.ProductNavigation.IsDiscount,
                            i.ProductNavigation.PriceAfterDiscount
                        ))
                    .Take(perPage)
                    .ToListAsync();
                
                return Results.Ok(new Response(true, Products, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}
