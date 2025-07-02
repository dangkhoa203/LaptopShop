import {Routes,Route} from "react-router";
import AdminPage from "./AdminPage.tsx";
import AdminLogin from "./AdminLogin.tsx";
import Information from "./Summary/Information.tsx";
import Account from "./Account/Account.tsx";
import Brand from "./Brand/Brand.tsx";
import DiscountCode from "./DiscountCode/DiscountCode.tsx";
import Specification from "./Specification/Specification.tsx";
import CreateProductPage from "./SanPham/Create/CreateProductPage.tsx";
import ProductPage from "./SanPham/ProductPage.tsx";
import ProductList from "./SanPham/ProductList.tsx";
import UpdateProductPage from "./SanPham/Update/UpdateProductPage.tsx";
import Order from "./Order/Order.tsx";
import OrderDetail from "./Order/OrderDetail.tsx";
import Transaction from "./Transaction/Transaction.tsx";

export default function RouteComponent(){
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={ <AdminPage/>}>
                <Route path="" index element={<Information/>}></Route>
                <Route path="TaiKhoan" element={<Account/> }></Route>
                <Route path="SanPham" element={<ProductPage/> }>
                    <Route path="" index element={<ProductList/> }/>
                    <Route path="Tao" element={<CreateProductPage/> }/>
                    <Route path="Sua/:id" element={<UpdateProductPage/> }/>
                </Route>
                <Route path="DonHang" >
                    <Route path="" index element={<Order/> }></Route>
                    <Route path=":id" index element={<OrderDetail/> }/>
                </Route>
                <Route path="HangSanXuat" element={<Brand/> }></Route>
                <Route path="MaGiamGia" element={<DiscountCode/> }></Route>
                <Route path="ThongSo" element={<Specification/> }></Route>
                <Route path="ThanhToan" element={<Transaction/> }></Route>
            </Route>
            <Route path="Login" element={<AdminLogin/>}></Route>
        </Routes>
    )
}