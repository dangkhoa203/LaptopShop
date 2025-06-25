using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Orders {
    public class GetOrder : IEndpoint {
        public record OrderDTO(string Id, DateTime DateOfOrder, PAYMENTMETHOD PaymentMethod, ORDERSTATUS Status, string NoteFromOrder, DeliveryInfo DeliveryInfo, List<DetailDTO> Details);
        public record UserDTO(string Id, string UserName, string Email);
        public record DeliveryInfo(string Receiver, string PhoneNumber, string Address);
        public record DetailDTO(string Id, string Name, float Price, int Quantity,bool ReviewAble);
        public record Response(bool Success, OrderDTO? data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Orders/{id}", Handler).WithTags("Orders");
        }
        private static async Task<IResult> Handler(string id, ApplicationDBContext context) {
            try {
                var Order = await context.Orders
                     .Where(o => o.Id == id)
                     .Include(o => o.Details)
                        .ThenInclude(d => d.ProductNavigation)
                     .FirstOrDefaultAsync();

                if (Order == null)
                    return Results.NotFound(new Response(false, null, "Không tìm thấy đơn hàng!"));
                var test = context.Reviews
                                .Include(r => r.Product)
                                .Include(r => r.Order)
                                .FirstOrDefault(r => r.Product.Id == "SP-QWHPR7" && r.Order.Id == Order.Id) == null;
                var Data = new OrderDTO(
                         Order.Id,
                         Order.DateOfOrder,
                         Order.PaymentMethod,
                         Order.Status,
                         Order.NoteFromOrder,
                         new DeliveryInfo(Order.Receiver, Order.PhoneNumber, Order.Address),
                         Order.Details.Select(d => new DetailDTO(d.ProductId, d.ProductNavigation.Name, d.Price, d.Quantity,
                            Order.Status == ORDERSTATUS.FINISHED &&
                            context.Reviews
                                .Include(r => r.Product)
                                .Include(r => r.Order)
                                .FirstOrDefault(r => r.Product.Id == d.ProductId && r.Order.Id == Order.Id) == null)
                         ).ToList()
                );
                return Results.Ok(new Response(true, Data, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
