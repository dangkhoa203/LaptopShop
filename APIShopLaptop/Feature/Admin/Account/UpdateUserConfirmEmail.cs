using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;


namespace APIShopLaptop.Feature.Admin.Account {
    public class UpdateUserConfirmEmail : IEndpoint {
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Account/Email/{id}", Handler).WithTags("Admin_Account");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(string id, ApplicationDBContext applicationDBContext) {
            try {
                var User = applicationDBContext.Users.FirstOrDefault(x => x.Id == id);

                if (User == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy người dùng!"));

                User.EmailConfirmed = true;

                if (await applicationDBContext.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, ""));
                }

                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!"));

            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, "Lỗi Server"));
            }
        }
    }
}
