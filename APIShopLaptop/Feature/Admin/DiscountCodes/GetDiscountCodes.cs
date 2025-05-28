using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.DiscountCodes {
    public class GetDiscountCodes:IEndpoint {
        public record CodeDTO(string Id, string Name, string Description, float Percent, bool IsActive,DateTime EndDate);
        public record Response(bool Success, List<CodeDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Discount-Codes", Handler).WithTags("DiscountCode");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Codes = await context.DiscountCodes
                    .Select(c=>new CodeDTO(
                        c.Id,
                        c.Name,
                        c.Description,
                        c.Percent,
                        c.IsActive,
                        c.EndDate
                        ))
                    .ToListAsync();

                return Results.Ok(new Response(true, Codes, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}
