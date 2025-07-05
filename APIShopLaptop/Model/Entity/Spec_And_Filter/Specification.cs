using NanoidDotNet;

namespace APIShopLaptop.Model.Entity.Spec_And_Filter {
    public class Specification:EntityGeneric {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool SearchAble { get; set; }
        public Specification(string name,bool searchAble) : base() {
            Id = $"SC-{Nanoid.Generate(Nanoid.Alphabets.UppercaseLettersAndDigits, 6)}";
            Name = name;
            SearchAble = searchAble;
        }
        public ICollection<SpecificationData> SpecificationDatas { get; set; }
        public ICollection<CompatibilityData> CompatibilityDatas { get; set; }
    }
}
