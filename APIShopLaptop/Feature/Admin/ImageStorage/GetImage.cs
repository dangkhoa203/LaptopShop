using APIShopLaptop.Endpoint;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NanoidDotNet;
using SixLabors.ImageSharp;

namespace APIShopLaptop.Feature.Admin.ImageStorage {
    public class GetImage : IEndpoint {
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/ImageStorage/{name}", Handler).WithTags("Img").DisableAntiforgery();
        }
        private static async Task<IResult> Handler(string name, IWebHostEnvironment env) {
            string StoragePath = Path.Combine(env.ContentRootPath, "Image/Storage");
            var image = File.OpenRead($"{StoragePath}/{name}.jpg");
            return Results.File(image, "image/jpeg");
        }
    }
}
