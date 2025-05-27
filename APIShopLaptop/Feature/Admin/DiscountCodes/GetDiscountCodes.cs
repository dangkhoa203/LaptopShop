using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.DiscountCodes {
    public class GetDiscountCodes:IEndpoint {
        public record CodeDTO(string Id, string Name,int UseCount, string Description, float Percent, bool IsActive,DateTime CreatedDate,DateTime UpdatedDated);
        public record Response(bool Success, List<CodeDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/Discount-Codes", Handler).WithTags("DiscountCode");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var Codes = await context.DiscountCodes
                    .Include(c=>c.Orders)
                    .Select(c=>new CodeDTO(
                        c.Id,
                        c.Name,
                        c.Orders.Count,
                        c.Description,
                        c.Percent,
                        c.IsActive,
                        c.CreatedAt,
                        c.UpdateAt))
                    .ToListAsync();

                return Results.Ok(new Response(true, Codes, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}
