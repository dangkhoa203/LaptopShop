using APIShopLaptop.Feature.Admin.Brands;
using APIShopLaptop.Feature.Admin.ImageStorage;
using APIShopLaptop.Feature.Admin.Orders;
using APIShopLaptop.Feature.Admin.Products;
using APIShopLaptop.Feature.User.Builds;
using APIShopLaptop.Feature.User.Cart;
using APIShopLaptop.Feature.User.Category;
using APIShopLaptop.Feature.User.Caterory;
using APIShopLaptop.Feature.User.Orders;
using APIShopLaptop.Feature.User.Orders.Build;
using APIShopLaptop.Feature.User.Orders.MoMo;
using APIShopLaptop.Feature.User.Products;
using APIShopLaptop.Feature.User.Reviews;
using APIShopLaptop.Feature.User.UserAccount;
using APIShopLaptop.Feature.User.UserAccount.ChangeEmail;
using APIShopLaptop.Feature.User.UserAccount.ChangePassword;
using APIShopLaptop.Feature.User.UserAccount.ResetPassword;
using APIShopLaptop.Feature.User.UserAppUser.ChangeEmail;

namespace APIShopLaptop.Extension {
    public static class UserEndpoint {
        private static void AddCategoryFeature(this WebApplication app) {
            GetProductsFromSubCaterory.MapEndpoint(app);
            GetProductFromMainCategory.MapEndpoint(app);
            GetProductForMainPage_MainCategory.MapEndpoint(app);
            GetProductForMainPage_SubCategory.MapEndpoint(app);
        }
        private static void AddProductFeature(this WebApplication app) {
            GetProductThumbnail.MapEndpoint(app);
            SearchProduct.MapEndpoint(app);
            GetProductImage.MapEndpoint(app);
            GetProduct.MapEndpoint(app);
        }
        private static void AddCartFeature(this WebApplication app) {
            AddProductToCart.MapEndpoint(app);
            DeleteProductFromCart.MapEndpoint(app);
            UpdateProductQuantityInCart.MapEndpoint(app);
            GetCurrentCart.MapEndpoint(app);
        }
        private static void AddReviewFeature(this WebApplication app) {
            AddReview.MapEndpoint(app);
            UpdateReview.MapEndpoint(app);
            GetReviews.MapEndpoint(app);
            GetReviewAble.MapEndpoint(app);
        }
        private static void AddBuildFeature(this WebApplication app) {
            AddToBuild.MapEndpoint(app);
            DeleteBuildItem.MapEndpoint(app);
            UpdateBuildItemQuantity.MapEndpoint(app);
            GetBuild.MapEndpoint(app);
            GetProductForBuild.MapEndpoint(app);
            GetProductReviews.MapEndpoint(app);
        }
        private static void AddOrderFeature(this WebApplication app) {
            AddOrder.MapEndpoint(app);
            CancelOrder.MapEndpoint(app);
            Feature.User.Orders.GetOrders.MapEndpoint(app);
            Feature.User.Orders.GetOrder.MapEndpoint(app);
            CreateNewMomoTransaction.MapEndpoint(app);
            ConfirmMomoTransaction.MapEndpoint(app);
            AddOrderFromBuild.MapEndpoint(app);

        }
        private static void AddUserAccountFeature(this WebApplication app) {
            Login.MapEndpoint(app);
            Register.MapEndpoint(app);
            GetAccountInfo.MapEndpoint(app);
            LogOut.MapEndpoint(app);
            ConfirmAccount.MapEndpoint(app);
            SendResetPasswordRequest.MapEndpoint(app);
            CheckAccountForReset.MapEndpoint(app);
            ResetPassword.MapEndpoint(app);
            SendChangePasswordRequest.MapEndpoint(app);
            ChangePassword.MapEndpoint(app);
            SendChangeEmailRequest.MapEndpoint(app);
            ChangeEmail.MapEndpoint(app);
        }

        public static void AddAllEndPoint(this WebApplication app) {
            AddCategoryFeature(app);
            AddUserAccountFeature(app);
            AddProductFeature(app);
            AddCartFeature(app);
            AddBuildFeature(app);
            AddOrderFeature(app);
            AddReviewFeature(app);
        }
    }
}
