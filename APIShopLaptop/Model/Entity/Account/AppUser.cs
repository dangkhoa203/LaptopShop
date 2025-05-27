using APIShopLaptop.Model.Entity.Cart_Related;
using APIShopLaptop.Model.Entity.PC_Build_Related;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Entity.Review_Related;
using Microsoft.AspNetCore.Identity;

namespace APIShopLaptop.Model.Entity.Account {
    public class AppUser:IdentityUser {
        public DateTime DateCreated { get; set; }
        public AppUser() {
            DateCreated = DateTime.Now;
        }
        public Cart Cart { get; set; }
        public ICollection<Build> Builds { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
