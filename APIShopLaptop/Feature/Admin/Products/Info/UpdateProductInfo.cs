using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Enum;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products.Info {
    public class UpdateProductInfo : IEndpoint {
        public record Request(string Name, float Price, int Quantity, bool IsDiscount, float PriceAfterDiscount, PRODUCTSTATUS Status, string BrandId);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Price).GreaterThan(0).WithMessage("Giá không phù hợp");
                RuleFor(r => r.PriceAfterDiscount).GreaterThanOrEqualTo(0).WithMessage("Giá không phù hợp");
                RuleFor(r => r.Quantity).GreaterThan(-1).WithMessage("Số lượng không phù hợp");
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Name).MinimumLength(4).WithMessage("Tên phải nhập tối thiểu 4 ký tự!");
                RuleFor(r => r.BrandId).NotEqual("0").WithMessage("Chưa chọn hãng");
            }
            public bool CheckSame(Request request, Product product) {
                var old = new Request(product.Name, product.Price, product.Quantity, product.IsDiscount, product.PriceAfterDiscount, product.Status, product.Brand.Id);
                return request == old;
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Products/{id}/Info", Handler).WithTags("Admin_Products");
        }

        private static async Task<IResult> Handler([FromRoute] string id, Request request, IWebHostEnvironment env, ApplicationDBContext context) {
            var Validator = new Validator();
            var ValidatedResult = Validator.Validate(request);
            if (!ValidatedResult.IsValid) {
                return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
            }

            Product? product = await context.Products.Include(p => p.Brand).FirstOrDefaultAsync(p => p.Id == id);
            if (product == null) {
                return Results.NotFound(new Response(false, "Không tìm thấy sản phẩm!", ValidatedResult));
            }
            Brand? brand = await context.Brands.FirstOrDefaultAsync(b => b.Id == request.BrandId);
            if (brand == null) {
                return Results.NotFound(new Response(false, "Không tìm thấy hãng!", ValidatedResult));
            }

            if (!Validator.CheckSame(request, product)) {
                product.Name = request.Name;
                product.Price = request.Price;
                product.Quantity = request.Quantity;
                product.IsDiscount = request.IsDiscount;
                product.PriceAfterDiscount = request.PriceAfterDiscount;
                product.Status = request.Status;
                product.Brand = brand;
                product.UpdateAt = DateTime.Now;
                if (await context.SaveChangesAsync() < 1) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                }
            }
            return Results.Ok(new Response(true, "", ValidatedResult));
        }
    }
}
