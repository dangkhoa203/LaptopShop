using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Cart {
    public class UpdateProductQuantityInCart : IEndpoint {
        public record Request(string ProductId,int Quantity);
        public record Response(bool Success);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Cart", Handler).WithTags("Cart");
        }
        private static async Task<IResult> Handler([FromBody]Request request, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                if (request.Quantity < 1) {
                    return Results.BadRequest(new Response(false));
                }
                var Cart = await context.Users
                    .Include(u => u.Cart)
                        .ThenInclude(u => u.CartProducts)
                            .ThenInclude(p=>p.ProductNavigation)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Cart)
                    .FirstOrDefaultAsync();

                var CartProduct = Cart.CartProducts.FirstOrDefault(p => p.ProductId == request.ProductId);
                if (CartProduct == null ) {
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
