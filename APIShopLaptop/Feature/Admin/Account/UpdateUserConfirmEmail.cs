using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;


namespace APIShopLaptop.Feature.Admin.Account {
    public class UpdateUserConfirmEmail : IEndpoint {
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Account/Email/{id}", Handler).WithTags("AdminAccount");
        }
        private static async Task<IResult> Handler(string id, ApplicationDBContext applicationDBContext) {
            try {
                var user = applicationDBContext.Users.FirstOrDefault(x => x.Id == id);
                if (user == null)
                    return Results.NotFound(new Response(false, "Không tìm thấy user!"));
                user.EmailConfirmed = true;
                await applicationDBContext.SaveChangesAsync();
                return Results.Ok(new Response(true, ""));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, "Lỗi Server"));
            }
        }
    }
}
