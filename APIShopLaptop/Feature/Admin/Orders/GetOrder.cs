using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Orders {
    public class GetOrder:IEndpoint {
        public record OrderDTO(string Id, DateTime DateOfOrder, PAYMENTMETHOD PaymentMethod, ORDERSTATUS Status,string NoteFromOrder,UserDTO user,DeliveryInfo DeliveryInfo,List<DetailDTO> Details);
        public record UserDTO (string Id,string UserName,string Email);
        public record DeliveryInfo(string Receiver, string PhoneNumber, string Address);
        public record DetailDTO(string Id,string Name,float Price,int Quantity);
        public record Response(bool Success, OrderDTO? data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Orders/{id}", Handler).WithTags("Admin_Orders");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(string id,ApplicationDBContext context) {
            try {
                var Order = await context.Orders
                     .Where(o=>o.Id==id)
                     .Include(o => o.User)
                     .Include(o => o.Details)
                        .ThenInclude(d => d.ProductNavigation)
                     .Select(o => new OrderDTO(
                         o.Id,
                         o.DateOfOrder,
                         o.PaymentMethod,
                         o.Status,
                         o.NoteFromOrder,
                         new UserDTO(o.User.Id,o.User.UserName,o.User.Email),
                         new DeliveryInfo(o.Receiver,o.PhoneNumber,o.Address),
                         o.Details.Select(d=>new DetailDTO(d.ProductId,d.ProductNavigation.Name, d.Price, d.Quantity)).ToList()
                         ))
                     .FirstOrDefaultAsync();

                if (Order == null)
                    return Results.NotFound(new Response(false, null, "Không tìm thấy đơn hàng!"));

                return Results.Ok(new Response(true, Order, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, null, "Lỗi server đã xảy ra!"));
            }

        }
    }
}
