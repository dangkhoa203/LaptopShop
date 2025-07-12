using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Summary {
    public class GetSaleFigure : IEndpoint {
        public record SaleDTO(string month, float number);
        public record Response(bool Success, List<SaleDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Summary/Sale", Handler).WithTags("Admin_Summary");
        }

        private static async Task<IResult> Handler(ApplicationDBContext context, UserManager<AppUser> userManager) {
            try {
                var Sale = await context.Orders.Where(o => o.Status == ORDERSTATUS.FINISHED).GroupBy(o => new { o.DateOfOrder.Year, o.DateOfOrder.Month }).Select(s => new SaleDTO($"{s.Key.Month}/{s.Key.Year}", s.Sum(s => s.Value))).ToListAsync();
                return Results.Ok(new Response(true, Sale, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi"));
            }

        }
    }
}

