using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Product_Related {
    public class Brand:EntityGeneric {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Tag { get; set; }
        public Brand():base() {
            Id = "BR-" + Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits, 6);
        }
        public virtual ICollection<Product> Products { get; set; }
    }
}
