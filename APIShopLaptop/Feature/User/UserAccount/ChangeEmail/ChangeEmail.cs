using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;

namespace APIShopLaptop.Feature.User.UserAppUser.ChangeEmail {
    public class ChangeEmail : IEndpoint {
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/AppUser/EmailChange/{userId}/{newEmail}/{code}", Handler).WithTags("AppUser");
        }
        private static async Task<IResult> Handler(string userId, string newEmail, string code, UserManager<AppUser> userManager) {
            try {
                AppUser User = await userManager.FindByIdAsync(Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(userId)));

                if (User == null)
                    return Results.BadRequest(new Response(false, "Không tìm ra người dùng!"));

                newEmail = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(newEmail));
                code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));

                var Result = await userManager.ChangeEmailAsync(User, newEmail, code);
                if (!Result.Succeeded)
                    return Results.BadRequest(new Response(false, "Lỗi đã xảy ra!"));

                return Results.Ok(new Response(true, ""));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!"));
            }
        }
    }
}
