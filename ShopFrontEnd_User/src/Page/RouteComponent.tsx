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

export default function RouteComponent(){
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={ <UserPage></UserPage>}>
                <Route path="" element={<HomePage/> }/>
                <Route path="Tim">
                    <Route path="" element={<Navigate to={"/"}/> }></Route>
                    <Route path={":query"} element={<SearchPage/> }></Route>
                </Route>
                <Route path="SanPham">
                    <Route path=":id" element={<ProductPage/>}></Route>
                </Route>
                <Route path="GioHang" element={<CartPage/>}/>
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
            </Route>
        </Routes>
    )
}