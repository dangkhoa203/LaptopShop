using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Security;
using System.Text;

namespace APIShopLaptop.Feature.User.UserAccount {
    public class ConfirmAccount : IEndpoint {
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Account/ConfirmAccount/{userName}/{code}", Handler).WithTags("Account");
        }
        private static async Task<IResult> Handler([FromRoute] string userName, [FromRoute] string code, UserManager<AppUser> userManager) {
            try {
                AppUser User = await userManager.FindByNameAsync(Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(userName)));
                if (User == null) {
                    return Results.NotFound(new Response(false, "Người dùng không tìm thấy"));
                }

                if (User.EmailConfirmed) {
                    return Results.BadRequest(new Response(false, "Đã xác nhận tài khoản."));
                }

                code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
                var result = await userManager.ConfirmEmailAsync(User, code);
                if (!result.Succeeded) {
                    return Results.BadRequest(new Response(false, "Lỗi đã xảy ra"));
                }

                await userManager.AddToRoleAsync(User, "Admin");
                return Results.Ok(new Response(true, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra"));
            }

        }

    }
}
