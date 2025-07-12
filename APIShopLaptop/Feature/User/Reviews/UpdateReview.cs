using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Entity.Review_Related;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Reviews {
    public class UpdateReview : IEndpoint {
        public record Request(string Id, float Score, string Content);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Score).ExclusiveBetween(0, 6).WithMessage("Không hợp lệ");
            }
            public bool CheckSame(Request request, Review review) {
                return request.Score == review.Score && request.Content == review.Content;
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Reviews", Handler).WithTags("Reviews");
        }
        private static async Task<IResult> Handler(Request request, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var Validator = new Validator();
                var ValidatedResult = Validator.Validate(request);
                if (!ValidatedResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
                }

                var Account = await context.Users.Include(u=>u.Reviews).FirstOrDefaultAsync(u => u.UserName == User.Identity.Name);
                if(Account == null) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                }
                var Review=Account.Reviews.FirstOrDefault(r=>r.Id==request.Id);
                if (Review == null) {
                    return Results.BadRequest(new Response(false, "Không tìm thấy review!", ValidatedResult));
                }
                if (Validator.CheckSame(request, Review)) {
                    return Results.BadRequest(new Response(false, "Chưa thay đổi!", ValidatedResult));
                }
                Review.Content = request.Content;
                Review.Score = request.Score;
                Review.IsEdit = true;

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
