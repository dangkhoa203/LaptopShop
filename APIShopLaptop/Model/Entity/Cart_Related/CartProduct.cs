using APIShopLaptop.Model.Entity.Product_Related;

namespace APIShopLaptop.Model.Entity.Cart_Related {
    public class CartProduct {
        public string ProductId { get; set; }
        public string CartId { get; set; }
        public Product ProductNavigation { get; set; }
        public Cart CartNavigation { get; set; }
        public int Quantity { get; set; }
    }
}
