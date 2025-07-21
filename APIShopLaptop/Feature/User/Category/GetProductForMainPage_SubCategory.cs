using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Category {
    public class GetProductForMainPage_SubCategory : IEndpoint {
        public record Request(string Id, int Page, List<string> SortByBrand);
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount,float Score);
        public record Response(bool Success, List<ProductDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Category/Sub/{id}/Main_Page", Handler).WithTags("Category");
        }
        private static async Task<IResult> Handler([FromRoute] string Id, ApplicationDBContext context) {
            try {
                var Products = await context.CateroryItems
                                            .Where(i => i.CateroryId == Id)
                                            .Include(i => i.ProductNavigation)
                                            .ThenInclude(p => p.Reviews)
                                            .OrderByDescending(i => i.ProductNavigation.CreatedAt)
                                            .Where(i => i.ProductNavigation.Status == PRODUCTSTATUS.ACTIVE)
                                            .Select(i => new ProductDTO(
                                                    i.ProductNavigation.Id,
                                                    i.ProductNavigation.Name,
                                                    i.ProductNavigation.Price,
                                                    i.ProductNavigation.Quantity,
                                                    i.ProductNavigation.IsDiscount,
                                                    i.ProductNavigation.PriceAfterDiscount,
                                                    i.ProductNavigation.Reviews.Count > 0 ? i.ProductNavigation.Reviews.Sum(r => r.Score) / i.ProductNavigation.Reviews.Count : 0
                                                ))
                                            .Take(6)
                                            .ToListAsync();

                return Results.Ok(new Response(true, Products, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}
