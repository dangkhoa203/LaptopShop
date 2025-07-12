using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.User.Caterory {
    public class GetProductsFromSubCaterory : IEndpoint {
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount);
        public record DataDTO(List<ProductDTO> Products, int MaxPage, int Total);
        public record Response(bool Success, DataDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Category/Sub/{id}", Handler).WithTags("Category");
        }
        private static async Task<IResult> Handler([FromRoute]string Id,[FromQuery]int page, [FromQuery]SORTMODE sortMode, [FromQuery] string brands, ApplicationDBContext context) {
            try {
                List<string> brand = brands.Split(",").ToList();
                int perPage = 12;
                var Products = context.CateroryItems
                    .Where(i => i.CateroryId == Id)
                    .Include(i => i.ProductNavigation)
                    .ThenInclude(i=>i.Brand)
                    .Where(i => i.ProductNavigation.Status == PRODUCTSTATUS.ACTIVE);
                IQueryable<ProductDTO> Sort;
                if (brand[0] !="") {
                    Products = Products.Where(i=>brand.Any(b=>b==i.ProductNavigation.Brand.Tag));
                }
                switch (sortMode) {
                    case SORTMODE.NAME_ASC:
                        Sort = Products.OrderBy(p => p.ProductNavigation.Name).Select(p => new ProductDTO(
                                              p.ProductNavigation.Id, p.ProductNavigation.Name, p.ProductNavigation.Price, p.ProductNavigation.Quantity, p.ProductNavigation.IsDiscount, p.ProductNavigation.PriceAfterDiscount
                                           ));
                        break;
                    
                    case SORTMODE.NAME_DES:
                        Sort = Products.OrderByDescending(p => p.ProductNavigation.Name).Select(p => new ProductDTO(
                                              p.ProductNavigation.Id, p.ProductNavigation.Name, p.ProductNavigation.Price, p.ProductNavigation.Quantity, p.ProductNavigation.IsDiscount, p.ProductNavigation.PriceAfterDiscount
                                           ));
                        break;
                    case SORTMODE.NEWEST:
                        Sort = Products.OrderBy(p => p.ProductNavigation.CreatedAt).Select(p => new ProductDTO(
                                              p.ProductNavigation.Id, p.ProductNavigation.Name, p.ProductNavigation.Price, p.ProductNavigation.Quantity, p.ProductNavigation.IsDiscount, p.ProductNavigation.PriceAfterDiscount
                                           ));
                        break;
                    case SORTMODE.OLDEST:
                        Sort = Products.OrderByDescending(p => p.ProductNavigation.CreatedAt).Select(p => new ProductDTO(
                                              p.ProductNavigation.Id, p.ProductNavigation.Name, p.ProductNavigation.Price, p.ProductNavigation.Quantity, p.ProductNavigation.IsDiscount, p.ProductNavigation.PriceAfterDiscount
                                           ));
                        break;
                    case SORTMODE.PRICE_ASC:
                        Sort = Products.OrderBy(p =>p.ProductNavigation.IsDiscount ?   p.ProductNavigation.PriceAfterDiscount:p.ProductNavigation.PriceAfterDiscount).Select(p => new ProductDTO(
                                              p.ProductNavigation.Id, p.ProductNavigation.Name, p.ProductNavigation.Price, p.ProductNavigation.Quantity, p.ProductNavigation.IsDiscount, p.ProductNavigation.PriceAfterDiscount
                                           ));
                        break;
                    case SORTMODE.PRICE_DES:
                        Sort = Products.OrderByDescending(p => p.ProductNavigation.IsDiscount ? p.ProductNavigation.PriceAfterDiscount : p.ProductNavigation.PriceAfterDiscount).Select(p => new ProductDTO(
                                              p.ProductNavigation.Id, p.ProductNavigation.Name, p.ProductNavigation.Price, p.ProductNavigation.Quantity, p.ProductNavigation.IsDiscount, p.ProductNavigation.PriceAfterDiscount
                                           ));
                        break;
                    default:
                        Sort = Products.OrderBy(p => p.ProductNavigation.Name).Select(p => new ProductDTO(
                                              p.ProductNavigation.Id, p.ProductNavigation.Name, p.ProductNavigation.Price, p.ProductNavigation.Quantity, p.ProductNavigation.IsDiscount, p.ProductNavigation.PriceAfterDiscount
                                           ));
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
