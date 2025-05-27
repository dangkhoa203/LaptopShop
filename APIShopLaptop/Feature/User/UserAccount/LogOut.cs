using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Identity;

namespace APIShopLaptop.Feature.User.UserAccount {
    public class LogOut : IEndpoint {
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Account/LogOut", Handler).RequireAuthorization().WithTags("Account");
        }
        private static async Task<IResult> Handler(SignInManager<AppUser> signInManager) {
            try {
                await signInManager.SignOutAsync();
                return Results.Ok(new Response(true, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra"));
            }
        }
    }
}
