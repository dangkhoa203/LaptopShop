using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Order_Related;
using FluentValidation;
using FluentValidation.Results;
namespace APIShopLaptop.Feature.Admin.DiscountCodes {
    public class UpdateDiscountCode:IEndpoint {
        public record Request(string Name, string Description, float Percent, bool IsActive,DateTime EndDate);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Percent).InclusiveBetween(0, 100).WithMessage("Phần trăm không thích hợp!");
            }
            public bool CheckSame(Request request, DiscountCode code) {
                var old = new Request(code.Name, code.Description, code.Percent, code.IsActive,code.EndDate);
                return request == old;
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Discount-Codes/{id}", Handler).WithTags("Admin_DiscountCode");
        }
        public static async Task<IResult> Handler(string id, Request request, ApplicationDBContext context) {
            try {
                var Validator = new Validator();
                var ValidationResult = await Validator.ValidateAsync(request);
                if (!ValidationResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidationResult));
                }

                var DiscountCode = context.DiscountCodes.FirstOrDefault(d => d.Id == id);
                if (DiscountCode == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy mã!", ValidationResult));

                if (!Validator.CheckSame(request, DiscountCode)) {
                    DiscountCode.Name = request.Name;
                    DiscountCode.Description = request.Description;
                    DiscountCode.Percent = request.Percent;
                    DiscountCode.IsActive = request.IsActive;
                    DiscountCode.EndDate = request.EndDate;
                    DiscountCode.UpdateAt=DateTime.Now;
                    if (await context.SaveChangesAsync() < 1) {
                        return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidationResult));
                    }
                }
                return Results.Ok(new Response(true, "", ValidationResult));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, "Lỗi Server", null));
            }
        }
    }
}
