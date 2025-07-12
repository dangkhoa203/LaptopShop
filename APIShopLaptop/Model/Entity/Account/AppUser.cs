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
        public virtual Cart Cart { get; set; }
        public virtual Build Build { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
