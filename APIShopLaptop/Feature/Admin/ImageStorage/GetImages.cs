using APIShopLaptop.Endpoint;

namespace APIShopLaptop.Feature.Admin.ImageStorage {
    public class GetImages : IEndpoint {
        public record Response(bool Success, List<string> data, string ErrorMessage);
        public static void MapEndpoint(IEndpointRouteBuilder app) {
            app.MapGet("/api/Admin/ImageStorage", Handler).WithTags("Img").DisableAntiforgery();
        }
        private static async Task<IResult> Handler(IWebHostEnvironment env) {
            try {
                string StoragePath = Path.Combine(env.ContentRootPath, "Image/Storage");
                DirectoryInfo d = new DirectoryInfo(StoragePath);
                FileInfo[] Files = d.GetFiles("*.jpg"); //Getting Text files
                var data = Files.Select(f => Path.GetFileNameWithoutExtension(f.Name)).OrderDescending().ToList();
                return Results.Ok(new Response(true, data, ""));
            }
            catch (Exception e) {
                return Results.BadRequest(new Response(false, [], "Lỗi Server"));
            }
        }
    }
}
