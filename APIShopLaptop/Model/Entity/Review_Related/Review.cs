using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Entity.Product_Related;
using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Review_Related {
    public class Review:EntityGeneric {
        public string Id { get; set; }
        public string Content { get; set; }
        public int Score { get; set; }
        public DateTime DateOfReview { get; set; }
        public Review():base() {
            Id = "RV-" + Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits, 6);
        }
        public AppUser User { get; set; }
        public Product Product { get; set; }
        public Order Order { get; set; }
        public ICollection<ReviewImage> Images { get; set; } 
    }
}
