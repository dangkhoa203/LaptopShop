using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Enum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.User.Specification {
    public class SearchProductOnSpecification : IEndpoint {
        public record SpecificationDTO(string Id,string Value);
        public record Request(List<SpecificationDTO> Specifications);
        public record ProductDTO(string Id, string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount);
        public record DataDTO(List<ProductDTO> Products, int MaxPage, int Total);
        public record Response(bool Success, DataDTO Data, string ErrorMessage);

        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Specifications/Product", Handler).WithTags("Specifications");
        }
        private static async Task<IResult> Handler([FromBody] Request request, [FromQuery] int page, [FromQuery] SORTMODE sortMode, ApplicationDBContext context, ClaimsPrincipal User) {
            try {
                int perPage = 12;
                var Products = await context.Products.Include(p => p.Specifications).Where(p => p.Status == PRODUCTSTATUS.ACTIVE).ToListAsync();
                var Filter=Products.Where(p =>  request.Specifications.All(s => p.Specifications.Any(rs => rs.SpecificationId == s.Id &&  s.Value.Contains(rs.Value)))).ToList();
                IEnumerable<ProductDTO> Sort;
                switch (sortMode) {
                    case SORTMODE.NAME_ASC:
                    Sort = Filter.OrderBy(p => p.Name).Select(p => new ProductDTO(
                                          p.Id, p.Name, p.Price, p.Quantity, p.IsDiscount, p.PriceAfterDiscount
                                       ));
                    break;

                    case SORTMODE.NAME_DES:
                    Sort = Products.OrderByDescending(p => p.Name).Select(p => new ProductDTO(
                                          p.Id, p.Name, p.Price, p.Quantity, p.IsDiscount, p.PriceAfterDiscount
                                       ));
                    break;
                    case SORTMODE.NEWEST:
                    Sort = Products.OrderBy(p => p.CreatedAt).Select(p => new ProductDTO(
                                          p.Id, p.Name, p.Price, p.Quantity, p.IsDiscount, p.PriceAfterDiscount
                                       ));
                    break;
                    case SORTMODE.OLDEST:
                    Sort = Products.OrderByDescending(p => p.CreatedAt).Select(p => new ProductDTO(
                                          p.Id, p.Name, p.Price, p.Quantity, p.IsDiscount, p.PriceAfterDiscount
                                       ));
                    break;
                    case SORTMODE.PRICE_ASC:
                    Sort = Products.OrderBy(p => p.IsDiscount ? p.PriceAfterDiscount : p.PriceAfterDiscount).Select(p => new ProductDTO(
                                          p.Id, p.Name, p.Price, p.Quantity, p.IsDiscount, p.PriceAfterDiscount
                                       ));
                    break;
                    case SORTMODE.PRICE_DES:
                    Sort = Products.OrderByDescending(p => p.IsDiscount ? p.PriceAfterDiscount : p.PriceAfterDiscount).Select(p => new ProductDTO(
                                          p.Id, p.Name, p.Price, p.Quantity, p.IsDiscount, p.PriceAfterDiscount
                                       ));
                    break;
                    default:
                    Sort = Products.OrderBy(p => p.Name).Select(p => new ProductDTO(
                                          p.Id, p.Name, p.Price, p.Quantity, p.IsDiscount, p.PriceAfterDiscount
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