using APIShopLaptop.Model.Entity.Account;
using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Cart_Related {
    public class Cart {
        public string Id { get; set; }
        public float TotalValue { get; set; }
        public Cart() {
            Id = $"CRT-{Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits, 6)}";
            TotalValue = 0 ;
        }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public virtual ICollection<CartProduct> CartProducts { get; set; }
    }
}
