using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Order_Related {
    public class MomoTransaction {
        public string Id { get; set; }
        public string OrderId { get; set; }
        public string? RequestId { get; set; }
        public string? TransactionId { get; set; }
        public bool IsPaid { get; set; }
        public virtual Order Order { get; set; }
        public MomoTransaction() {
            Id = "TT-"+Nanoid.Generate(Nanoid.Alphabets.Letters, 6);
        }
        public DateTime TransactionDate { get; set; }
    }
}
