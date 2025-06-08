using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Cart {
    public class GetCurrentCart : IEndpoint {
        public record CartProductDTO(string ProductId,string ProductName,float Price,float PriceAfterDiscount,int Quantity,int StorageCount);
        public record Response(bool Success,List<CartProductDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Cart", Handler).WithTags("Cart");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context, ClaimsPrincipal User) {
            try {

                var Cart = await context.Users
                    .Include(u => u.Cart)
                        .ThenInclude(u => u.CartProducts)
                            .ThenInclude(p => p.ProductNavigation)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Cart)
                    .FirstOrDefaultAsync();

                bool changedFlag = false;
                var Data=new List<CartProductDTO>();
                foreach (var product in Cart.CartProducts) {
                    if (product.ProductNavigation.Status != Model.Enum.PRODUCTSTATUS.ACTIVE) {
                        changedFlag = true;
                        context.CartProducts.Remove(product);
                        continue;
                    }
                    if (product.Quantity > product.ProductNavigation.Quantity) {
                        changedFlag = true;
                        if (product.ProductNavigation.Quantity != 0)
                            product.Quantity = product.ProductNavigation.Quantity;
                    }
                    Data.Add(new CartProductDTO(
                        product.ProductId,
                        product.ProductNavigation.Name,
                        product.ProductNavigation.Price,
                        product.ProductNavigation.PriceAfterDiscount,
                        product.Quantity,
                        product.ProductNavigation.Quantity));
                }
                if (changedFlag) {
                    if (await context.SaveChangesAsync() <= 0) {
                        return Results.BadRequest(new Response(false, [],"Lỗi thực hiện!"));
                    }
                }
                return Results.Ok(new Response(false, Data, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi server!"));
            }

        }
    }
}
