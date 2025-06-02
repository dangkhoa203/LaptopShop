using APIShopLaptop.Feature.Admin.Brands;
using APIShopLaptop.Feature.Admin.ImageStorage;
using APIShopLaptop.Feature.Admin.Orders;
using APIShopLaptop.Feature.Admin.Products;
using APIShopLaptop.Feature.User.Category;
using APIShopLaptop.Feature.User.Caterory;
using APIShopLaptop.Feature.User.UserAccount;

namespace APIShopLaptop.Extension {
    public static class UserEndpoint {
        private static void AddCateroryFeature(this WebApplication app) {
            GetProductsFromSubCaterory.MapEndpoint(app);
            GetProductFromMainCategory.MapEndpoint(app);
        }
        private static void AddUserAccountFeature(this WebApplication app) {
            Register.MapEndpoint(app);
            Login.MapEndpoint(app);
        }
        public static void AddAllEndPoint(this WebApplication app) {
            AddCateroryFeature(app);
            AddUserAccountFeature(app);
        }
    }
}
