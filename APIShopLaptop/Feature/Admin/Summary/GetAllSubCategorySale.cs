using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Summary {
    public class GetAllSubCategorySale : IEndpoint {
        public record SaleDTO(string name, int count);
        public record Response(bool Success, List<SaleDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Summary/All_Sub_Sale", Handler).WithTags("Admin_Summary");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Category = context.SubCaterories.Include(s=>s.MainCaterory).Include(m => m.CateroryItems).ThenInclude(i => i.ProductNavigation).ThenInclude(p => p.OrderDetails).ThenInclude(d => d.OrderNavigation).ToList();
                var Data = Category
                    .Select(c =>
                                new SaleDTO(
                                    $"{c.Name} ({c.MainCaterory.Name})",
                                    c.CateroryItems
                                        .Sum(i => i.ProductNavigation.OrderDetails
                                                                        .Where(d => d.OrderNavigation.Status == ORDERSTATUS.FINISHED)
                                                                        .Sum(d => d.Quantity))))
                    .OrderByDescending(d=>d.count)
                    .ToList();
                return Results.Ok(new Response(true, Data, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi"));
            }

        }
    }
}
