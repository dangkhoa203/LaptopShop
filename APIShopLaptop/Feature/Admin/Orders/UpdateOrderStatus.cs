using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Enum;
using FluentValidation;
using FluentValidation.Results;

namespace APIShopLaptop.Feature.Admin.Orders {
    public class UpdateOrderStatus:IEndpoint {
        public record Request(string Id,ORDERSTATUS Status);
        public record Response(bool Success, string ErrorMessage);
        
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Orders", Handler).WithTags("Admin_Orders");
        }
        public static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var Order = context.Orders.FirstOrDefault(d => d.Id ==request.Id);
                if (Order == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy đơn!"));

                Order.Status=request.Status;
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
