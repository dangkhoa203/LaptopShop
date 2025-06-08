using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Cart {
    public class DeleteProductFromCart:IEndpoint {
        public record Request(string ProductId);
        public record Response(bool Success);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapDelete("/api/Cart", Handler).WithTags("Cart");
        }
        private static async Task<IResult> Handler([FromBody]Request request, UserManager<AppUser> userManager, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Cart = await context.Users
                    .Include(u => u.Cart)
                    .ThenInclude(u => u.CartProducts)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Cart)
                    .FirstOrDefaultAsync();

                var Product = Cart.CartProducts.FirstOrDefault(p=>p.ProductId==request.ProductId);
                if (Product == null) {
                    return Results.BadRequest(new Response(false));
                }

                context.CartProducts.Remove(Product);
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
