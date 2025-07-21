using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Security.Claims;
using System.Text;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Enum;
using APIShopLaptop.Middleware.Email;

namespace APIShopLaptop.Feature.User.UserAccount.ChangeEmail {
    public class SendChangeEmailRequest : IEndpoint {
        public record Request(string NewEmail);
        public record Response(bool Success, string ErrorMessage);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.NewEmail).EmailAddress().WithMessage("Email chưa hợp lệ!");
            }
            public async Task<IResult> CheckValid(Request request, UserManager<AppUser> userManager, AppUser userDetail) {
                var ValidateResult = await ValidateAsync(request);
                if (!ValidateResult.IsValid)
                    return Results.BadRequest(new Response(false, "Email chưa hợp lệ"));

                if (request.NewEmail == userDetail.Email)
                    return Results.BadRequest(new Response(false, "Email mới giống email cũ!"));


                if (await userManager.FindByEmailAsync(request.NewEmail) != null)
                    return Results.BadRequest(new Response(false, "email mới đang được sử dụng!"));

                return null;
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Account/EmailChange/", Handler).WithTags("Account");
        }
        [Authorize(Roles = "User")]
        private static async Task<IResult> Handler(Request request, UserManager<AppUser> userManager, ClaimsPrincipal User, EmailSender emailSender) {
            try {
                var Validator = new Validator();
                AppUser userDetail = await userManager.FindByNameAsync(User.Identity.Name);
               
                var ValidateResult = await Validator.CheckValid(request, userManager, userDetail);
                if (ValidateResult != null)
                    return ValidateResult;

                var Token = await userManager.GenerateChangeEmailTokenAsync(userDetail, request.NewEmail);
                Token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(Token));

                string WebEmail = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(request.NewEmail));
                var ConfirmLink = $"http://localhost:7088/XacNhanDoiEmail/{WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(userDetail.Id))}/{WebEmail}/{Token}";

                bool EmailResponse = await emailSender.SendEmail(userDetail.Email, "Xác nhận thay đổi email", "Nhấn vào nút này để thay đổi email.", ConfirmLink, "Thay đổi");
                if (!EmailResponse) {
                    return Results.BadRequest(new Response(false, "Lỗi đã xảy ra!"));
                }

                return Results.Ok(new Response(true, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!"));
            }
        }
    }
}
