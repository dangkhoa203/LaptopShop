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
function newBrand(name:string,tag:string){
    return{name:name,tag:tag};
}
export default function RouteComponent(){
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={ <UserPage></UserPage>}>
                <Route path="" element={<HomePage/> }/>
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
                <Route path="Dung-PC" >
                    <Route index path="" element={<PCBuilderPage></PCBuilderPage>}></Route>
                    <Route path="DatHang" element={<BuildOrderPage/> }></Route>
                </Route>
                <Route path="Motherboard" >
                    <Route path="AMD" element={<CategoryPage  title={"Motherboard thích hợp với CPU AMD"} categoryId={"MOTHERBOARD_AMD"}
                                                   brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="Intel" element={<CategoryPage title={"Motherboard thích hợp với CPU Intel"} categoryId={"MOTHERBOARD_INTEL"}
                                                  brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="ATX" element={<CategoryPage title={"Motherboard thích hợp với case ATX"} categoryId={"MOTHERBOARD_ATX"}
                                                  brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="Micro-ATX" element={<CategoryPage title={"Motherboard thích hợp với case Micro-ATX"} categoryId={"MOTHERBOARD_MicroATX"}
                                                  brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                    <Route path="Micro-ITX" element={<CategoryPage title={"Motherboard thích hợp với case Micro-ITX"} categoryId={"MOTHERBOARD_MicroITX"}
                                                                   brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Asrock","ASROCK"),newBrand("Gigabyte","GIGABYTE")]} isMain={false}/> }/>
                </Route>
                <Route path="CPU" >
                    <Route path="AMD" element={<CategoryPage title={"CPU AMD"} categoryId={"CPU_AMD"} isMain={false} brands={[]}/>  }/>
                    <Route path="Intel" element={<CategoryPage title={"CPU Intel"} categoryId={"CPU_INTEL"} isMain={false}  brands={[]}/> }/>
                </Route>
                <Route path="GPU" >
                    <Route path="Nvidia" element={<CategoryPage title={"GPU Nvidia"} categoryId={"CARD_NVIDIA"} isMain={false}
                                                                brands={[newBrand("Asus","ASUS"),newBrand("MSI","MSI"),newBrand("Gigabyte","GIGABYTE"),newBrand("Zotac","ZOTAC")]}/> }/>
                    <Route path="AMD" element={<CategoryPage title={"GPU AMD"} categoryId={"CARD_AMD"} isMain={false}
                                                             brands={[newBrand("Asus","ASUS"),newBrand("Sapphire","SAPPHIRE"),newBrand("XFX","XFX")]}/> }/>
                    <Route path="Intel" element={<CategoryPage title={"GPU Intel"} categoryId={"CARD_INTEL"} isMain={false}  brands={[]}/> }/>
                </Route>
                <Route path="RAM" >
                    <Route path="DDR4" element={<CategoryPage title={"RAM DDR4"} categoryId={"RAM_DDR4"} isMain={false}
                                                              brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="DDR5" element={<CategoryPage title={"RAM DDR5"} categoryId={"RAM_DDR5"} isMain={false}
                                                              brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="4GB" element={<CategoryPage title={"RAM 4GB"} categoryId={"RAM_4GB"} isMain={false}
                                                             brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="8GB" element={<CategoryPage title={"RAM 8GB"} categoryId={"RAM_8GB"} isMain={false}
                                                             brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                    <Route path="16GB" element={<CategoryPage title={"RAM 16GB"} categoryId={"RAM_16GB"} isMain={false}
                                                              brands={[newBrand("Kingston","KINGSTON"),newBrand("Corsair","CORSAIR"),newBrand("Samsung","SAMSUNG")]}/> }/>
                </Route>
                <Route path="Memory" >
                    <Route path="SSD" element={<CategoryPage title={"Ổ cứng SSD"} categoryId={"OCUNG_SSD"} isMain={false} brands={[]}/> }/>
                    <Route path="HDD" element={<CategoryPage title={"Ổ cứng HDD"} categoryId={"OCUNG_HDD"} isMain={false} brands={[]}/> }/>
                </Route>
            </Route>
        </Routes>
    )
}