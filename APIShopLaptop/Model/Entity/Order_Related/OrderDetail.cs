using APIShopLaptop.Model.Entity.PC_Build_Related;
using APIShopLaptop.Model.Entity.Product_Related;

namespace APIShopLaptop.Model.Entity.Order_Related {
    public class OrderDetail {
        public string ProductId { get; set; }
        public string OrderId { get; set; }
        public Product ProductNavigation { get; set; }
        public Order OrderNavigation { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
    }
}
