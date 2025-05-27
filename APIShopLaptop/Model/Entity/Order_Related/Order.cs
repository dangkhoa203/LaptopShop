using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.Review_Related;
using APIShopLaptop.Model.Enum;
using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Order_Related {
    public class Order {
        public string Id { get; set; }
        public float Value { get; set; }
        public DateTime DateOfOrder { get; set; }
        public PAYMENTMETHOD PaymentMethod { get; set; }
        public string Receiver {  get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string NoteFromOrder { get; set; }
        public ORDERSTATUS Status { get; set; }
        public Order():base() {
            Id = "DH-" + Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits, 6);
            Status=ORDERSTATUS.PENDING;
        }
        public virtual DiscountCode? DiscountCode { get; set; }
        public AppUser User { get; set; }
        public virtual ICollection<OrderDetail> Details { get; set; }   
        public virtual ICollection<Review> Reviews { get; set; }

    }
}
