using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Order_Related;
using FluentValidation;
using FluentValidation.Results;

namespace APIShopLaptop.Feature.Admin.DiscountCodes {
    public class AddDiscountCode : IEndpoint {
        public record Request(string Name,string Description,float Percent,bool IsActive,DateTime EndDate);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Percent).InclusiveBetween(1, 100).WithMessage("Phần trăm không thích hợp!");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Discount-Codes", Handler).WithTags("Admin_DiscountCode");
        }
        public static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var Validator = new Validator();
                var ValidationResult = await Validator.ValidateAsync(request);
                if (!ValidationResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidationResult));
                }

                var DiscountCode=new DiscountCode() {
                   Name = request.Name,
                   Description = request.Description,
                   Percent = request.Percent,
                   IsActive = request.IsActive,
                   EndDate = request.EndDate
               };

                context.DiscountCodes.Add(DiscountCode);
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, "", ValidationResult));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidationResult));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, "Lỗi Server",null));
            }
        }
    }
}
