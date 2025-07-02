using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Summary {
    public class GetTop10Product : IEndpoint {
        public record SaleDTO(string name,int count);
        public record Response(bool Success, List<SaleDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Summary/Top_Product", Handler).WithTags("Admin_Summary");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Detail = await context.OrderDetails.Include(d => d.ProductNavigation).Include(d=>d.OrderNavigation).ToListAsync();
                var Product= Detail.Where(d=>d.OrderNavigation.Status==Model.Enum.ORDERSTATUS.FINISHED).GroupBy(o => o.ProductNavigation.Id).OrderByDescending(d => d.Sum(d => d.Quantity)).Select(d=>new SaleDTO(d.First().ProductNavigation.Name,d.Sum(d=>d.Quantity))).ToList();
                return Results.Ok(new Response(true, Product, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi"));
            }

        }


    }
}
