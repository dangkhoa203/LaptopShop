using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Category {
    public class GetProductForMainPage_MainCategory : IEndpoint {
        public record Request(string Id, int Page, List<string> SortByBrand);
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount, float Score);
        public record Response(bool Success, List<ProductDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Category/Main/{id}/Main_Page", Handler).WithTags("Category");
        }
        private static async Task<IResult> Handler([FromRoute] string Id, ApplicationDBContext context) {
            try {
                var subCategory = await context.SubCaterories
                    .Include(c => c.MainCaterory)
                    .Where(c => c.MainCaterory.Id == Id)
                    .Select(c => c.Id)
                    .ToListAsync();

                var Products = context.CateroryItems
                   .Include(i => i.ProductNavigation)
                    .ThenInclude(p => p.Reviews)
                   .Where(i => subCategory.Any(c => c == i.CateroryId))
                   .Where(i=>i.ProductNavigation.Status==PRODUCTSTATUS.ACTIVE)
                   .GroupBy(i => i.ProductId).ToList();
                   //.Where(i => !request.SortByBrand.Any() || request.SortByBrand.Any(b => b == i.ProductNavigation.Brand.Tag))
                   
                var Data=Products.OrderByDescending(i => i.First().ProductNavigation.CreatedAt).Take(15);
                var list= Data
                   .Select(i => new ProductDTO(
                           i.First().ProductNavigation.Id,
                           i.First().ProductNavigation.Name,
                           i.First().ProductNavigation.Price,
                           i.First().ProductNavigation.Quantity,
                           i.First().ProductNavigation.IsDiscount,
                           i.First().ProductNavigation.PriceAfterDiscount,
                           i.First().ProductNavigation.Reviews.Count > 0 ? i.First().ProductNavigation.Reviews.Sum(r => r.Score) / i.First().ProductNavigation.Reviews.Count : 0
                       ))
                   .ToList();
                return Results.Ok(new Response(true, list, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}
