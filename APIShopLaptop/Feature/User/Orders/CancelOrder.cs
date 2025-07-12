using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;

namespace APIShopLaptop.Feature.User.Orders {
    public class CancelOrder : IEndpoint {
        public record Request(string Id);
        public record Response(bool Success, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Orders/Cancel", Handler).WithTags("Orders");
        }
        public static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var Order = context.Orders.FirstOrDefault(d => d.Id == request.Id);
                if (Order == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy đơn!"));

                Order.Status = 0;
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, "Lỗi Server"));
            }
        }
    }
}
