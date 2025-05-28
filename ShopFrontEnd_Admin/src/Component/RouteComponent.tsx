import {Routes,Route} from "react-router";
import AdminPage from "./AdminPage.tsx";
import AdminLogin from "./AdminLogin.tsx";
import Information from "./Information.tsx";
import Account from "./Account/Account.tsx";
import Brand from "./Brand/Brand.tsx";
import DiscountCode from "./DiscountCode/DiscountCode.tsx";
import Specification from "./Specification/Specification.tsx";

export default function RouteComponent(){
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={ <AdminPage/>}>
                <Route path="" index element={<Information/>}></Route>
                <Route path="TaiKhoan" element={<Account/> }></Route>
                <Route path="HangSanXuat" element={<Brand/> }></Route>
                <Route path="MaGiamGia" element={<DiscountCode/> }></Route>
                <Route path="ThongSo" element={<Specification/> }></Route>
            </Route>
            <Route path="Login" element={<AdminLogin/>}></Route>
        </Routes>
    )
}