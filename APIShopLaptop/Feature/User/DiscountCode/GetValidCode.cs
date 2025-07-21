using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.DiscountCode {
    public class GetValidCode : IEndpoint {
        public record DiscountCodeDTO(string Id, string Name, string Description, float Percent,string Code);
        public record Response(bool Success, List<DiscountCodeDTO> Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Discount-Codes", Handler).WithTags("Discount-Codes");
        }
        private static async Task<IResult> Handler(ApplicationDBContext context) {
            try {
                var DiscountCodes = await context.DiscountCodes
                                                .Where(d=>d.IsActive && DateTime.Compare(d.EndDate,DateTime.Now)>0)
                                                .Select(c => new DiscountCodeDTO(
                                                    c.Id,
                                                    c.Name,
                                                    c.Description,
                                                    c.Percent,
                                                    c.Code
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
