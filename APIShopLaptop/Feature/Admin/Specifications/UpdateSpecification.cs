using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Entity.Spec_And_Filter;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Specifications {
    public class UpdateSpecification:IEndpoint {
        public record Request(string Name);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Name).MinimumLength(4).WithMessage("Tên phải nhập tối thiểu 4 ký tự!");
            }
            public bool CheckSame(Request request, Specification specification) {
                return request.Name == specification.Name;
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Specifications/{id}", Handler).WithTags("Specifications");
        }
        private static async Task<IResult> Handler(string id, Request request, ApplicationDBContext context) {
            try {
                var Validator = new Validator();
                var ValidatedResult = Validator.Validate(request);
                if (!ValidatedResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
                }

                Specification? specification = await context.Specifications.FirstOrDefaultAsync(s => s.Id == id);
                if (specification == null) {
                    return Results.NotFound(new Response(false, "Không tìm thấy thông số!", ValidatedResult));
                }

                if (!Validator.CheckSame(request, specification)) {
                    specification.Name = request.Name;
                    specification.UpdateAt = DateTime.Now;
                    if (await context.SaveChangesAsync() < 1) {
                        return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                    }
                }
                return Results.Ok(new Response(true, "", ValidatedResult));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!", null));
            }

        }
    }
}
