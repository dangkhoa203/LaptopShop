using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Category {
    public class GetProductFromMainCategory : IEndpoint {
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount,float Score);
        public record DataDTO(List<ProductDTO> Products, int MaxPage, int Total);
        public record Response(bool Success, DataDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Category/Main/{id}", Handler).WithTags("Category");
        }
        private static async Task<IResult> Handler([FromRoute] string Id, [FromQuery] int page, [FromQuery] SORTMODE sortMode, [FromQuery] string brands, ApplicationDBContext context) {
            try {
                List<string> brand = brands.Split(",").ToList();
                int perPage = 12;
                var subCategory = await context.SubCaterories
                                                .Include(c => c.MainCaterory)
                                                .Where(c => c.MainCaterory.Id == Id)
                                                .Select(c => c.Id)
                                                .ToListAsync();

                var Data = context.CateroryItems
                                   .Include(i => i.ProductNavigation)
                                       .ThenInclude(p => p.Brand)
                                   .Include(i => i.ProductNavigation)
                                       .ThenInclude(p => p.Reviews)
                                   .Include(i => i.ProductNavigation)
                                       .ThenInclude(p => p.Brand)
                                   .Where(i => subCategory.Any(c => c == i.CateroryId) && i.ProductNavigation.Status == PRODUCTSTATUS.ACTIVE);

                if (brand[0] != "") {
                    Data = Data.Where(i => brand.Any(b => b == i.ProductNavigation.Brand.Tag));
                }
                var Products=await Data.GroupBy(i => i.ProductId).ToListAsync();
                List<ProductDTO> Sort;
                switch (sortMode) {
                    case SORTMODE.NAME_ASC:
                    Sort = Products.OrderBy(p => p.First().ProductNavigation.Name).Select(p => new ProductDTO(
                                          p.First().ProductNavigation.Id, p.First().ProductNavigation.Name, p.First().ProductNavigation.Price, p.First().ProductNavigation.Quantity, p.First().ProductNavigation.IsDiscount, p.First().ProductNavigation.PriceAfterDiscount,p.First().ProductNavigation.Reviews.Count>0 ? p.First().ProductNavigation.Reviews.Sum(r=>r.Score)/ p.First().ProductNavigation.Reviews.Count :0
                                       )).ToList();
                    break;

                    case SORTMODE.NAME_DES:
                    Sort = Products.OrderByDescending(p => p.First().ProductNavigation.Name).Select(p => new ProductDTO(
                                          p.First().ProductNavigation.Id, p.First().ProductNavigation.Name, p.First().ProductNavigation.Price, p.First().ProductNavigation.Quantity, p.First().ProductNavigation.IsDiscount, p.First().ProductNavigation.PriceAfterDiscount, p.First().ProductNavigation.Reviews.Count > 0 ? p.First().ProductNavigation.Reviews.Sum(r => r.Score) / p.First().ProductNavigation.Reviews.Count : 0
                                       )).ToList();
                    break;
                    case SORTMODE.NEWEST:
                    Sort = Products.OrderBy(p => p.First().ProductNavigation.CreatedAt).Select(p => new ProductDTO(
                                          p.First().ProductNavigation.Id, p.First().ProductNavigation.Name, p.First().ProductNavigation.Price, p.First().ProductNavigation.Quantity, p.First().ProductNavigation.IsDiscount, p.First().ProductNavigation.PriceAfterDiscount, p.First().ProductNavigation.Reviews.Count > 0 ? p.First().ProductNavigation.Reviews.Sum(r => r.Score) / p.First().ProductNavigation.Reviews.Count : 0
                                       )).ToList();
                    break;
                    case SORTMODE.OLDEST:
                    Sort = Products.OrderByDescending(p => p.First().ProductNavigation.CreatedAt).Select(p => new ProductDTO(
                                          p.First().ProductNavigation.Id, p.First().ProductNavigation.Name, p.First().ProductNavigation.Price, p.First().ProductNavigation.Quantity, p.First().ProductNavigation.IsDiscount, p.First().ProductNavigation.PriceAfterDiscount, p.First().ProductNavigation.Reviews.Count > 0 ? p.First().ProductNavigation.Reviews.Sum(r => r.Score) / p.First().ProductNavigation.Reviews.Count : 0
                                       )).ToList();
                    break;
                    case SORTMODE.PRICE_ASC:
                    Sort = Products.OrderBy(p => p.First().ProductNavigation.IsDiscount ? p.First().ProductNavigation.PriceAfterDiscount : p.First().ProductNavigation.Price).Select(p => new ProductDTO(
                                          p.First().ProductNavigation.Id, p.First().ProductNavigation.Name, p.First().ProductNavigation.Price, p.First().ProductNavigation.Quantity, p.First().ProductNavigation.IsDiscount, p.First().ProductNavigation.PriceAfterDiscount, p.First().ProductNavigation.Reviews.Count > 0 ? p.First().ProductNavigation.Reviews.Sum(r => r.Score) / p.First().ProductNavigation.Reviews.Count : 0
                                       )).ToList();
                    break;
                    case SORTMODE.PRICE_DES:
                    Sort = Products.OrderByDescending(p => p.First().ProductNavigation.IsDiscount ? p.First().ProductNavigation.PriceAfterDiscount : p.First().ProductNavigation.Price).Select(p => new ProductDTO(
                                          p.First().ProductNavigation.Id, p.First().ProductNavigation.Name, p.First().ProductNavigation.Price, p.First().ProductNavigation.Quantity, p.First().ProductNavigation.IsDiscount, p.First().ProductNavigation.PriceAfterDiscount, p.First().ProductNavigation.Reviews.Count > 0 ? p.First().ProductNavigation.Reviews.Sum(r => r.Score) / p.First().ProductNavigation.Reviews.Count : 0
                                       )).ToList();
                    break;
                    default:
                    Sort = Products.OrderBy(p => p.First().ProductNavigation.Name).Select(p => new ProductDTO(
                                          p.First().ProductNavigation.Id, p.First().ProductNavigation.Name, p.First().ProductNavigation.Price, p.First().ProductNavigation.Quantity, p.First().ProductNavigation.IsDiscount, p.First().ProductNavigation.PriceAfterDiscount, p.First().ProductNavigation.Reviews.Count > 0 ? p.First().ProductNavigation.Reviews.Sum(r => r.Score) / p.First().ProductNavigation.Reviews.Count : 0
                                       )).ToList();
                    break;

                }
                var Total = Sort.Count();
                var TotalPage = (int)Math.Ceiling((double)Total / perPage);
                var list = Sort.Skip(perPage * (page - 1)).Take(perPage).ToList();
                return Results.Ok(new Response(true, new DataDTO(list, TotalPage, Total), ""));
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, new DataDTO([], 1, 0), "Lỗi đã xảy ra!"));
            }
        }
    }
}
