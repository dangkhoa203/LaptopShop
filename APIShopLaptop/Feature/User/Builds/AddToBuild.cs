using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.PC_Build_Related;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Builds {
    public class AddToBuild : IEndpoint {
        public record Request(string ProductId,string ComponentName);
        public record Response(bool Success,string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Build", Handler).WithTags("Build");
        }
        private static async Task<IResult> Handler([FromBody] Request request, UserManager<AppUser> userManager, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Build = await context.Users
                    .Include(u => u.Build)
                    .ThenInclude(u => u.BuildItems)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Build)
                    .FirstOrDefaultAsync();

                var BuildItem = Build.BuildItems.FirstOrDefault(p => p.ProductId == request.ProductId || p.ComponentName==request.ComponentName);
                if (BuildItem != null) {
                    return Results.BadRequest(new Response(false,"Đã có sản phẩm"));
                }

                var Product = await context.Products
                    .Where(p => p.Quantity > 0 && p.Status == Model.Enum.PRODUCTSTATUS.ACTIVE)
                    .FirstOrDefaultAsync(p => p.Id == request.ProductId);
                if (Product == null) {
                    return Results.BadRequest(new Response(false, "Không tìm thấy sản phẩm"));
                }

                var NewBuildItem = new BuildItem() {
                    Quantity = 1,
                    BuildNavigation = Build,
                    ProductNavigation = Product,
                    ComponentName=request.ComponentName
                };

                await context.BuildItems.AddAsync(NewBuildItem);
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra"));
            }
            catch (Exception ex) {
                return Results.Ok(new Response(false, "Lỗi server"));
            }

        }
    }
}
