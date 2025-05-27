using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Text;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Enum;

namespace APIShopLaptop.Feature.User.UserAccount.ResetPassword {
    public class CheckAccountForReset : IEndpoint {
        public record Response(bool Success);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Account/PasswordReset/ResetValidation/{userid}/", Handler).WithTags("Account");
        }
        private static async Task<IResult> Handler([FromRoute] string userid, UserManager<AppUser> userManager) {
            try {
                AppUser User = await userManager.FindByIdAsync(Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(userid)));

                if (User != null) {
                    return Results.Ok(new Response(true));
                }

                return Results.Ok(new Response(false));
            }
            catch (Exception) {
                return Results.Ok(new Response(false));
            }

        }
    }
}
