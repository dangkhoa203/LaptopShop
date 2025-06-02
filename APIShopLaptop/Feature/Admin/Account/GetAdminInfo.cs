using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.Account {
    public class GetAdminInfo:IEndpoint {
        public record Response(string UserName,string UserEmail, string UserId, bool IsLogged);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Account/Info", Handler).WithTags("Admin_Account");
        }
        private static async Task<IResult> Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ApplicationDBContext context, ClaimsPrincipal User) {
            try {

                if (User.Identity.Name == null)
                    return Results.Ok(new Response("", "", "", false));

                AppUser Info = await userManager.FindByNameAsync(User.Identity.Name);
                if (!await userManager.IsInRoleAsync(Info, "Admin")) {
                    return Results.Ok(new Response("", "", "", false));
                }
                return Results.Ok(new Response(Info.UserName, Info.Email, Info.Id, true));
            }
            catch (Exception ex) {
                return Results.Ok(new Response("", "", "", false));
            }

        }
    }
}
