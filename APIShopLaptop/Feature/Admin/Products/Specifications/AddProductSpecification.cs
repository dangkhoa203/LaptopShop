using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Spec_And_Filter;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Specifications {
    public class AddProductSpecification:IEndpoint {
        public record Request(string Id,string Value);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Products/{id}/Specification", Handler).WithTags("Admin_Products");
        }

        private static async Task<IResult> Handler([FromBody]Request request,string id, ApplicationDBContext context) {
            try {
                var Product = await context.Products
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (Product == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy sản phẩm!"));

                var Specification=await context.Specifications.FirstOrDefaultAsync(s => s.Id == request.Id);
                if (Specification == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy thông số!"));
                var Data = new SpecificationData() {
                    ProductNavigation = Product,
                    SpecificationNavigation = Specification,
                    Value=request.Value,
                };
                await context.SpecificationsData.AddAsync(Data);
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!" ));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!"));
            }
        }
    }
}
