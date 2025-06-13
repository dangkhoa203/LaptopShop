using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Category {
    public class GetProductFromMainCategory : IEndpoint {
        public record Request(string Id, int Page, List<string> SortByBrand);
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount);
        public record Response(bool Success, List<ProductDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Category/Main/{id}/{page}", Handler).WithTags("Category");
        }
        private static async Task<IResult> Handler([FromRoute]string Id, [FromRoute]int page, ApplicationDBContext context) {
            try {
                int perPage = 12;
                var subCategory = await context.SubCaterories
                    .Include(c => c.MainCaterory)
                    .Where(c => c.MainCaterory.Id == Id)
                    .Select(c => c.Id)
                    .ToListAsync();

                var Products = await context.CateroryItems
                   .Include(i => i.ProductNavigation)
                       .ThenInclude(p => p.Brand)
                   .Where(i => subCategory.Any(c => c == i.CateroryId))
                   //.Where(i => !request.SortByBrand.Any() || request.SortByBrand.Any(b => b == i.ProductNavigation.Brand.Tag))
                   .GroupBy(i => i.ProductId)
                   .Skip(perPage * (page - 1))
                   .Select(i => new ProductDTO(
                           i.First().ProductNavigation.Id,
                           i.First().ProductNavigation.Name,
                           i.First().ProductNavigation.Price,
                           i.First().ProductNavigation.Quantity,
                           i.First().ProductNavigation.IsDiscount,
                           i.First().ProductNavigation.PriceAfterDiscount
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
