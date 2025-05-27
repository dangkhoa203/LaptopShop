using APIShopLaptop.Model.Entity.Account;

namespace APIShopLaptop.Model.Entity.PC_Build_Related {
    public class Build {
        public string Id { get; set; }
        public float Value { get; set; }
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public ICollection<BuildItem> BuildItems { get; set; }
    }
}
