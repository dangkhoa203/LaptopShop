using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Builds {
    public class DeleteBuildItem : IEndpoint {
        public record Request(string ProductId);
        public record Response(bool Success);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapDelete("/api/Build", Handler).WithTags("Build");
        }
        private static async Task<IResult> Handler([FromBody] Request request, UserManager<AppUser> userManager, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Build = await context.Users
                    .Include(u => u.Build)
                    .ThenInclude(u => u.BuildItems)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Build)
                    .FirstOrDefaultAsync();

                var Product = Build.BuildItems.FirstOrDefault(p => p.ProductId == request.ProductId);
                if (Product == null) {
                    return Results.BadRequest(new Response(false));
                }

                context.BuildItems.Remove(Product);
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true));
                }
                return Results.BadRequest(new Response(false));
            }
            catch (Exception ex) {
                return Results.Ok(new Response(false));
            }

        }
    }
}
