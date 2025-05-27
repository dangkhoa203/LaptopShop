using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Spec_And_Filter {
    public class Specification:EntityGeneric {
        public string Id { get; set; }
        public string Name { get; set; }
        public Specification(string name):base() {
            Id = $"SC-{Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits,6)}";
            Name = name ;
        }
        public ICollection<SpecificationData> SpecificationDatas { get; set; }
        public ICollection<CompatibilityData> CompatibilityDatas { get; set; }
    }
}
