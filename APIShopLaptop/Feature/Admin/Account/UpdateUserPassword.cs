using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;

namespace APIShopLaptop.Feature.Admin.Account {
    public class UpdateUserPassword:IEndpoint {
        public record Request(string Password);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Password).NotEmpty().WithMessage("Chưa nhập mật khẩu");
                RuleFor(r => r.Password).MinimumLength(3).WithMessage("Phải nhập tối thiểu 3 ký tự");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Account/Password/{id}", Handler).WithTags("Admin_Account");
        }
        private static async Task<IResult> Handler(Request request,string id, UserManager<AppUser> userManager, ApplicationDBContext applicationDBContext) {
            try {
                var Validator = new Validator();
                var ValidationResult = await Validator.ValidateAsync(request);
                if (!ValidationResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidationResult));
                }
                var user =await userManager.FindByIdAsync(id);
                if (user == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy user!", ValidationResult));
                var code = await userManager.GeneratePasswordResetTokenAsync(user);
                var result= await userManager.ResetPasswordAsync(user, code, request.Password);
                if (!result.Succeeded) {
                    return Results.BadRequest(new Response(false, "Lỗi thực hiện", ValidationResult));
                }
                return Results.Ok(new Response(true, "", ValidationResult));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, "Lỗi Server",null));
            }
        }
    }
}
