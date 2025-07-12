using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.Cart_Related;
using APIShopLaptop.Model.Entity.PC_Build_Related;
using APIShopLaptop.Model.Entity.Product_Related;
using APIShopLaptop.Model.Entity.Order_Related;
using APIShopLaptop.Model.Entity.Spec_And_Filter;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using APIShopLaptop.Model.Entity.Review_Related;

namespace APIShopLaptop.Data {
    public class ApplicationDBContext:IdentityDbContext<AppUser> {
        public ApplicationDBContext(DbContextOptions dbContextOptions):base(dbContextOptions) {
            
        }
        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            builder.Entity<CateroryItem>(entity => {
                entity.HasKey(e => new { e.ProductId, e.CateroryId });
                entity.HasOne(ci => ci.ProductNavigation)
                   .WithMany(p => p.CateroryItems)
                   .HasForeignKey(ci => ci.ProductId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_cateroryItem_product");

                entity.HasOne(ci => ci.CateroryNavigation)
                    .WithMany(c => c.CateroryItems)
                    .HasForeignKey(ci => ci.CateroryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_cateroryitem_caterory");
            });

            builder.Entity<AppUser>()
                .HasOne(u => u.Cart)
                .WithOne(c => c.User)
                .HasForeignKey<Cart>(c => c.UserId);

            builder.Entity<AppUser>()
                .HasOne(u => u.Build)
                .WithOne(b => b.User)
                .HasForeignKey<Build>(b => b.UserId);

            builder.Entity<Order>()
                .HasOne(o => o.MomoTransaction)
                .WithOne(t => t.Order)
                .HasForeignKey<MomoTransaction>(t => t.OrderId);

            builder.Entity<CartProduct>(entity => {
                entity.HasKey(e => new { e.ProductId, e.CartId });
                entity.HasOne(cp => cp.ProductNavigation)
                   .WithMany(p => p.CartProducts)
                   .HasForeignKey(cp => cp.ProductId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_cartitem_product");

                entity.HasOne(cp => cp.CartNavigation)
                    .WithMany(c => c.CartProducts)
                    .HasForeignKey(cp => cp.CartId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_cartitem_cart");
            });



            builder.Entity<BuildItem>(entity => {
                entity.HasKey(e => new { e.ProductId, e.BuildId });
                entity.HasOne(b => b.ProductNavigation)
                   .WithMany(p => p.BuildItems)
                   .HasForeignKey(b => b.ProductId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_builditem_product");

                entity.HasOne(bi => bi.BuildNavigation)
                    .WithMany(b => b.BuildItems)
                    .HasForeignKey(bi => bi.BuildId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_builditem_build");
            });

            builder.Entity<SpecificationData>(entity => {
                entity.HasKey(e => new { e.ProductId, e.SpecificationId });
                entity.HasOne(sd => sd.ProductNavigation)
                   .WithMany(p => p.Specifications)
                   .HasForeignKey(sd => sd.ProductId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_specdata_product");

                entity.HasOne(sd => sd.SpecificationNavigation)
                    .WithMany(s => s.SpecificationDatas)
                    .HasForeignKey(sd => sd.SpecificationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_specdata_spec");
            });

            builder.Entity<CompatibilityData>(entity => {
                entity.HasKey(e => new { e.ProductId, e.SpecificationId });
                entity.HasOne(c => c.ProductNavigation)
                   .WithMany(p => p.Compatibilitys)
                   .HasForeignKey(c => c.ProductId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_compdata_product");

                entity.HasOne(c => c.SpecificationNavigation)
                    .WithMany(s => s.CompatibilityDatas)
                    .HasForeignKey(c => c.SpecificationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_compdata_spec");
            });

            builder.Entity<OrderDetail>(entity => {
                entity.HasKey(e => new { e.ProductId, e.OrderId });
                entity.HasOne(od => od.ProductNavigation)
                   .WithMany(p => p.OrderDetails)
                   .HasForeignKey(od => od.ProductId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_orderdetail_product");

                entity.HasOne(od => od.OrderNavigation)
                    .WithMany(d => d.Details)
                    .HasForeignKey(od => od.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_orderdetail_spec");
            });
        }
        public virtual DbSet<Brand> Brands {  get; set; }
        public virtual DbSet<MainCaterory> MainCaterories { get; set; }
        public virtual DbSet<SubCaterory> SubCaterories { get; set; }
        public virtual DbSet<CateroryItem> CateroryItems { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<Specification> Specifications { get; set; }
        public virtual DbSet<SpecificationData> SpecificationsData { get; set; }
        public virtual DbSet<CompatibilityData> CompatibilityData { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<CartProduct> CartProducts { get; set; }
        public virtual DbSet<Build> Builds { get; set; }
        public virtual DbSet<BuildItem> BuildItems { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<MomoTransaction> MomoTransactions { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<DiscountCode> DiscountCodes { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<ReviewImage> ReviewsImages { get; set; }

    }
}
