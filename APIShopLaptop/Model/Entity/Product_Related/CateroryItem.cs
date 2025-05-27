namespace APIShopLaptop.Model.Entity.Product_Related {
    public class CateroryItem {
        public string ProductId { get; set; }
        public string CateroryId { get; set; }
        public virtual Product? ProductNavigation { get; set; }
        public virtual SubCaterory? CateroryNavigation { get; set; }
    }
}
