using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.Brands {
    public class AddBrand : IEndpoint {
        public record Request(string Name, string Tag);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Tag).NotEmpty().WithMessage("Chưa nhập tag!");
                RuleFor(r => r.Tag).Matches("^[A-Z]*$").WithMessage("Tag không được ghi dấu!");
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Name).MinimumLength(4).WithMessage("Tên phải nhập tối thiểu 4 ký tự!");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Brands", Handler).WithTags("Brands");
        }
        private static async Task<IResult> Handler(Request request, ApplicationDBContext context) {
            try {
                var Validator = new Validator();
                var ValidatedResult = Validator.Validate(request);
                if (!ValidatedResult.IsValid) {
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
                }

                Brand brand = new() {
                    Name = request.Name,
                    Tag = request.Tag,
                };

                await context.Brands.AddAsync(brand);
                if (await context.SaveChangesAsync() > 0) {
                    return Results.Ok(new Response(true, "", ValidatedResult));
                }
                return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
            }
            catch (Exception) {
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!", null));
            }

        }
    }
}
