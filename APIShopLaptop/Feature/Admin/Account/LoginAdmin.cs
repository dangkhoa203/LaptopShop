using APIShopLaptop.Model.Entity.Account;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using APIShopLaptop.Endpoint;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;


namespace APIShopLaptop.Feature.Admin.Account {
    public class LoginAdmin:IEndpoint {
        public record Request(string UserName, string Password);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.UserName).NotEmpty().WithMessage("Chưa nhập tên");
                RuleFor(r => r.Password).NotEmpty().WithMessage("Chưa nhập mật khẩu");
                RuleFor(r => r.Password).MinimumLength(3).WithMessage("Phải nhập tối thiểu 3 ký tự");

            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Account/Login", Handler).WithTags("Admin_Account");
        }

        public static async Task<IResult> Handler(Request request, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ClaimsPrincipal User) {
            try {
                if (User.Identity.IsAuthenticated) {
                    await signInManager.SignOutAsync();
                }

                var Validator = new Validator();
                var ValidateResult = await Validator.ValidateAsync(request);
                if (!ValidateResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidateResult));
                }

                var LoginUser = await userManager.FindByNameAsync(request.UserName);
                if (LoginUser != null && await userManager.IsInRoleAsync(LoginUser, "Admin")) {
                    var result = await signInManager.PasswordSignInAsync(LoginUser, request.Password, false, false);
                    if (result.Succeeded) {
                        return Results.Ok(new Response(true, "", null));
                    }
                }
                return Results.BadRequest(new Response(false, "Hãy kiểm tra lại thông tin đăng nhập", ValidateResult));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra", null));
            }
        }
    }
}
