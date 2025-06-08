import {Routes,Route} from "react-router";
import UserPage from "./UserPage.tsx";
import AccountPage from "./Account/AccountPage.tsx";
import HomePage from "./HomePage.tsx";
import CartPage from "./Cart/CartPage.tsx";
import CreateOrderPage from "./Order/CreateOrderPage.tsx";
import OrderHistory from "./Order/OrderHistory.tsx";

export default function RouteComponent(){
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={ <UserPage></UserPage>}>
                <Route path="" element={<HomePage/> }/>
                <Route path="GioHang" element={<CartPage/>}/>
                <Route path="TaiKhoan" element={<AccountPage/> }/>
                <Route path="DatHang" element={<CreateOrderPage/> }/>
                <Route path="DonHang" element={<OrderHistory/> }></Route>
            </Route>
        </Routes>
    )
}