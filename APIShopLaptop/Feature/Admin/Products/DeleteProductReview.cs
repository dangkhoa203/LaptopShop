using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;

namespace APIShopLaptop.Feature.Admin.Products {
    public class DeleteProductReview:IEndpoint {
        public record Request(string Id);
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapDelete("/api/Admin/Products/Reviews", Handler).WithTags("Admin_Products");
        }
        [Authorize(Roles = "Admin")]
        public static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var review = context.Reviews.FirstOrDefault(d => d.Id == request.Id);
                if (review == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy mã!"));

                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, "Lỗi Server"));
            }
        }
    }
}
