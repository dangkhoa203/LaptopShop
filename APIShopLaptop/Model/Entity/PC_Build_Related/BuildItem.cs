using APIShopLaptop.Model.Entity.Cart_Related;
using APIShopLaptop.Model.Entity.Product_Related;

namespace APIShopLaptop.Model.Entity.PC_Build_Related {
    public class BuildItem {
        public string ProductId { get; set; }
        public string BuildId { get; set; }
        public Product ProductNavigation { get; set; }
        public Build BuildNavigation { get; set; }
        public int Quantity { get; set; }
        public string ComponentName { get; set; }
    }
}
