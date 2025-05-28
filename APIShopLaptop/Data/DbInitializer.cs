using Microsoft.AspNetCore.Identity;
using APIShopLaptop.Model.Entity.Account;
using APIShopLaptop.Model.Entity.Product_Related;

namespace APIShopLaptop.Data {
    public class DbInitializer : IDbInitializer {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public DbInitializer(ApplicationDBContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager) {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public async void Initialize() {
            _context.Database.EnsureCreated();
            if (!await _roleManager.RoleExistsAsync("Admin")) {
                await _roleManager.CreateAsync(new IdentityRole("Admin"));
            }
            if (!await _roleManager.RoleExistsAsync("User")) {
                await _roleManager.CreateAsync(new IdentityRole("User"));
            }
            if (await _userManager.FindByNameAsync("Admin") == null) {
                var admin = new AppUser {
                    UserName = "Admin",
                    Email="admin@admin",
                    EmailConfirmed = true,
                };
                await _userManager.CreateAsync(admin, "admin");
                await _userManager.AddToRoleAsync(admin, "Admin");
            }
            if (!_context.Brands.Any()) {
                List<Brand> brands = new List<Brand>() {
                    new Brand() {
                        Name="Asus",
                        Tag="ASUS"
                    },
                    new Brand() {
                        Name="Lenovo",
                        Tag="Lenovo"
                    },
                    new Brand() {
                        Name="Acer",
                        Tag="ACER"
                    },
                    new Brand() {
                        Name="MSI",
                        Tag="MSI"
                    },
                };
                await _context.Brands.AddRangeAsync(brands);
                _context.SaveChanges();
            }
            if (!_context.MainCaterories.Any()) {
                List<MainCaterory> mainCaterories = new List<MainCaterory>() {
                    new MainCaterory {
                        Id="DM-1",
                        Name="Laptop",
                        Description="Bán laptop",
                        SubCaterories= new List<SubCaterory> {
                            new SubCaterory {
                                Id="DM-1-1",
                                Name="Laptop 13 Inch",
                            },
                            new SubCaterory {
                                Id="DM-1-2",
                                Name="Laptop 14 Inch",
                            }
                        }
                    },
                    new MainCaterory {
                        Id="DM-2",
                        Name="CPU",
                        Description="Bán CPU",
                        SubCaterories= new List<SubCaterory> {
                            new SubCaterory {
                                Id="DM-2-1",
                                Name="Intel",
                            },
                            new SubCaterory {
                                Id="DM-2-2",
                                Name="Core I3",
                            },
                            new SubCaterory {
                                Id="DM-2-3",
                                Name="Core I5",
                            },
                            new SubCaterory {
                                Id="DM-2-4",
                                Name="Core I9",
                            },
                            new SubCaterory {
                                Id="DM-2-5",
                                Name="AMD",
                            },
                            new SubCaterory {
                                Id="DM-2-6",
                                Name="Ryzen 3",
                            },
                            new SubCaterory {
                                Id="DM-2-7",
                                Name="Ryzen 5",
                            },
                            new SubCaterory {
                                Id="DM-2-8",
                                Name="Ryzen 9",
                            },
                        }
                    }
                };
                _context.MainCaterories.AddRange(mainCaterories);
                _context.SaveChanges();
            }
        }
    }
}
