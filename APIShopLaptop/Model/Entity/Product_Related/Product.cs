using APIShopLaptop.Model.Entity.Cart_Related;
using APIShopLaptop.Model.Entity.PC_Build_Related;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Entity.Spec_And_Filter;
using APIShopLaptop.Model.Enum;
using NanoidDotNet;
using APIShopLaptop.Model.Entity.Review_Related;

namespace APIShopLaptop.Model.Entity.Product_Related {
    public class Product : EntityGeneric {
        public string Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public bool IsDiscount { get; set; }
        public float PriceAfterDiscount { get; set; }
        public PRODUCTSTATUS Status { get; set; }
        public Product() : base() {
            Id = "SP-" + Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits,6);
            IsDiscount= false;
            PriceAfterDiscount= 0;
            Status=PRODUCTSTATUS.ACTIVE;
        }
        public virtual Brand? Brand { get; set; }
        public virtual ICollection<ProductImage>? Images { get; set; }
        public virtual ICollection<CateroryItem> CateroryItems { get; set; }
        public virtual ICollection<SpecificationData> Specifications { get; set; }
        public virtual ICollection<CompatibilityData> Compatibilitys { get; set; }
        public virtual ICollection<CartProduct> CartProducts { get; set; }
        public virtual ICollection<BuildItem> BuildItems { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
