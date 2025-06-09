using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Enum;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Orders {
    public class AddOrder:IEndpoint {
        public record Request(string Receiver,string PhoneNumber,string Address,PAYMENTMETHOD PaymentMethod);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.PhoneNumber).Length(10).WithMessage("Số điện thoại không phù hợp");
                RuleFor(r => r.PhoneNumber).Matches("^[0-9]*$").WithMessage("Số điện thoại không phù hợp");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Orders", Handler).WithTags("Orders");
        }

        private static async Task<IResult> Handler([FromBody] Request request, ApplicationDBContext context, ClaimsPrincipal User) {
            var Validator = new Validator();
            var ValidatedResult = Validator.Validate(request);
            if (!ValidatedResult.IsValid) {
                return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
            }

            var Cart = await context.Users
                     .Include(u => u.Cart)
                         .ThenInclude(u => u.CartProducts)
                             .ThenInclude(p => p.ProductNavigation)
                     .Where(u => u.UserName == User.Identity.Name)
                     .Select(u => u.Cart)
                     .FirstOrDefaultAsync();
            var account = await context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
            if (Cart.CartProducts.Any(p => p.Quantity > p.ProductNavigation.Quantity)) {
                return Results.BadRequest(new Response(false,"Lỗi thực hiện!",ValidatedResult));
            }
            var Details = new List<OrderDetail>();
            var Order = new Order() {
                User=account,
                Address=request.Address,
                DateOfOrder=DateTime.Now,
                Receiver=request.Receiver,
                PhoneNumber=request.PhoneNumber,
                PaymentMethod=request.PaymentMethod,
                NoteFromOrder="",
                Value=0
            };
            foreach (var product in Cart.CartProducts) {
                Details.Add(new OrderDetail() {
                    OrderNavigation=Order,
                    ProductNavigation=product.ProductNavigation,
                    Quantity=product.Quantity,
                    Price=product.ProductNavigation.IsDiscount? product.ProductNavigation.PriceAfterDiscount: product.ProductNavigation.Price,
                });
                product.ProductNavigation.Quantity -= product.Quantity;
                Order.Value += product.ProductNavigation.IsDiscount ? product.ProductNavigation.PriceAfterDiscount * product.Quantity : product.ProductNavigation.Price * product.Quantity;
                context.CartProducts.Remove(product);
            }
            Order.Details = Details;
            await context.Orders.AddAsync(Order);
            if (await context.SaveChangesAsync() > 0) {
                return Results.Ok(new Response(true, "", ValidatedResult));
            }
            return Results.BadRequest(new Response(false,"Lỗi thực hiện!",ValidatedResult));
        }
    }
}
