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
                int count = 0;

                List<MainCaterory> mainCaterories = [
                    new MainCaterory {
                        Id=$"LAPTOP",
                        Name="Laptop",
                        Description="Laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"LAPTOP_VANPHONG",
                                Name="Văn phòng",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_GAMING",
                               Name="Gaming",
                            },
                        ]
                    },
                    new MainCaterory {
                        Id=$"MACBOOK",
                        Name="Macbook",
                        Description="Apple Macbook",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"MACBOOK_13",
                                Name="Macbook Air 13 inch",
                            },
                            new SubCaterory {
                                Id=$"MACBOOK_14",
                               Name="Macbook Air 14 inch",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"LAPTOP_ACER",
                        Name="Laptop Acer",
                        Description="Acer laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"LAPTOP_ACER_ASPIRE",
                                Name="Aspire",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_ACER_SWIFT",
                               Name="Swift",
                            }
                        ]
                    },

                    new MainCaterory {
                        Id=$"LAPTOP_ASUS",
                        Name="Laptop Asus",
                        Description="Asus laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"LAPTOP_ACER_ZENBOOK",
                                Name="Zenbook",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_ACER_VIVOBOOK",
                               Name="Vivobook",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"LAPTOP_MSI",
                        Name="Laptop MSI",
                        Description="MSI laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"LAPTOP_MSI_MODERN",
                                Name="Modern",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_MSI_PRESTIGE",
                               Name="Prestige",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"LAPTOP_LENOVO",
                        Name="Laptop Lenovo",
                        Description="Asus laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"LAPTOP_LENOVO_THINKPAD",
                                Name="Thinkpad",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_LENOVO_YOGA",
                               Name="Yoga",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_LENOVO_IDEAPAD",
                               Name="Ideapad",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_LENOVO_THINKBOOK",
                               Name="Thinkbook",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"LAPTOP_DELL",
                        Name="Laptop Dell",
                        Description="Dell laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"LAPTOP_DELL_INSPRIRON",
                                Name="Inspriron",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_DELL_VOSTRO",
                               Name="Vostro",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_DELL_LATITUDE",
                               Name="Latitude",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_DELL_XPS",
                               Name="XPS",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"LAPTOP_HP",
                        Name="Laptop HP",
                        Description="HP laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"LAPTOP_HP_PAVILION",
                                Name="Pavilion",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_HP_ENVY",
                               Name="Envy",
                            },
                            new SubCaterory {
                                Id=$"LAPTOP_HP_ELITEBOOK",
                               Name="Elitebook",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"GAMING_ACER",
                        Name="Gaming Acer",
                        Description="Acer gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"GAMING_ACER_NITRO",
                                Name="Nitro",
                            },
                            new SubCaterory {
                                Id=$"GAMING_ACER_PREDATOR",
                               Name="Predator",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"GAMING_ASUS",
                        Name="Gaming Asus",
                        Description="Asus gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"GAMING_ASUS_ROG",
                                Name="ROG",
                            },
                            new SubCaterory {
                                Id=$"GAMING_ASUS_TUF",
                               Name="TUF",
                            },
                            new SubCaterory {
                                Id=$"GAMING_ASUS_ZEPHYRUS",
                               Name="Zephyrus",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"GAMING_MSI",
                        Name="Gaming MSI",
                        Description="MSI gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"GAMING_MSI_THIN",
                                Name="Thin",
                            },
                            new SubCaterory {
                                Id=$"GAMING_MSI_RAIDER",
                               Name="Raider",
                            },
                            new SubCaterory {
                                Id=$"GAMING_MSI_KATANA",
                               Name="Katana",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"GAMING_LENOVO",
                        Name="Gaming Lenovo",
                        Description="Lenovo gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"GAMING_LENOVO_LEGION",
                                Name="Legion",
                            },
                            new SubCaterory {
                                Id=$"GAMING_LENOVO_LOQ",
                               Name="LOQ",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"GAMING_DELL",
                        Name="Gaming Dell",
                        Description="Dell gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"GAMING_DELL_GSERIES",
                                Name="Dell Gaming G",
                            },
                            new SubCaterory {
                                Id=$"GAMING_DELL_ALIENWARE",
                               Name="Alienware",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"GAMING_HP",
                        Name="Gaming HP",
                        Description="HP gaming laptop",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"GAMING_HP_OMEN",
                                Name="Omen",
                            },
                            new SubCaterory {
                                Id=$"GAMING_HP_VICTUS",
                               Name="Victus",
                            },
                        ]
                    },

                    
                    new MainCaterory {
                        Id=$"CARD",
                        Name="Card đồ họa",
                        Description="VGA",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"CARD_NVIDIA",
                                Name="NVDIA",
                            },
                            new SubCaterory {
                                Id=$"CARD_AMD",
                               Name="AMD",
                            },
                            new SubCaterory {
                                Id=$"CARD_INTEL",
                               Name="Intel",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"MOTHERBOARD",
                        Name="Bo mạch",
                        Description="Motherboard",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"MOTHERBOARD_INTEL",
                                Name="Intel",
                            },
                            new SubCaterory {
                                Id=$"MOTHERBOARD_AMD",
                               Name="AMD",
                            },
                            new SubCaterory {
                                Id=$"MOTHERBOARD_ATX",
                               Name="ATX",
                            },
                            new SubCaterory {
                                Id=$"MOTHERBOARD_MICROATX",
                               Name="Micro-ATX",
                            },
                            new SubCaterory {
                                Id=$"MOTHERBOARD_MINIITX",
                               Name="Mini-ITX",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"CPU",
                        Name="CPU",
                        Description="CPU",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"CPU_INTEL",
                                Name="Intel",
                            },
                            new SubCaterory {
                                Id=$"CPU_AMD",
                               Name="AMD",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"CASE",
                        Name="Case",
                        Description="Case máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"CASE_ATX",
                                Name="ATX",
                            },
                            new SubCaterory {
                                Id=$"CASE_MINIITX",
                                Name="Mini-ITX",
                            },
                            new SubCaterory {
                                Id=$"CASE_MICROATX",
                               Name="Micro-ATX",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"PSU",
                        Name="Nguồn",
                        Description="Nguồn máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"PSU_100W",
                                Name="Từ 100W - 300W",
                            },
                            new SubCaterory {
                                Id=$"PSU_300W",
                               Name="Từ 300W - 500W",
                            },
                            new SubCaterory {
                                Id=$"PSU_500W",
                               Name="Từ 500W - 800W",
                            },
                            new SubCaterory {
                                Id=$"PSU_800W",
                               Name="800W trở lên",
                            },
                        ]
                    },

                   

                    new MainCaterory {
                        Id=$"RAM",
                        Name="RAM",
                        Description="RAM máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"RAM_DDR4",
                                Name="DDR4",
                            },
                            new SubCaterory {
                                Id=$"RAM_DDR5",
                               Name="DDR5",
                            },
                            new SubCaterory {
                                Id=$"RAM_4GB",
                               Name="4GB",
                            },
                            new SubCaterory {
                                Id=$"RAM_8GB",
                               Name="8GB",
                            },
                            new SubCaterory {
                                Id=$"RAM_16GB",
                               Name="16GB",
                            },
                            new SubCaterory {
                                Id=$"RAM_32GB",
                               Name="32GB",
                            },
                        ]
                    },


                    new MainCaterory {
                        Id=$"OCUNG",
                        Name="Ổ cứng",
                        Description="Ổ cứng máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"OCUNG_SSD",
                                Name="SSD",
                            },
                            new SubCaterory {
                                Id=$"OCUNG_HDD",
                               Name="HDD",
                            },
                            new SubCaterory {
                                Id=$"OCUNG_NVME",
                               Name="NVME",
                            },
                            new SubCaterory {
                                Id=$"OCUNG_M2SATA",
                               Name="M.2 SATA",
                            },
                            new SubCaterory {
                                Id=$"OCUNG_SATA",
                               Name="SATA",
                            },
                        ]
                    },

                    new MainCaterory {
                        Id=$"MANHINH",
                        Name="Màn hình",
                        Description="Màn hình máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"MANHINH_60HZ",
                                Name="60Hz",
                            },
                            new SubCaterory {
                                Id=$"MANHINH_120HZ",
                               Name="144Hz",
                            },
                            new SubCaterory {
                                Id=$"MANHINH_240HZ",
                               Name="240HZ",
                            },
                            new SubCaterory {
                                Id=$"MANHINH_1080P",
                               Name="1080p",
                            },
                            new SubCaterory {
                                Id=$"MONITOR_2K",
                               Name="2K",
                            },
                            new SubCaterory {
                                Id=$"MONITOR_4K",
                               Name="4K",
                            },
                        ]
                    },
                    new MainCaterory {
                        Id=$"PC",
                        Name="PC",
                        Description="Máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"PC_VANPHONG",
                                Name="Văn phòng",
                            },
                            new SubCaterory {
                                Id=$"PC_GAMING",
                               Name="Gaming",
                            },
                        ]
                    },
                    new MainCaterory {
                        Id=$"TANNHIET",
                        Name="Tản nhiệt",
                        Description="Tản nhiệt máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"TANNHIET_QUAT",
                                Name="Quạt máy tính",
                            },
                            new SubCaterory {
                                Id=$"TANNHIET_KEM",
                               Name="Kem tản nhiệt",
                            },
                        ]
                    },
                    new MainCaterory {
                        Id=$"PHUKIEN",
                        Name="Phụ kiện",
                        Description="Phụ kiện máy tính",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"PHUKIEN_CHUOT",
                                Name="Chuột máy tính",
                            },
                            new SubCaterory {
                                Id=$"PHUKIEN_LOTCHUOT",
                                Name="Lót chuột máy tính",
                            },
                            new SubCaterory {
                                Id=$"PHUKIEN_PHIMCO",
                                Name="Bàn phím cơ",
                            },
                            new SubCaterory {
                                Id=$"PHUKIEN_PHIMVANPHONG",
                                Name="Bàn phím văn phòng",
                            },
                            new SubCaterory {
                                Id=$"PHUKIEN_HUB",
                                Name="Hub",
                            },
                            new SubCaterory {
                                Id=$"PHUKIEN_CAP",
                                Name="CAP",
                            },
                        ]
                    },
                    new MainCaterory {
                        Id=$"DB",
                        Name="Đặt biệt",
                        Description="",
                        SubCaterories= [
                            new SubCaterory {
                                Id=$"SALE",
                                Name="Sale",
                            },
                            new SubCaterory {
                                Id=$"NOIBAT",
                               Name="Nổi bật",
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
