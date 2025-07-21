using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Summary {
    public class GetTop5Customer : IEndpoint {
        public record SaleDTO(string name, int count);
        public record Response(bool Success, List<SaleDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Summary/Top_Customer", Handler).WithTags("Admin_Summary");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context, UserManager<AppUser> userManager) {
            try {
                var Users = await context.Users
                                         .Include(u => u.Orders)
                                         .Select(u => new SaleDTO(u.UserName, u.Orders.Count()))
                                         .ToListAsync();

                var Data = Users.Where(o=>o.count>0).Take(5).ToList();

                return Results.Ok(new Response(true,Data,""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi"));
            }

        }
    }
}
