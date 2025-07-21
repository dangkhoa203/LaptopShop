using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Summary {
    public class GetAllMainCategorySale : IEndpoint {
        public record SaleDTO(string name, int count);
        public record Response(bool Success, List<SaleDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Summary/All_Main_Sale", Handler).WithTags("Admin_Summary");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Category = context.MainCaterories
                                       .Include(m => m.SubCaterories)
                                           .ThenInclude(m => m.CateroryItems)
                                               .ThenInclude(i => i.ProductNavigation)
                                                   .ThenInclude(p => p.OrderDetails)
                                                       .ThenInclude(d => d.OrderNavigation)
                                        .ToList();

                Dictionary<string, Product> UniqueProduct = [];
                List<SaleDTO> Sales = [];
                foreach (var main in Category) {
                    foreach (var sub in main.SubCaterories) {
                        foreach (var item in sub.CateroryItems) {
                            if (!UniqueProduct.ContainsKey(item.ProductId)) {
                                UniqueProduct.Add(item.ProductId, item.ProductNavigation);
                            }
                        }
                    }
                    Sales.Add(new SaleDTO(main.Name, UniqueProduct.Sum(p => p.Value.OrderDetails
                                                                              .Where(d => d.OrderNavigation.Status == ORDERSTATUS.FINISHED)
                                                                              .Sum(d => d.Quantity))));
                    UniqueProduct.Clear();
                }
                var Data = Sales.OrderByDescending(d => d.count).ToList();
                return Results.Ok(new Response(true, Data, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi"));
            }

        }


    }
}
