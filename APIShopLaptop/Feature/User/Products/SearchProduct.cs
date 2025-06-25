using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
namespace APIShopLaptop.Feature.User.Products {
    public class SearchProduct : IEndpoint {
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount);
        public record DataDTO(List<ProductDTO> Products, int MaxPage, int Total);
        public record Response(bool Success, DataDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Products", Handler).WithTags("Products");
        }
        private static async Task<IResult> Handler([FromQuery] string search, [FromQuery] int page, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                int perPage = 12;
                var Products = context.Products.Where(p => p.Status == PRODUCTSTATUS.ACTIVE).Where(p => p.Name.Contains(search))
                    .Select(p =>new ProductDTO(
                           p.Id,p.Name,p.Price,p.Quantity,p.IsDiscount,p.PriceAfterDiscount
                        ));
                var Total = Products.Count();
                var TotalPage = (int)Math.Ceiling((double)Total / perPage);
                var list = Products.Skip(perPage * (page - 1)).Take(perPage).ToList();
                return Results.Ok(new Response(true, new DataDTO(list, TotalPage, Total), ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, new DataDTO([], 1, 0), "Lỗi đã xảy ra!"));
            }
        }
    }
}