using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace APIShopLaptop.Feature.Admin.Account {
    public class LogOutAdmin:IEndpoint {
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Account/Admin/LogOut", Handler).RequireAuthorization().WithTags("Admin_Account");
        }
        [Authorize(Roles = "Admin")]
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
