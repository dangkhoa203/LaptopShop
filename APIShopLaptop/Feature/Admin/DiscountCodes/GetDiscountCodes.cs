using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.DiscountCodes {
    public class GetDiscountCodes:IEndpoint {
        public record DiscountCodeDTO(string Id, string Name, string Description, float Percent, bool IsActive,DateTime EndDate);
        public record Response(bool Success, List<DiscountCodeDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Discount-Codes", Handler).WithTags("Admin_DiscountCode");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var DiscountCodes = await context.DiscountCodes
                    .Select(c=>new DiscountCodeDTO(
                        c.Id,
                        c.Name,
                        c.Description,
                        c.Percent,
                        c.IsActive,
                        c.EndDate
                        ))
                    .ToListAsync();

                return Results.Ok(new Response(true, DiscountCodes, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}
