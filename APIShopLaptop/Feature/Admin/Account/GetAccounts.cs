using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace APIShopLaptop.Feature.Admin.Account {
    public class GetAccounts:IEndpoint {
        public record UserDTO(string Id,string UserName,string Email,bool EmailConfirm,DateTime RegisterDate);
        public record Response(bool Success, List<UserDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Account", Handler).WithTags("Admin_Account");
        }
        [Authorize(Roles ="Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext applicationDBContext, UserManager<AppUser> userManager) {
            try {
                var Users = await userManager.GetUsersInRoleAsync("User");

                var Data = Users
                    .Select(u => new UserDTO(u.Id, u.UserName, u.Email,u.EmailConfirmed, u.DateCreated))
                    .OrderByDescending(u=>u.RegisterDate)
                    .ToList();

                return Results.Ok(new Response(true, Data, ""));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, [], "Lỗi Server"));
            }
        }
    }
}
