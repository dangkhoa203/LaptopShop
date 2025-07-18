using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp.Metadata.Profiles.Exif;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Web;
using static APIShopLaptop.Feature.User.Builds.GetBuild;

namespace APIShopLaptop.Feature.User.Builds {
    public class GetProductForBuild : IEndpoint {
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount);
        public record CompatibilityDTO(string Id, string Value);
        public record DataDTO(List<ProductDTO> Products, int MaxPage, int Total);
        public record Response(bool Success, DataDTO Data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Build/Product/{CategoryId}", Handler).WithTags("Build");
        }
        private static async Task<IResult> Handler([FromRoute] string CategoryId, [FromQuery]string search, [FromQuery]int page, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                var BuildItem = await context.Users
                .Include(u => u.Build)
                    .ThenInclude(u => u.BuildItems)
                        .ThenInclude(p => p.ProductNavigation)
                            .ThenInclude(p => p.Compatibilitys)
                .Where(u => u.UserName == User.Identity.Name)
                .Select(u => u.Build.BuildItems)
                .FirstOrDefaultAsync();
                var compatibilities=new List<CompatibilityDTO>();
                foreach(var item in BuildItem) {
                    foreach(var productCompatibility in item.ProductNavigation.Compatibilitys) {
                        if (compatibilities.Any(c => c.Id == productCompatibility.SpecificationId && c.Value == productCompatibility.Value))
                            continue;
                        compatibilities.Add(new CompatibilityDTO(productCompatibility.SpecificationId, productCompatibility.Value));
                    }
                }

                var subCategory = await context.SubCaterories
                       .Include(c => c.MainCaterory)
                       .Where(c => c.MainCaterory.Id == CategoryId)
                       .Select(c => c.Id)
                       .ToListAsync();

                var Products = await context.CateroryItems
                   .Include(i => i.ProductNavigation)
                   .ThenInclude(p => p.Compatibilitys)
                   .Where(i => i.ProductNavigation.Status==Model.Enum.PRODUCTSTATUS.ACTIVE)
                   .Where(i => subCategory.Any(c => c == i.CateroryId))
                   .Where(i=>i.ProductNavigation.Name.Contains(search))
                   .Select(p=>p.ProductNavigation).ToListAsync();
                var Filter = compatibilities.Count<=0 ? 
                                            Products
                                            :
                                            Products.Where(
                                                p=>p.Compatibilitys.Count==0||
                                                p.Compatibilitys.All(c=>!compatibilities.Any(r=>r.Id==c.SpecificationId))||
                                                compatibilities.Where(c=>p.Compatibilitys.Any(r => r.SpecificationId == c.Id)).All(c=> p.Compatibilitys.Any(r => r.SpecificationId == c.Id && r.Value == c.Value))
                                            );
                var test= Filter.ToList();
                var data= Filter.GroupBy(i => i.Id)
                   .Select(i => new ProductDTO(
                           i.First().Id,
                           i.First().Name,
                           i.First().Price,
                           i.First().Quantity,
                           i.First().IsDiscount,
                           i.First().PriceAfterDiscount
                       ));
                var Total= data.Count();
                var TotalPage = (int)Math.Ceiling((double)data.Count() / 10);
                var list = data.Skip(10 * (page - 1)).Take(10).ToList();
                
                return Results.Ok(new Response(true,new DataDTO(list,TotalPage,Total), ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, new DataDTO([], 1, 0), "Lỗi đã xảy ra!"));
            }
        }
    }
}