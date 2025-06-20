using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Builds {
    public class GetBuild : IEndpoint {
        public record BuildProductDTO(string ProductId, string ProductName, float Price, float PriceAfterDiscount, int Quantity, int StorageCount,string ComponentName);
        public record Response(bool Success, List<BuildProductDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Build", Handler).WithTags("Build");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context, ClaimsPrincipal User) {
            try {

                var Build = await context.Users
                    .Include(u => u.Build)
                        .ThenInclude(u => u.BuildItems)
                            .ThenInclude(p => p.ProductNavigation)
                    .Where(u => u.UserName == User.Identity.Name)
                    .Select(u => u.Build)
                    .FirstOrDefaultAsync();

                bool changedFlag = false;
                var Data = new List<BuildProductDTO>();
                foreach (var product in Build.BuildItems) {
                    if (product.ProductNavigation.Status != Model.Enum.PRODUCTSTATUS.ACTIVE || product.ProductNavigation.Quantity == 0) {
                        changedFlag = true;
                        context.BuildItems.Remove(product);
                        continue;
                    }
                    if (product.Quantity > product.ProductNavigation.Quantity) {
                        changedFlag = true;
                        product.Quantity = product.ProductNavigation.Quantity;
                    }
                    Data.Add(new BuildProductDTO(
                        product.ProductId,
                        product.ProductNavigation.Name,
                        product.ProductNavigation.Price,
                        product.ProductNavigation.PriceAfterDiscount,
                        product.Quantity,
                        product.ProductNavigation.Quantity,
                        product.ComponentName));
                }
                if (changedFlag) {
                    await context.SaveChangesAsync();
                    if (await context.SaveChangesAsync() <= 0) {
                        return Results.BadRequest(new Response(false, [], "Lỗi thực hiện!"));
                    }
                }
                return Results.Ok(new Response(true, Data, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi server!"));
            }

        }
    }
}
