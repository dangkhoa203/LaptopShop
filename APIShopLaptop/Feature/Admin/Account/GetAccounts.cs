using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Identity;

namespace APIShopLaptop.Feature.Admin.Account {
    public class GetAccounts:IEndpoint {
        public record UserDTO(string Id,string UserName,string Email,bool EmailConfirm,DateTime RegisterDate);
        public record Response(bool Success, List<UserDTO> data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Account", Handler).WithTags("Admin_Account");
        }
        private static async Task<IResult> Handler(ApplicationDBContext applicationDBContext, UserManager<AppUser> userManager) {
            try {
                var User = await userManager.GetUsersInRoleAsync("User");
                var data = User
                    .Select(u => new UserDTO(u.Id, u.UserName, u.Email,u.EmailConfirmed, u.DateCreated))
                    .ToList();
                return Results.Ok(new Response(true,data,""));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, [], "Lỗi Server"));
            }
        }
    }
}
