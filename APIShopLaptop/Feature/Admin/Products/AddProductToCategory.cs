using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace APIShopLaptop.Feature.Admin.Products {
    public class AddProductToCategory:IEndpoint {
        public record Request(string ProductId,string CateroryId);
        public record Response(bool Success, string ErrorMessage);
       
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Products/Category", Handler).WithTags("Products");
        }

        private static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var product= context.Products.FirstOrDefault(p=>p.Id==request.ProductId);
                var caterory = context.SubCaterories.FirstOrDefault(c => c.Id == request.CateroryId);
                var item = new CateroryItem() {
                    CateroryNavigation=caterory,
                    ProductNavigation= product,
                };
                await context.CateroryItems.AddAsync(item);
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
