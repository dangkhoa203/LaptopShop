using APIShopLaptop.Data;
using APIShopLaptop.Endpoint;
using APIShopLaptop.Middleware.Email;
using APIShopLaptop.Model.Entity.Account;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NanoidDotNet;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.IO;
using System.Security.Claims;

namespace APIShopLaptop.Feature.Admin.ImageStorage {
    public class AddImage : IEndpoint {
        public record Request(IFormFileCollection Images);
        public record Response(bool Success, int errorCount, string ErrorMessage);
        public sealed class Validator : AbstractValidator<Request> {
            public Validator() {

            }
        }
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapPost("/api/Admin/ImageStorage", Handler).WithTags("Img").DisableAntiforgery();
        }
        private static async Task<IResult> Handler([FromForm] Request request, IWebHostEnvironment env) {
            string StoragePath = Path.Combine(env.ContentRootPath, "Image/Storage");
            int error = 0;
            foreach (var file in request.Images) {
                try {
                    var stream = file.OpenReadStream();
                    var id = DateTime.Now.ToString("ddMMyyyy") + "-" + Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits, 6);
                    using (Image image = Image.Load(stream)) {
                        image.Mutate(x => { x.Resize(1280, 720); });
                        image.SaveAsJpeg(StoragePath + $"/{id}.jpg");
                    }
                }
                catch (Exception exc) {
                    error++;
                    continue;
                }
            }
            if (error == request.Images.Count) {
                return Results.BadRequest(new Response(false, error, "Lỗi upload!"));
            }
            return Results.Ok(new Response(true, error, ""));
        }
    }
}
