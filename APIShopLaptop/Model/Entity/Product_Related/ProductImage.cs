using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Product_Related {
    public class ProductImage {
        public string Id { get; set; }
        public bool IsThumbnail { get; set; }
        public ProductImage() {
            Id = "IMG-" + Nanoid.Generate(Nanoid.Alphabets.LettersAndDigits, 3);
        }
        public virtual Product Product { get; set; }
    }
}
