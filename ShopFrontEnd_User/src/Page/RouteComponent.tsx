import {Routes, Route, Navigate} from "react-router";
import UserPage from "./UserPage.tsx";
import AccountPage from "./Account/AccountPage.tsx";
import HomePage from "./HomePage.tsx";
import CartPage from "./Cart/CartPage.tsx";
import CreateOrderPage from "./Order/CreateOrderPage.tsx";
import OrderHistory from "./Order/OrderHistory.tsx";
import OrderDetail from "./Order/OrderDetail.tsx";
import MomoConfirmPage from "./Order/MomoConfirmPage.tsx";
import PCBuilderPage from "./Build/PCBuilderPage.tsx";
import BuildOrderPage from "./Build/BuildOrderPage.tsx";
import SearchPage from "./Product/SearchPage.tsx";
import ProductPage from "./Product/ProductPage.tsx";
import ProductReviewPage from "./Product/ProductReviewPage.tsx";
import ReviewPage from "./Review/ReviewPage.tsx";
import CategoryPage from "./Product/CategoryPage.tsx";
import SearchBySpecification from "./Product/SearchBySpecification.tsx";
import BrandPage from "./Product/BrandPage.tsx";
import LaptopPage from "./CategoryPage/LaptopPage.tsx";
import PCPage from "./CategoryPage/PCPage.tsx";
import MotherBoardPage from "./CategoryPage/MotherBoardPage.tsx";
import CPUPage from "./CategoryPage/CPUPage.tsx";
import CardPage from "./CategoryPage/CardPage.tsx";
import PSUPage from "./CategoryPage/PSUPage.tsx";
import MoniterPage from "./CategoryPage/MoniterPage.tsx";
import RAMPage from "./CategoryPage/RAMPage.tsx";
import ThermalPage from "./CategoryPage/ThermalPage.tsx";
import MemoryPage from "./CategoryPage/MemoryPage.tsx";
import CasePage from "./CategoryPage/CasePage.tsx";
import AccessoryPage from "./CategoryPage/AccessoryPage.tsx";
import ConfirmAccount from "./Account/ConfirmAccount.tsx";
import ConfirmEmailChange from "./Account/ConfirmEmailChange.tsx";
import ConfirmPasswordChange from "./Account/ConfirmPasswordChange.tsx";
import ResetMatKhau from "./Account/ResetMatKhau.tsx";
import NotFoundPage from "./CommonPage/NotFoundPage.tsx";
function newBrand(name:string,tag:string){
    return{name:name,tag:tag};
}
export default function RouteComponent(){
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={ <UserPage></UserPage>}>
                <Route path="" element={<HomePage/> }/>
                <Route path="/XacNhan/:username/:code" element={<ConfirmAccount/>}></Route>
                <Route path="/XacNhanDoiEmail/:id/:email/:code" element={<ConfirmEmailChange></ConfirmEmailChange>}></Route>
                <Route path="/XacNhanDoiMatKhau/:id/:password/:code" element={<ConfirmPasswordChange></ConfirmPasswordChange>}></Route>
                <Route path="/ResetMatKhau/:id/:code" element={<ResetMatKhau />}></Route>
                <Route path="Tim">
                    <Route path="" element={<Navigate to={"/"}/> }></Route>
                    <Route path={"CauHinh"} element={<SearchBySpecification/> }></Route>
                    <Route path={":mode/:query"} element={<SearchPage/> }></Route>
                </Route>
                <Route path="SanPham">
                    <Route path="" element={<Navigate to={"/"}/> }></Route>
                    <Route path=":id" element={<ProductPage/>}></Route>
                    <Route path=":id/Review" element={<ProductReviewPage/>}></Route>
                </Route>
                <Route path="GioHang" element={<CartPage/>}/>
                <Route path="Review" element={<ReviewPage/>}/>
                <Route path="TaiKhoan" element={<AccountPage/> }/>
                <Route path="DatHang" element={<CreateOrderPage/> }/>
                <Route path="DonHang" >
                    <Route path="" element={<OrderHistory/> }></Route>
                    <Route path=":id" element={<OrderDetail/>}></Route>
                </Route>
                <Route path="Momo" element={<MomoConfirmPage></MomoConfirmPage>}></Route>
                <Route path="Dung_PC" >
                    <Route index path="" element={<PCBuilderPage></PCBuilderPage>}></Route>
                    <Route path="DatHang" element={<BuildOrderPage/> }></Route>
                </Route>
                <Route path="Laptop" >
                    <Route path="" element={<LaptopPage/> }></Route>
                    <Route path="Van_Phong" element={<CategoryPage key={"LAPTOP_VANPHONG"} title={"Laptop văn phòng"} categoryId={"LAPTOP_VANPHONG"}
                                                              brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Lenovo","LENOVO"),newBrand("Dell","DELL"),newBrand("HP","HP")]} isMain={false}/> }/>
                    <Route path="Gaming" element={<CategoryPage  key={"LAPTOP_GAMING"} title={"Laptop Gaming"} categoryId={"LAPTOP_GAMING"}
                                                               brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Lenovo","LENOVO"),newBrand("Gigabyte","GIGABYTE"),newBrand("Dell","DELL"),newBrand("HP","HP")]} isMain={false}/> }/>
                    <Route path="Asus" element={<BrandPage key={"LAPTOP_ASUS"} brandTag={"ASUS"} title={"Laptop Asus"} categoryId={"LAPTOP"} isMain={true}/> }/>
                    <Route path="MSI" element={<BrandPage key={"LAPTOP_MSI"} brandTag={"MSI"} title={"Laptop MSI"} categoryId={"LAPTOP"} isMain={true}/> }/>
                    <Route path="Acer" element={<BrandPage key={"LAPTOP_ACER"} brandTag={"ACER"} title={"Laptop Acer"} categoryId={"LAPTOP"} isMain={true}/> }/>
                    <Route path="Lenovo" element={<BrandPage key={"LAPTOP_LENOVO"} brandTag={"LENOVO"} title={"Laptop Lenovo"} categoryId={"LAPTOP"} isMain={true}/> }/>
                    <Route path="Dell" element={<BrandPage key={"LAPTOP_DELL"} brandTag={"DELL"} title={"Laptop Dell"} categoryId={"LAPTOP"} isMain={true}/> }/>
                    <Route path="HP" element={<BrandPage key={"LAPTOP_HP"} brandTag={"HP"} title={"Laptop HP"} categoryId={"LAPTOP"} isMain={true}/> }/>
                    <Route path="Zenbook" element={<CategoryPage key={"Zenbook"}  title={"Asus Zenbook"} categoryId={"LAPTOP_ASUS_ZENBOOK"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="Vivobook" element={<CategoryPage key={"Zenbook"} title={"Asus Vivobook"} categoryId={"LAPTOP_ASUS_VIVOBOOK"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="Modern" element={<CategoryPage key={"MODERN"} title={"MSI Modern"} categoryId={"LAPTOP_MSI_MODERN"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="Prestige" element={<CategoryPage key={"Prestige"} title={"MSI Prestige"} categoryId={"LAPTOP_MSI_PRESTIGE"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Swift" element={<CategoryPage key={"Swift"} title={"Acer Swift"} categoryId={"LAPTOP_ACER_SWIFT"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Aspire" element={<CategoryPage key={"Aspire"} title={"Acer Aspire"} categoryId={"LAPTOP_ACER_ASPIRE"}
                                                                  brands={[]} isMain={false}/> }/>
                    <Route path="Thinkpad" element={<CategoryPage key={"Thinkpad"} title={"Lenovo Thinkpad"} categoryId={"LAPTOP_LENOVO_THINKPAD"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Thinkbook" element={<CategoryPage key={"Thinkbook"} title={"Lenovo Thinkbook"} categoryId={"LAPTOP_LENOVO_THINKBOOK"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Ideapad" element={<CategoryPage key={"Ideapad"} title={"Lenovo Ideapad"} categoryId={"LAPTOP_LENOVO_IDEAPAD"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Inspriron" element={<CategoryPage key={"Inspriron"} title={"Dell Inspriron"} categoryId={"LAPTOP_DELL_INSPRIRON"}
                                                                   brands={[]} isMain={false}/> }/>
                    <Route path="Vostro" element={<CategoryPage key={"Vostro"} title={"Dell Vostro"} categoryId={"LAPTOP_DELL_VOSTRO"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Latitude" element={<CategoryPage key={"Latitude"} title={"Dell Latitude"} categoryId={"LAPTOP_DELL_LATITUDE"}
                                                                  brands={[]} isMain={false}/> }/>
                    <Route path="XPS" element={<CategoryPage key={"XPS"} title={"Dell XPS"} categoryId={"LAPTOP_DELL_XPS"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="Elitebook" element={<CategoryPage key={"Elitebook"} title={"HP Elitebook"} categoryId={"LAPTOP_HP_ELITEBOOK"}
                                                                   brands={[]} isMain={false}/> }/>
                    <Route path="Envy" element={<CategoryPage key={"Envy"} title={"HP Envy"} categoryId={"LAPTOP_HP_ENVY"}
                                                              brands={[]} isMain={false}/> }/>
                    <Route path="Pavilion" element={<CategoryPage key={"Pavilion"} title={"HP Pavilion"} categoryId={"LAPTOP_HP_PAVILION"}
                                                                  brands={[]} isMain={false}/> }/>
                    <Route path="ROG" element={<CategoryPage key={"ROG"} title={"Asus ROG Series"} categoryId={"GAMING_ASUS_ROG"}
                                                                 brands={[]} isMain={false}/> }/>
                    <Route path="TUF" element={<CategoryPage key={"TUF"} title={"Asus TUF Series"} categoryId={"GAMING_ASUS_TUF"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="Zephyrus" element={<CategoryPage key={"Zephyrus"} title={"Asus Zephyrus"} categoryId={"GAMING_ASUS_TUF"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="Thin" element={<CategoryPage key={"Thin"} title={"MSI Thin"} categoryId={"GAMING_MSI_THIN"}
                                                                  brands={[]} isMain={false}/> }/>
                    <Route path="Raider" element={<CategoryPage key={"Raider"} title={"MSI Raider"} categoryId={"GAMING_MSI_RAIDER"}
                                                              brands={[]} isMain={false}/> }/>
                    <Route path="Katana" element={<CategoryPage key={"Katana"} title={"MSI Katana"} categoryId={"GAMING_MSI_KATANA"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Legion" element={<CategoryPage key={"Legion"} title={"Lenovo Legion"} categoryId={"GAMING_LENOVO_LEGION"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="LOQ" element={<CategoryPage key={"LOQ"} title={"Lenovo LOQ"} categoryId={"GAMING_LENOVO_LOQ"}
                                                                brands={[]} isMain={false}/> }/>
                    <Route path="Nitro" element={<CategoryPage key={"Nitro"} title={"Acer Nitro"} categoryId={"GAMING_ACER_NITRO"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="Predator" element={<CategoryPage key={"Predator"} title={"Acer Predator"} categoryId={"GAMING_ACER_PREDATOR"}
                                                             brands={[]} isMain={false}/> }/>
                    <Route path="G_Series" element={<CategoryPage key={"G_Series"} title={"Dell G Series"} categoryId={"GAMING_DELL_GSERIES"}
                                                                  brands={[]} isMain={false}/> }/>
                    <Route path="Alienware" element={<CategoryPage key={"Alienware"} title={"Dell Alienware"} categoryId={"GAMING_DELL_Alienware"}
                                                                  brands={[]} isMain={false}/> }/>
                    <Route path="Victus" element={<CategoryPage key={"Victus"} title={"HP Victus"} categoryId={"GAMING_HP_VICTUS"}
                                                                  brands={[]} isMain={false}/> }/>
                    <Route path="Omen" element={<CategoryPage key={"Omen"} title={"HP Omen"} categoryId={"GAMING_HP_OMEN"}
                                                                   brands={[]} isMain={false}/> }/>

                </Route>
                <Route path="PC">
                    <Route path="" element={<PCPage/> }></Route>
                    <Route path="Van_Phong" element={<CategoryPage key={"PC_VANPHONG"} title={"PC văn phòng"} categoryId={"PC_VANPHONG"}
                                                                   brands={[newBrand("Asus","ASUS"),newBrand("Lenovo","LENOVO"),newBrand("Dell","DELL")]} isMain={false}/> }/>
                    <Route path="Gaming" element={<CategoryPage key={"PC_GAMING"} title={"PC văn phòng"} categoryId={"PC_GAMING"}
                                                                   brands={[newBrand("Asus","ASUS"),newBrand("Lenovo","LENOVO"),newBrand("MSI","MSI")]} isMain={false}/> }/>
                    <Route path="Asus" element={<BrandPage key={"PC_ASUS"} brandTag={"ASUS"} title={"PC Asus"} categoryId={"PC"} isMain={true}/> }/>
                    <Route path="Lenovo" element={<BrandPage key={"PC_LENOVO"} brandTag={"LENOVO"} title={"PC Lenovo"} categoryId={"PC"} isMain={true}/> }/>
                    <Route path="MSI" element={<BrandPage key={"PC_MSI"} brandTag={"MSI"} title={"PC MSI"} categoryId={"PC"} isMain={true}/> }/>
                    <Route path="Dell" element={<BrandPage key={"PC_DELL"} brandTag={"DELL"} title={"PC Dell"} categoryId={"PC"} isMain={true}/> }/>
                </Route>
                <Route path="Bo_Mach" >
                    <Route path="" element={<MotherBoardPage/> }></Route>
                    <Route path="AMD" element={<CategoryPage key={"MOBO_AMD"} title={"Motherboard thích hợp với CPU AMD"} categoryId={"MOTHERBOARD_AMD"}
                                                   brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="Intel" element={<CategoryPage key={"MOBO_INTEL"} title={"Motherboard thích hợp với CPU Intel"} categoryId={"MOTHERBOARD_INTEL"}
                                                  brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="ATX" element={<CategoryPage key={"MOBO_ATX"} title={"Motherboard thích hợp với case ATX"} categoryId={"MOTHERBOARD_ATX"}
                                                  brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="Micro-ATX" element={<CategoryPage key={"MOBO_Micro-ATX"} title={"Motherboard thích hợp với case Micro-ATX"} categoryId={"MOTHERBOARD_MICROATX"}
                                                  brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="Mini-ITX" element={<CategoryPage key={"MOBO_Mini-ITX"} title={"Motherboard thích hợp với case Mini-ITX"} categoryId={"MOTHERBOARD_MINIITX"}
                                                                   brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                </Route>
                <Route path="CPU" >
                    <Route path="" element={<CPUPage/> }></Route>
                    <Route path="AMD" element={<CategoryPage key={"CPU_AMD"} title={"CPU AMD"} categoryId={"CPU_AMD"} isMain={false} brands={[]}/>  }/>
                    <Route path="Intel" element={<CategoryPage key={"CPU_INTEL"} title={"CPU Intel"} categoryId={"CPU_INTEL"} isMain={false}  brands={[]}/> }/>
                </Route>
                <Route path="GPU" >
                    <Route path="" element={<CardPage/> }></Route>
                    <Route path="Nvidia" element={<CategoryPage key={"GPU_NVIDIA"} title={"GPU Nvidia"} categoryId={"CARD_NVIDIA"} isMain={false}
                                                                brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Gigabyte","GIGABYTE"),newBrand("Zotac","ZOTAC")]}/> }/>
                    <Route path="AMD" element={<CategoryPage key={"GPU_AMD"} title={"GPU AMD"} categoryId={"CARD_AMD"} isMain={false}
                                                             brands={[newBrand("Asus","ASUS"),newBrand("Sapphire","SAPPHIRE"),newBrand("XFX","XFX")]}/> }/>
                    <Route path="Intel" element={<CategoryPage key={"GPU_INTEL"} title={"GPU Intel"} categoryId={"CARD_INTEL"} isMain={false}  brands={[]}/> }/>
                </Route>
                <Route path="RAM" >
                    <Route path="" element={<RAMPage/> }></Route>
                    <Route path="DDR4" element={<CategoryPage key={"DDR4"} title={"RAM DDR4"} categoryId={"RAM_DDR4"} isMain={false}
                                                              brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="DDR5" element={<CategoryPage key={"DDR5"} title={"RAM DDR5"} categoryId={"RAM_DDR5"} isMain={false}
                                                              brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="4GB" element={<CategoryPage key={"4GB"} title={"RAM 4GB"} categoryId={"RAM_4GB"} isMain={false}
                                                             brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="8GB" element={<CategoryPage key={"8GB"} title={"RAM 8GB"} categoryId={"RAM_8GB"} isMain={false}
                                                             brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="16GB" element={<CategoryPage key={"16GB"} title={"RAM 16GB"} categoryId={"RAM_16GB"} isMain={false}
                                                              brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                </Route>
                <Route path="Memory" >
                    <Route path="" element={<MemoryPage/> }></Route>
                    <Route path="SSD" element={<CategoryPage key={"SSD"} title={"Ổ cứng SSD"} categoryId={"OCUNG_SSD"} isMain={false} brands={[]}/> }/>
                    <Route path="HDD" element={<CategoryPage key={"HDD"} title={"Ổ cứng HDD"} categoryId={"OCUNG_HDD"} isMain={false} brands={[]}/> }/>
                </Route>
                <Route path="Man_Hinh" >
                    <Route path="" element={<MoniterPage/> }></Route>
                    <Route path="60hz" element={<CategoryPage key={"60hz"} title={"Màn hình 60Hz"} categoryId={"MANHINH_60HZ"} isMain={false} brands={[]}/> }/>
                    <Route path="144hz" element={<CategoryPage key={"144hz"} title={"Màn hình 144Hz"} categoryId={"MANHINH_120HZ"} isMain={false} brands={[]}/> }/>
                    <Route path="240hz" element={<CategoryPage key={"240hz"} title={"Màn hình 240Hz"} categoryId={"MANHINH_240HZ"} isMain={false} brands={[]}/> }/>
                    <Route path="1080p" element={<CategoryPage key={"1080p"} title={"Màn hình độ phân giải 1080p"} categoryId={"MANHINH_1080P"} isMain={false} brands={[]}/> }/>
                    <Route path="2K" element={<CategoryPage key={"2K"} title={"Màn hình độ phân giải 2K"} categoryId={"MANHINH_2K"} isMain={false} brands={[]}/> }/>
                    <Route path="4K" element={<CategoryPage key={"4K"} title={"Màn hình độ phân giải 4K"} categoryId={"MANHINH_4K"} isMain={false} brands={[]}/> }/>
                </Route>
                <Route path="Case" >
                    <Route path="" element={<CasePage/> }></Route>
                    <Route path="ATX" element={<CategoryPage key={"CASE_ATX"} title={"Case ATX"} categoryId={"CASE_ATX"} isMain={false} brands={[]}/> }/>
                    <Route path="Mini-ITX" element={<CategoryPage key={"CASE_Mini-ITX"} title={"Case Mini-ITX"} categoryId={"CASE_MINIITX"} isMain={false} brands={[]}/> }/>
                    <Route path="Micro-ATX" element={<CategoryPage key={"CASE_Micro-ATX"} title={"Case Micro-ATX"} categoryId={"CASE_MICROATX"} isMain={false} brands={[]}/> }/>
                </Route>
                <Route path="Phu_Kien" >
                    <Route path="" element={<AccessoryPage/> }></Route>
                    <Route path="Chuot" element={<CategoryPage key={"Chuot"} title={"Chuột"} categoryId={"PHUKIEN_CHUOT"} isMain={false} brands={[]}/> }/>
                    <Route path="Lot_Chuot" element={<CategoryPage key={"Lot_Chuot"} title={"Lót chuột"} categoryId={"PHUKIEN_LOTCHUOT"} isMain={false} brands={[]}/> }/>
                    <Route path="Ban_Phim_Co" element={<CategoryPage key={"Ban_Phim_Co"} title={"Bàn phím cơ"} categoryId={"PHUKIEN_PHIMCO"} isMain={false} brands={[]}/> }/>
                    <Route path="Ban_Phim_Van_Phong" element={<CategoryPage key={"Ban_Phim_Van_Phong"} title={"Bàn phím văn phòng"} categoryId={"PHUKIEN_PHIMVANPHONG"} isMain={false} brands={[]}/> }/>
                    <Route path="Hub" element={<CategoryPage key={"Hub"} title={"Hub chuyển đổi"} categoryId={"PHUKIEN_HUB"} isMain={false} brands={[]}/> }/>
                    <Route path="Cap" element={<CategoryPage key={"Cap"} title={"Cáp"} categoryId={"PHUKIEN_CAP"} isMain={false} brands={[]}/> }/>
                </Route>
                <Route path="PSU" >
                    <Route path="" element={<PSUPage/> }></Route>
                    <Route path="100W" element={<CategoryPage key={"100W"} title={"Nguồn từ 100W đến 300W"} categoryId={"PSU_100W"} isMain={false} brands={[]}/> }/>
                    <Route path="300W" element={<CategoryPage key={"300W"} title={"Nguồn từ 300W đến 500W"} categoryId={"PSU_300W"} isMain={false} brands={[]}/> }/>
                    <Route path="500W" element={<CategoryPage key={"500W"} title={"Nguồn từ 500W đến 800W"} categoryId={"PSU_500W"} isMain={false} brands={[]}/> }/>
                    <Route path="800W" element={<CategoryPage key={"800W"} title={"Nguồn từ 800W trở lên"} categoryId={"PSU_800W"} isMain={false} brands={[]}/> }/>
                </Route>
                <Route path="Tan_Nhiet" >
                    <Route path="" element={<ThermalPage/> }></Route>
                    <Route path="Quat" element={<CategoryPage key={"Quat"} title={"Quạt máy tính"} categoryId={"TANNHIET_QUAT"} isMain={false} brands={[]}/> }/>
                    <Route path="Kem" element={<CategoryPage key={"Kem"} title={"Kem tản nhiệt"} categoryId={"TANNHIET_KEM"} isMain={false} brands={[]}/> }/>
                </Route>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    )
}