using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using static APIShopLaptop.Feature.User.Builds.GetBuild;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace APIShopLaptop.Feature.User.Builds {
    public class GetProductForBuild : IEndpoint {
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount);
        public record CompatibilityDTO(string Id, string Value);
        public record Request(string CategoryId, List<CompatibilityDTO> Compatibilities);
        public record Response(bool Success, List<ProductDTO> Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Build/Product", Handler).WithTags("Build");
        }
        private static async Task<IResult> Handler([FromBody]Request request, ApplicationDBContext context, ClaimsPrincipal User) {
            try {

                var subCategory = await context.SubCaterories
                       .Include(c => c.MainCaterory)
                       .Where(c => c.MainCaterory.Id == request.CategoryId)
                       .Select(c => c.Id)
                       .ToListAsync();

                var Products =  context.CateroryItems
                   .Include(i => i.ProductNavigation)
                   .ThenInclude(p => p.Compatibilitys)
                   .Where(i => subCategory.Any(c => c == i.CateroryId))
                   .Select(p=>p.ProductNavigation);
                var Filter = request.Compatibilities.Count<=0 ? 
                                            Products
                                            :
                                            Products.Where(
                                                p=>p.Compatibilitys.Count==0||
                                                p.Compatibilitys.All(c=>!request.Compatibilities.Any(r=>r.Id==c.SpecificationId))||
                                                p.Compatibilitys.Any(c=>request.Compatibilities.Any(r=>r.Id==c.SpecificationId && r.Value==c.Value))
                                            );
                var data=await Filter.GroupBy(i => i.Id)
                   .Select(i => new ProductDTO(
                           i.First().Id,
                           i.First().Name,
                           i.First().Price,
                           i.First().Quantity,
                           i.First().IsDiscount,
                           i.First().PriceAfterDiscount
                       ))
                   .ToListAsync();
                return Results.Ok(new Response(true, data, ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, [], "Lỗi đã xảy ra!"));
            }
        }
    }
}