using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Model.Entity.Product_Related;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using NanoidDotNet;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.EntityFrameworkCore;
using APIShopLaptop.Model.Enum;

namespace APIShopLaptop.Feature.Admin.Products {
    public class AddProduct : IEndpoint {
        public record Request(string Name, float Price, int Quantity,string Description,bool IsDiscount,float PriceAfterDiscount,PRODUCTSTATUS Status,string BrandId,List<string> Categories, IFormFileCollection ProductPicture);
        public record Response(bool Success, string ErrorMessage, ValidationResult? ValidationError);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {
                RuleFor(r => r.Price).GreaterThan(0).WithMessage("Giá không phù hợp");
                RuleFor(r => r.PriceAfterDiscount).LessThan(r=>r.Price).WithMessage("Giá không phù hợp");
                RuleFor(r => r.PriceAfterDiscount).GreaterThanOrEqualTo(0).WithMessage("Giá không phù hợp");
                RuleFor(r => r.Quantity).GreaterThan(-1).WithMessage("Số lượng không phù hợp");
                RuleFor(r => r.Name).NotEmpty().WithMessage("Chưa nhập tên!");
                RuleFor(r => r.Name).MinimumLength(4).WithMessage("Tên phải nhập tối thiểu 4 ký tự!");
                RuleFor(r => r.BrandId).NotEqual("0").WithMessage("Chưa chọn hãng");
            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/Products", Handler).WithTags("Admin_Products").DisableAntiforgery();
        }
        [Authorize(Roles = "Admin")]
        private static async Task<IResult> Handler([FromForm] Request request, IWebHostEnvironment env, ApplicationDBContext context) {
            var Validator = new Validator();
            var ValidatedResult = Validator.Validate(request);
            if (!ValidatedResult.IsValid) {
                return Results.BadRequest(new Response(false, "Lỗi xảy ra", ValidatedResult));
            }

            Product Product = new Product() {
                Name = request.Name,
                Price = request.Price,
                Quantity = request.Quantity,
                Description = request.Description,
                IsDiscount=request.IsDiscount,
                PriceAfterDiscount=request.PriceAfterDiscount,
                Status=request.Status,
                Brand= await context.Brands.FirstOrDefaultAsync(b=>b.Id==request.BrandId)
            };
            List<ProductImage> ProductImages = [];
            string StoragePath = Path.Combine(env.ContentRootPath, "Image", "Product");
            string ProductImagePath = Path.Combine(StoragePath, Product.Id);
            try {
                
                Directory.CreateDirectory(ProductImagePath);

                //Create Thumbnail
                try {
                    var ThumbnailImage = new ProductImage() {IsThumbnail=true };
                    var ThumbnailStream = request.ProductPicture[0].OpenReadStream();
                    using (Image image = Image.Load(ThumbnailStream)) {
                        image.Mutate(x => { x.Resize(600, 600); });
                        image.Mutate(x => x.BackgroundColor(Color.White));
                        image.SaveAsJpeg(Path.Combine(ProductImagePath, $"{ThumbnailImage.Id}.jpg"));
                    }
                    ThumbnailImage.Product = Product;
                    ProductImages.Add(ThumbnailImage);
                }
                catch {
                    Directory.Delete(ProductImagePath);
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                }

                //Create Product Picture

                for (int i = 1; i < request.ProductPicture.Count; i++) {
                        var file = request.ProductPicture[i];
                        var stream = file.OpenReadStream();
                        var ProductImage = new ProductImage();
                        using (Image image = Image.Load(stream)) {
                            image.Mutate(x => { x.Resize(1000, 1000); });
                            image.SaveAsJpeg(Path.Combine(ProductImagePath, $"{ProductImage.Id}.jpg"));
                        }
                        ProductImage.Product=Product;
                        ProductImages.Add(ProductImage);
                }
                
                

                //Save Product to Database
                await context.Products.AddAsync(Product);
                await context.ProductImages.AddRangeAsync(ProductImages);
                if (request.Categories[0] != "empty") {
                    foreach (var categoryId in request.Categories) {
                        var Category = await context.SubCaterories.FirstOrDefaultAsync(c => c.Id == categoryId);
                        var item = new CateroryItem() {
                            CateroryNavigation = Category,
                            ProductNavigation = Product,
                        };
                        await context.CateroryItems.AddAsync(item);
                    }
                }
                if (await context.SaveChangesAsync() <= 0) {
                    string[] FilePath = Directory.GetFiles(ProductImagePath);
                    foreach (var file in FilePath) {
                        File.Delete(file);
                    }
                    Directory.Delete(ProductImagePath);
                    return Results.BadRequest(new Response(false, "Lỗi xảy ra khi đang thực hiện!", ValidatedResult));
                }
                return Results.Ok(new Response(true, "", ValidatedResult));
            }
            catch (Exception) {
                if (Directory.Exists(ProductImagePath)) {
                    string[] FilePath = Directory.GetFiles(ProductImagePath);
                    foreach (var file in FilePath) {
                        File.Delete(file);
                    }
                    Directory.Delete(ProductImagePath);
                }
                return Results.BadRequest(new Response(false, "Lỗi server đã xảy ra!", null));
            }
        }
    }
}
