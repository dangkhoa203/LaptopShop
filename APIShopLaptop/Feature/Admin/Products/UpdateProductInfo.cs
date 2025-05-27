using APIShopLaptop.Data;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Enum;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace APIShopLaptop.Feature.Admin.Products {
    public class UpdateProductInfo {
        public record Request(string Name, float Price,int Quantity, string Description,PRODUCTSTATUS Status);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Price).GreaterThan(0).WithMessage("Giá không phù hợp");
                RuleFor(r => r.Quantity).GreaterThan(-1).WithMessage("Số lượng không phù hợp");
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Name).MinimumLength(4).WithMessage("Tên phải nhập tối thiểu 4 ký tự!");
                RuleFor(r => r.Status).IsInEnum().WithMessage("Trạng thái không hợp lệ!");
            }
            public bool CheckSame(Request request, Product product) {
                var old = new Request(product.Name, product.Price,product.Quantity, product.Description,product.Status);
                return request==old;
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Products/{id}", Handler).WithTags("Products");
        }

        private static async Task<IResult> Handler([FromRoute] string id,Request request, IWebHostEnvironment env, ApplicationDBContext context) {
            var Validator = new Validator();
            var ValidatedResult = Validator.Validate(request);
            if (!ValidatedResult.IsValid) {
                return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
            }

            Product? product = await context.Products.FirstOrDefaultAsync(p=>p.Id==id);
            if (product == null) {
                return Results.NotFound(new Response(false, "Không tìm thấy sản phẩm!", ValidatedResult));
            }

            if (!Validator.CheckSame(request, product)) {
                product.Name = request.Name;
                product.Price = request.Price;
                product.Quantity = request.Quantity;
                product.Description = request.Description;
                product.Status = request.Status;
                product.UpdateAt = DateTime.Now;
                if (await context.SaveChangesAsync() < 1) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                }
            }
            return Results.Ok(new Response(true, "", ValidatedResult));
        }
    }
}
