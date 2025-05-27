namespace APIShopLaptop.Model.Entity {
    public class EntityGeneric {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
        public EntityGeneric() {
            CreatedAt = DateTime.Now;
            UpdateAt = DateTime.Now;
        }
    }
}
