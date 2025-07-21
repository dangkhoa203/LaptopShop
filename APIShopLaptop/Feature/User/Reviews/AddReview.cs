using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Review_Related;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Reviews {
    public class AddReview : IEndpoint {
        public record Request(string OrderID,string ProductId,float Score,string Content);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Score).ExclusiveBetween(0, 6).WithMessage("Không hợp lệ");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Reviews", Handler).WithTags("Reviews");
        }
        [Authorize(Roles = "User")]
        private static async Task<IResult> Handler(Request request, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Validator = new Validator();
                var ValidatedResult = Validator.Validate(request);
                if (!ValidatedResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
                }

                var Order=await context.Orders.Include(o=>o.Details).ThenInclude(d=>d.ProductNavigation).FirstOrDefaultAsync(o=>o.Id==request.OrderID);
               
                if ( Order == null) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                }

                var Product = Order.Details.Select(d => d.ProductNavigation).FirstOrDefault(p => p.Id == request.ProductId);
                var Account = await context.Users.FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if (Product == null || Account==null) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                }
               
                var Review=new Review() {
                    Content=request.Content,
                    Score=request.Score,
                    Order=Order,
                    Product=Product,
                    IsEdit=false,
                    User=Account
                };
                await context.Reviews.AddAsync(Review);
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, "", ValidatedResult));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!", null));
            }

        }
    }
}
