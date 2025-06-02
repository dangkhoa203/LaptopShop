using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Enum;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Description {
    public class UpdateProductDescription : IEndpoint {
        public record Request(string Description);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Products/{id}/Description", Handler).WithTags("Admin_Products");
        }

        private static async Task<IResult> Handler([FromRoute] string id, Request request, IWebHostEnvironment env, ApplicationDBContext context) {
            Product? product = await context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null) {
                return Results.NotFound(new Response(false, "Không tìm thấy sản phẩm!"));
            }

            if (product.Description != request.Description) {
                product.Description = request.Description;
                product.UpdateAt = DateTime.Now;
                if (await context.SaveChangesAsync() < 1) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));
                }
            }
            return Results.Ok(new Response(true, ""));
        }
    }
}
