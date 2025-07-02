using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Category {
    public class UpdateProductCategory : IEndpoint {
        public record Request(List<string> Categories);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Products/{id}/Category", Handler).WithTags("Admin_Products");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(Request request, string id, ApplicationDBContext context) {
            try {
                var Product = context.Products.Include(p=>p.CateroryItems).FirstOrDefault(p => p.Id == id);
                var Categories = new List<CateroryItem>();
                foreach (var categoryId in request.Categories) {
                    var Category = await context.SubCaterories.FirstOrDefaultAsync(c => c.Id == categoryId);
                    var item = new CateroryItem() {
                        CateroryNavigation = Category,
                        ProductNavigation = Product,
                    };
                    Categories.Add(item);
                }
                context.CateroryItems.RemoveRange(Product.CateroryItems);
                Product.CateroryItems = Categories;
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
