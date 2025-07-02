using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace APIShopLaptop.Feature.Admin.Brands {
    public class UpdateBrand:IEndpoint {
        public record Request(string Name, string Tag);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Tag).NotEmpty().WithMessage("Chưa nhập Id!");
                RuleFor(r => r.Tag).MinimumLength(4).WithMessage("Id phải nhập tối thiểu 4 ký tự!");
                RuleFor(r => r.Tag).Matches("^[A-Z]*$").WithMessage("Tag không được ghi dấu!");
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Name).MinimumLength(4).WithMessage("Tên phải nhập tối thiểu 4 ký tự!");
            }
            public bool CheckSame(Request request, Brand brand) {
                return request.Name == brand.Name && request.Tag == brand.Tag;
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPut("/api/Admin/Brands/{id}", Handler).WithTags("Admin_Brands");
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler(string id,Request request, ApplicationDBContext context) {
            try {
                var Validator = new Validator();
                var ValidatedResult = Validator.Validate(request);
                if (!ValidatedResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
                }

                Brand? Brand = await context.Brands.FirstOrDefaultAsync(b=>b.Id==id);
                if (Brand == null) {
                    return Results.NotFound(new Response(false, "Không tìm thấy hãng!", ValidatedResult));
                }

                if (!Validator.CheckSame(request, Brand)) {
                    Brand.Name = request.Name;
                    Brand.Tag = request.Tag;
                    Brand.UpdateAt = DateTime.Now;
                    if (await context.SaveChangesAsync() < 1) {
                        return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                    }
                }
                return Results.Ok(new Response(true, "", ValidatedResult));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!", null));
            }

        }
    }
}
