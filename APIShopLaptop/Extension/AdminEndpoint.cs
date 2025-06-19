using APIShopLaptop.Feature.Admin.Account;
using APIShopLaptop.Feature.Admin.Brands;
using APIShopLaptop.Feature.Admin.Category;
using APIShopLaptop.Feature.Admin.DiscountCodes;
using APIShopLaptop.Feature.Admin.ImageStorage;
using APIShopLaptop.Feature.Admin.Orders;
using APIShopLaptop.Feature.Admin.Orders.Momo;
using APIShopLaptop.Feature.Admin.Products;
using APIShopLaptop.Feature.Admin.Products.Category;
using APIShopLaptop.Feature.Admin.Products.Compatibility;
using APIShopLaptop.Feature.Admin.Products.Description;
using APIShopLaptop.Feature.Admin.Products.Images;
using APIShopLaptop.Feature.Admin.Products.Info;
using APIShopLaptop.Feature.Admin.Products.Specifications;
using APIShopLaptop.Feature.Admin.Specifications;

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
            GetDiscountCodes.MapEndpoint(app);
            UpdateDiscountCode.MapEndpoint(app);
        }
        private static void AddProductFeature(this WebApplication app) {
            AddProduct.MapEndpoint(app);
            GetProducts.MapEndpoint(app);
            UpdateProductInfo.MapEndpoint(app);
            UpdateProductThumbnail.MapEndpoint(app);
            UpdateProductCategory.MapEndpoint(app);
            UpdateProductDescription.MapEndpoint(app);
            GetProductThumbnail.MapEndpoint(app);
            GetProductInfo.MapEndpoint(app);
            GetProductImage.MapEndpoint(app);
            GetProductImages.MapEndpoint(app);
            GetProductCategories.MapEndpoint(app);
            GetProductDescription.MapEndpoint(app);
            DeleteProductImage.MapEndpoint(app);
            AddImageToProduct.MapEndpoint(app);

            AddProductSpecification.MapEndpoint(app);
            GetProductSpecification.MapEndpoint(app);
            DeleteProductSpecification.MapEndpoint(app);

            AddProductCompatibility.MapEndpoint(app);
            GetProductCompatibility.MapEndpoint(app);
            DeleteProductCompatibility.MapEndpoint(app);
        }
        private static void AddOrderFeature(this WebApplication app) {
            GetOrder.MapEndpoint(app);
            GetOrders.MapEndpoint(app);
            UpdateOrderStatus.MapEndpoint(app);
            ConfirmMomoOrder.MapEndpoint(app);
            GetTransactions.MapEndpoint(app);
        }
        private static void AddCategoryFeature(this WebApplication app) {
            GetCategory.MapEndpoint(app);
        }
        private static void AddSpecificationFeature(this WebApplication app) {
            AddSpecification.MapEndpoint(app);
            GetSpecifications.MapEndpoint(app);
            UpdateSpecification.MapEndpoint(app);
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
            AddProductFeature(app);
            AddOrderFeature(app);
            AddCategoryFeature(app);
            AddAccountFeature(app);
            AddSpecificationFeature(app);
        }
    }
}
