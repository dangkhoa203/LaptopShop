using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Summary {
    public class GetSaleFigureOfYear : IEndpoint {
        public record SaleDTO(string month, float number);
        public record Response(bool Success, List<SaleDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Summary/Sale/{year}", Handler).WithTags("Admin_Summary");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler([FromRoute]int year,ApplicationDBContext context, UserManager<AppUser> userManager) {
            try {
                var Sale = await context.Orders
                                        .Where(o=>o.Status==ORDERSTATUS.FINISHED)
                                        .Where(o=>o.DateOfOrder.Year==year)
                                        .GroupBy(o => o.DateOfOrder.Month)
                                        .Select(s=>new SaleDTO(s.Key+"",s.Sum(s=>s.Value)))
                                        .ToListAsync();

                return Results.Ok(new Response(true, Sale, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi"));
            }

        }
    }
}
