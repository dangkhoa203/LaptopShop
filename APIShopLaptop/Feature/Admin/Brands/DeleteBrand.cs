using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Brands {
    public class DeleteBrand:IEndpoint {
        public record Response(bool Success, string ErrorMessage);
       
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapDelete("/api/Admin/Brands/{id}", Handler).WithTags("Admin_Brands");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(string id, ApplicationDBContext context) {
            try {
                Brand? Brand = await context.Brands
                    .Include(b=>b.Products)
                    .FirstOrDefaultAsync(b => b.Id == id);
                if (Brand == null) {
                    return Results.NotFound(new Response(false, "Không tìm thấy hãng!"));
                }

                if (Brand.Products.Count() > 0) {
                    return Results.BadRequest(new Response(false, "Hãng còn có sản phẩm!"));
                }

                context.Brands.Remove(Brand);
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
