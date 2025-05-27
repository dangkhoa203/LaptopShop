using APIShopLaptop.Model.Entity.Product_Related;

namespace APIShopLaptop.Model.Entity.Spec_And_Filter {
    public class CompatibilityData {
        public string ProductId { get; set; }
        public string SpecificationId { get; set; }
        public Product ProductNavigation { get; set; }
        public Specification SpecificationNavigation { get; set; }
        public string Value { get; set; }
    }
}
