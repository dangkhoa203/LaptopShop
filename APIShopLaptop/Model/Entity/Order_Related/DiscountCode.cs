using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Order_Related {
    public class DiscountCode:EntityGeneric {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public float Percent {  get; set; }
        public bool IsActive { get; set; }
        public DateTime EndDate { get; set; }
        public DiscountCode():base() {
            Id="MGG-"+Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits,6);
        }
        public virtual ICollection<Order> Orders { get; set; }

    }
}
