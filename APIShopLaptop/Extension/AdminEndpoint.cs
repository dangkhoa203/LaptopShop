using APIShopLaptop.Feature.Admin.Account;
using APIShopLaptop.Feature.Admin.Brands;
using APIShopLaptop.Feature.Admin.Category;
using APIShopLaptop.Feature.Admin.DiscountCodes;
using APIShopLaptop.Feature.Admin.ImageStorage;
using APIShopLaptop.Feature.Admin.Orders;
using APIShopLaptop.Feature.Admin.Products;

namespace APIShopLaptop.Extension {
    public static class AdminEndpoint {
        
        private static void AddImageStorageService(this WebApplication app) {
            AddImage.MapEndpoint(app);
            GetImage.MapEndpoint(app);
            GetImages.MapEndpoint(app);
            DeleteImage.MapEndpoint(app);
        }
        private static void AddBrandService(this WebApplication app) {
            AddBrand.MapEndpoint(app);
            UpdateBrand.MapEndpoint(app);
            GetBrand.MapEndpoint(app);
            GetBrands.MapEndpoint(app);
            DeleteBrand.MapEndpoint(app);
        }
        private static void AddDiscountCodeFeature(this WebApplication app) {
            AddDiscountCode.MapEndpoint(app);
        }
        private static void AddProductService(this WebApplication app) {
            AddProduct.MapEndpoint(app);
            UpdateProductInfo.MapEndpoint(app);
            GetProducts.MapEndpoint(app);
            AddProductToCategory.MapEndpoint(app);
        }
        private static void AddOrderFeature(this WebApplication app) {
            GetOrder.MapEndpoint(app);
            GetOrders.MapEndpoint(app);
            UpdateOrderStatus.MapEndpoint(app);
        }
        private static void AddCateroryFeature(this WebApplication app) {
            GetCaterory.MapEndpoint(app);
        }
        private static void AddAccountFeature(this WebApplication app) {
            GetAdminInfo.MapEndpoint(app);
            LoginAdmin.MapEndpoint(app);
            LogOutAdmin.MapEndpoint(app);
            GetAccounts.MapEndpoint(app);
            UpdateUserConfirmEmail.MapEndpoint(app);
            UpdateUserPassword.MapEndpoint(app);
            UpdateUserEmail.MapEndpoint(app);
        }
        public static void AddAllEndPoint(this WebApplication app) {
            AddImageStorageService(app);
            AddBrandService(app);
            AddDiscountCodeFeature(app);
            AddProductService(app);
            AddOrderFeature(app);
            AddCateroryFeature(app);
            AddAccountFeature(app);
        }
    }
}
