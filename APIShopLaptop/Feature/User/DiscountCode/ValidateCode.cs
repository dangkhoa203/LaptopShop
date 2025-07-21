using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.DiscountCode {
    public class ValidateCode : IEndpoint {
        public record Request(string Code);
        public record DiscountCodeDTO(string Id, string Name, string Description, float Percent, string Code);
        public record Response(bool Success, DiscountCodeDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Discount-Codes", Handler).WithTags("Discount-Codes");
        }
        private static async Task<IResult> Handler(Request request,ApplicationDBContext context) {
            try {
                var DiscountCode = await context.DiscountCodes
                                                .Where(d => d.IsActive && DateTime.Compare(d.EndDate, DateTime.Now) > 0)
                                                .Where(d=>d.Code==request.Code)
                                                .Select(c => new DiscountCodeDTO(
                                                    c.Id,
                                                    c.Name,
                                                    c.Description,
                                                    c.Percent,
                                                    c.Code
                                                    ))
                                                .FirstOrDefaultAsync();
                if (DiscountCode == null) {
                    return Results.BadRequest(new Response(false, null, "Mã không tìm thấy!"));
                }
                return Results.Ok(new Response(true, DiscountCode, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, null, "Lỗi đã xảy ra!"));
            }
        }
    }
}
