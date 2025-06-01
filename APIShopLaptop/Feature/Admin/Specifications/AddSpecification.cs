using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Entity.Spec_And_Filter;
using FluentValidation;
using FluentValidation.Results;

namespace APIShopLaptop.Feature.Admin.Specifications {
    public class AddSpecification:IEndpoint {
        public record Request(string Name);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Specifications", Handler).WithTags("Admin_Specifications");
        }
        private static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var Validator = new Validator();
                var ValidatedResult = Validator.Validate(request);
                if (!ValidatedResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
                }

                Specification specification = new(request.Name);

                await context.Specifications.AddAsync(specification);
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
