using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace APIShopLaptop.Feature.Admin.Summary {
    public class GetAllOrderStatus : IEndpoint {
        public record SaleDTO(string name, int count);
        public record Response(bool Success, List<SaleDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Summary/All_Order", Handler).WithTags("Admin_Summary");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context, UserManager<AppUser> userManager) {
            try {
                List<string> StatusChart = ["Hủy","Chờ xác nhận", "Chở đợi", "Chuẩn bị", "Giao hàng", "Hoàn thành"];
                var Order=await context.Orders.GroupBy(o=>o.Status).Select(o=>new SaleDTO(StatusChart[(int)o.Key], o.Count())).ToListAsync();
                return Results.Ok(new Response(true, Order, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, [], "Lỗi"));
            }

        }
    }
}
