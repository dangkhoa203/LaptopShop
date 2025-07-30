using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Orders {
    public class GetOrder : IEndpoint {
        public record DiscountCodeDTO(string Id,string Name,float Percent);
        public record OrderDTO(string Id, DateTime DateOfOrder, PAYMENTMETHOD PaymentMethod, ORDERSTATUS Status, string NoteFromOrder,float Value, DeliveryInfo DeliveryInfo, List<DetailDTO> Details,DiscountCodeDTO DiscountCode);
        public record UserDTO(string Id, string UserName, string Email);
        public record DeliveryInfo(string Receiver, string PhoneNumber, string Address);
        public record DetailDTO(string Id, string Name, float Price, int Quantity,bool ReviewAble);
        public record Response(bool Success, OrderDTO? data,bool NotFound, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Orders/{id}", Handler).WithTags("Orders");
        }
        [Authorize(Roles = "User")]
        private static async Task<IResult> Handler(string id, ApplicationDBContext context) {
            try {
                var Order = await context.Orders
                                         .Where(o => o.Id == id)
                                         .Include(o => o.Details)
                                            .ThenInclude(d => d.ProductNavigation)
                                         .Include(o=>o.DiscountCode)
                                         .FirstOrDefaultAsync();

                if (Order == null)
                    return Results.NotFound(new Response(false, null,true, "Không tìm thấy đơn hàng!"));
              
                var Data = new OrderDTO(
                         Order.Id,
                         Order.DateOfOrder,
                         Order.PaymentMethod,
                         Order.Status,
                         Order.NoteFromOrder,
                         Order.Value,
                         new DeliveryInfo(Order.Receiver, Order.PhoneNumber, Order.Address),
                         Order.Details.Select(d => new DetailDTO(d.ProductId, d.ProductNavigation.Name, d.Price, d.Quantity,
                            Order.Status == ORDERSTATUS.FINISHED &&
                            context.Reviews
                                    .Include(r => r.Product)
                                    .Include(r => r.Order)
                                    .FirstOrDefault(r => r.Product.Id == d.ProductId && r.Order.Id == Order.Id) == null)
                             ).ToList(),
                         Order.DiscountCode==null ? new DiscountCodeDTO("","",0) : new DiscountCodeDTO(Order.DiscountCode.Id,Order.DiscountCode.Name,Order.DiscountCode.Percent)
                );
                return Results.Ok(new Response(true, Data,false, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null,false, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
