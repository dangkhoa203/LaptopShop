namespace APIShopLaptop.Model.Entity.Product_Related {
    public class SubCaterory {
        public string Id { get; set; }
        public string Name { get; set; }

        public virtual MainCaterory MainCaterory { get; set; }
        public virtual ICollection<CateroryItem> CateroryItems { get; set; }
    }
}
