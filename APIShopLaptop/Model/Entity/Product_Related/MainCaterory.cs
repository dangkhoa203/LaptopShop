namespace APIShopLaptop.Model.Entity.Product_Related {
    public class MainCaterory {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<SubCaterory> SubCaterories { get;set; }
    }
}
