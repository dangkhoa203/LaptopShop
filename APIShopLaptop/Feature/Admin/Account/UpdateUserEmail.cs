using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace APIShopLaptop.Feature.Admin.Account {
    public class UpdateUserEmail:IEndpoint {
        public record Request(string Email);
        public record Response(bool Success, string ErrorMessage,ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Email).NotEmpty().WithMessage("Chưa nhập email!");
                RuleFor(r => r.Email).EmailAddress().WithMessage("Email không hợp lệ!");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Account/Email/{id}", Handler).WithTags("Admin_Account");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(Request request, string id, UserManager<AppUser> userManager, ApplicationDBContext applicationDBContext) {
            try {
                var Validator = new Validator();
                var ValidationResult = await Validator.ValidateAsync(request);
                if (!ValidationResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidationResult));
                }

                var EmailInUse=await userManager.FindByEmailAsync(request.Email);
                if (EmailInUse != null) {
                    return Results.BadRequest(new Response(false, "Email đang có người sử dụng!", ValidationResult));
                }

                var User = await userManager.FindByIdAsync(id);
                if (User == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy user!", ValidationResult));

                var Token = await userManager.GenerateChangeEmailTokenAsync(User, request.Email);
                var Result = await userManager.ChangeEmailAsync(User, request.Email, Token);

                if (!Result.Succeeded) {
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
