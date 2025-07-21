using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Middleware.Momo;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NanoidDotNet;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Orders.MoMo {
    public class CreateNewMomoTransaction : IEndpoint {
        public record Request(string OrderId);
        public record Response(bool Success,string data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Orders/Momo", Handler).WithTags("Orders");
        }
        [Authorize(Roles = "User")]
        private static async Task<IResult> Handler([FromBody] Request request, MoMoService moMoService, ApplicationDBContext context, ClaimsPrincipal User) {
            var Order = await context.Orders
                .Include(o=>o.MomoTransaction)
                .Where(o =>
                        !o.MomoTransaction.IsPaid &&
                        o.PaymentMethod == PAYMENTMETHOD.MOMO)
                .FirstOrDefaultAsync(o => o.Id == request.OrderId);

            if (Order == null) {
                return Results.BadRequest(new Response(false,"","Lỗi"));
            }

            Order.MomoTransaction.RequestId= Order.Id + Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits, 6);
            if (await context.SaveChangesAsync() > 0) {
                var response = await moMoService.CreatePaymentAsync(Order.MomoTransaction.RequestId, $"{Order.Receiver},{Order.Address},{Order.PhoneNumber}", Order.Value, Order.MomoTransaction.RequestId);
                if (response.ErrorCode == 0) {
                    return Results.Ok(new Response(true,response.PayUrl, ""));
                }
                return Results.BadRequest(new Response(false, "", "Lỗi Momo!"));
            }
            return Results.BadRequest(new Response(false,"", "Lỗi"));
        }
    }
}
