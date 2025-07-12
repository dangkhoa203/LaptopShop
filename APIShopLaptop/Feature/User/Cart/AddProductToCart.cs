using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.Cart_Related;
using APIShopLaptop.Model.Entity.Product_Related;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Cart {
    public class AddProductToCart : IEndpoint {
        public record Request(string ProductId);
        public record Response(bool Success);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Cart", Handler).WithTags("Cart");
        }
        private static async Task<IResult> Handler([FromBody]Request request,UserManager<AppUser> userManager, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Cart = await context.Users
                    .Include(u => u.Cart)
                    .ThenInclude(u => u.CartProducts)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Cart)
                    .FirstOrDefaultAsync();

                var CartProduct = Cart.CartProducts.FirstOrDefault(p => p.ProductId == request.ProductId);
                if (CartProduct!=null) {
                    CartProduct.Quantity++;
                    await context.SaveChangesAsync();
                    return Results.Ok(new Response(true));
                }

                var Product = await context.Products
                    .Where(p => p.Quantity > 0 && p.Status == Model.Enum.PRODUCTSTATUS.ACTIVE)
                    .FirstOrDefaultAsync(p => p.Id == request.ProductId);
                if (Product == null) {
                    return Results.BadRequest(new Response(false));
                }
                
                var NewCartProduct = new CartProduct() {
                    Quantity=1,
                    CartNavigation = Cart,
                    ProductNavigation = Product,
                };

                await context.CartProducts.AddAsync(NewCartProduct);
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
