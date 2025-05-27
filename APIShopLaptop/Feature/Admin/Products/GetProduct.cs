using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products {
    public class GetProduct:IEndpoint {
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount, PRODUCTSTATUS Status,int SoldCount,BrandDTO Brand,List<ReviewDTO> Reviews);
        public record BrandDTO(string Id,string Name);
        public record ReviewDTO(string Id,string Content,int Score,string UserName);
        public record Response(bool Success, ProductDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Products/{id}", Handler).WithTags("Products");
        }
        private static async Task<IResult> Handler([FromRoute] string id,ApplicationDBContext context) {
            try {
                var Product = await context.Products
                    .Where(p => p.Id == id)
                    .Include(p=>p.Brand)
                    .Include(p=>p.Reviews)
                        .ThenInclude(r=>r.User)
                    .Include(p=>p.OrderDetails)
                    .Select(p => new ProductDTO(
                        p.Id,
                        p.Name,
                        p.Price,
                        p.Quantity,
                        p.IsDiscount,
                        p.PriceAfterDiscount,
                        p.Status,
                        p.OrderDetails.Count,
                        new BrandDTO(p.Brand.Id,p.Brand.Name),
                        p.Reviews.Select(r=>new ReviewDTO(r.Id,r.Content,r.Score,r.User.UserName)).ToList()
                        ))
                    .FirstOrDefaultAsync();
                if (Product == null)
                    return Results.NotFound(new Response(false, null, "Không tìm thấy sản phẩm!"));
                return Results.Ok(new Response(true, Product, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, null, "Lỗi đã xảy ra!"));
            }
        }
    }
}
