using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Products {
    public class GetProduct : IEndpoint {
        public record ReviewDTO(string Content,float Score,string Username);
        public record SpecificationDTO(string Name,string Value);
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount,string Description,List<SpecificationDTO> Specifications,List<string> ProductImage,float AverageScore,int ReviewCount);
        public record Response(bool Success, ProductDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Products/{id}", Handler).WithTags("Products");
        }
        private static async Task<IResult> Handler([FromRoute]string id, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Product=await context.Products.Include(p=>p.Images).Include(p=>p.Reviews).ThenInclude(r=>r.User).Include(p=>p.Specifications).ThenInclude(s=>s.SpecificationNavigation).FirstOrDefaultAsync(p=>p.Id==id);
                if (Product == null) {
                    return Results.BadRequest(new Response(false, null, "Không tìm thấy!"));
                }
                
                var Data = new ProductDTO(
                    Product.Id,
                    Product.Name,
                    Product.Price,
                    Product.Quantity,
                    Product.IsDiscount,
                    Product.PriceAfterDiscount,
                    Product.Description,
                    Product.Specifications.Select(s => new SpecificationDTO(s.SpecificationNavigation.Name, s.Value)).ToList(),
                    Product.Images.Where(i => !i.IsThumbnail).Select(i => i.Id).ToList(),
                    Product.Reviews.Count>0 ? Product.Reviews.Sum(r=>r.Score)/ Product.Reviews.Count :0,
                    Product.Reviews.Count
                    );
                return Results.Ok(new Response(true, Data, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, null, "Lỗi đã xảy ra!"));
            }
        }
    }
}