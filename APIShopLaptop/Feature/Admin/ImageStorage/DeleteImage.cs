using APIShopLaptop.Endpoint;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NanoidDotNet;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace APIShopLaptop.Feature.Admin.ImageStorage {
    public class DeleteImage : IEndpoint {
        public record Request(string name);
        public record Response(bool Success, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapDelete("/api/Admin/ImageStorage", Handler).WithTags("Img");
        }
        private static async Task<IResult> Handler([FromBody] Request request, IWebHostEnvironment env) {
            string StoragePath = Path.Combine(env.ContentRootPath, "Image/Storage");
            try {
                if (File.Exists($"{StoragePath}/{request.name}.jpg")) {
                    File.Delete($"{StoragePath}/{request.name}.jpg");
                    return Results.Ok(new Response(true, ""));
                }
            }
            catch (Exception ex) {
                return Results.BadRequest(new Response(false, "Lỗi Server!"));
            }
            return Results.BadRequest(new Response(false, "Xóa không thành công"));
        }
    }
}
