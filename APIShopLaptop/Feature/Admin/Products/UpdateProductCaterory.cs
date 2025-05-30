using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products {
    public class UpdateProductCaterory:IEndpoint {
        public record Request(string ProductId,List<string> Categories);
        public record Response(bool Success, string ErrorMessage);
       
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Products/Category", Handler).WithTags("Products");
        }

        private static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var product= context.Products.FirstOrDefault(p=>p.Id==request.ProductId);
                var categories =new List<CateroryItem>();
                foreach(var categoryId in request.Categories) {
                    var Category = await context.SubCaterories.FirstOrDefaultAsync(c => c.Id == categoryId);
                    var item = new CateroryItem() {
                        CateroryNavigation = Category,
                        ProductNavigation = product,
                    };
                    categories.Add(item);
                }
                product.CateroryItems= categories;
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!"));
            }
        }
    }
}
