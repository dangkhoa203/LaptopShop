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
                List<Brand> brands = [
                    new Brand() {
                        Name="Asus",
                        Tag="ASUS"
                    },
                    new Brand() {
                        Name="Lenovo",
                        Tag="LENOVO"
                    },
                    new Brand() {
                        Name="Acer",
                        Tag="ACER"
                    },
                    new Brand() {
                        Name="MSI",
                        Tag="MSI"
                    },
                ];
                await _context.Brands.AddRangeAsync(brands);
                _context.SaveChanges();
            }
            if (!_context.MainCaterories.Any()) {
                int count = 1;

                List<MainCaterory> mainCaterories = [
                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Laptop",
                        Description="Laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Văn phòng",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Gaming",
                            },
                        ]
                    },
                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Macbook",
                        Description="Apple Macbook",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Macbook Air 13 inch",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Macbook Air 14 inch",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Laptop Acer",
                        Description="Acer laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Aspire",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Swift",
                            }
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Laptop Asus",
                        Description="Asus laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Zenbook",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Vivobook",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Laptop MSI",
                        Description="MSI laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Modern",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Prestige",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Laptop Lenovo",
                        Description="Asus laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Thinkpad",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Yoga",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Ideapad",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="Thinkbook",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Laptop Dell",
                        Description="Dell laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Inspriron",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Vostro",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Latitude",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="XPS",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Laptop HP",
                        Description="HP laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Pavilion",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Envy",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Elitebook",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Gaming Acer",
                        Description="Acer gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Nitro",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Predator",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Gaming Asus",
                        Description="Asus gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="ROG",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="TUF",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Zephyrus",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Gaming MSI",
                        Description="MSI gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Thin",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Raider",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Katana",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Gaming Lenovo",
                        Description="Lenovo gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Legion",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="LOQ",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Katana",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Gaming Dell",
                        Description="Dell gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Dell Gaming G",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Alienware",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Gaming HP",
                        Description="HP gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Omen",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Victus",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Linh kiện Laptop",
                        Description="Linh kiện cho laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="RAM",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="SSD",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Ổ cứng di động",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Card đồ họa",
                        Description="VGA",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="NVDIA",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="AMD",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Intel",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Bo mạch",
                        Description="Motherboard",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Intel",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="AMD",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="ATX",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="Micro-ATX",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-5",
                               Name="Micro-ITX",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="CPU",
                        Description="Motherboard",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Intel",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="AMD",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Case",
                        Description="Case máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Mini-ITX",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Micro-ATX",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Tower",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Nguồn",
                        Description="Nguồn máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Từ 100W - 300W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Từ 300W - 500W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Từ 500W - 600W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="Từ 600W - 800W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-5",
                               Name="800W trở lên",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Nguồn",
                        Description="Nguồn máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="Từ 100W - 300W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="Từ 300W - 500W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="Từ 500W - 600W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="Từ 600W - 800W",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-5",
                               Name="800W trở lên",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="RAM",
                        Description="RAM máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="DDR4",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="DDR5",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="4GB",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="8GB",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-5",
                               Name="16GB",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-6",
                               Name="32GB",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="RAM",
                        Description="RAM máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="DDR4",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="DDR5",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="4GB",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="8GB",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-5",
                               Name="16GB",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-6",
                               Name="32GB",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Ổ cứng",
                        Description="Ổ cứng máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="SSD",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="HDD",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"DM-{count++}",
                        Name="Màn hình",
                        Description="Màn hình máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"DM-{count}-1",
                                Name="60Hz",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-2",
                               Name="120Hz",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-3",
                               Name="1080p",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-4",
                               Name="2K",
                            },
                            new SubCaterory {
                                Id=$"DM-{count}-5",
                               Name="4K",
                            },
                        ]
                    },
                ];
                _context.MainCaterories.AddRange(mainCaterories);
                _context.SaveChanges();
            }
        }
    }
}
