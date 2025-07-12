using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Middleware.Momo;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Enum;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Orders.MoMo {
    public class test : IEndpoint {
        public record Request(string orderId);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/test", Handler).WithTags("Orders");
        }

        private static async Task<IResult> Handler([FromBody] Request request, MoMoService moMoService, ApplicationDBContext context, ClaimsPrincipal User) {
            //var Order = await context.Orders.FirstOrDefaultAsync(o=>o.Id==request.orderId);
            //if (Order == null) {
            //    return Results.BadRequest("Lỗi");
            //}
            var response = await moMoService.CreatePaymentAsync(request.orderId, "A,b,c", 100000,"2");

            return Results.Ok(response);

        }
    }
}
