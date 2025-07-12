using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Builds {
    public class UpdateBuildItemQuantity : IEndpoint {
        public record Request(string ProductId, int Quantity);
        public record Response(bool Success);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Build", Handler).WithTags("Build");
        }
        private static async Task<IResult> Handler([FromBody] Request request, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                if (request.Quantity < 1) {
                    return Results.BadRequest(new Response(false));
                }
                var Build = await context.Users
                   .Include(u => u.Build)
                   .ThenInclude(u => u.BuildItems)
                    .ThenInclude(i=>i.ProductNavigation)
                   .Where(u => u.UserName == User.Identity.Name)
                   .Select(u => u.Build)
                   .FirstOrDefaultAsync();

                var CartProduct = Build.BuildItems.FirstOrDefault(p => p.ProductId == request.ProductId);
                if (CartProduct == null) {
                    return Results.BadRequest(new Response(false));
                }

                if (CartProduct.ProductNavigation.Quantity < request.Quantity) {
                    CartProduct.Quantity = CartProduct.ProductNavigation.Quantity;
                }
                else {
                    CartProduct.Quantity = request.Quantity;
                }

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
