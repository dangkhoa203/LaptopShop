import {useCart} from "../../State/Cart.ts";

import {useUserInfo} from "../../State/User.ts";
import {Badge} from "@mui/material";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router";

export default function CartButton(){
    const navigate = useNavigate();
    const cart=useCart();
    const userInfo=useUserInfo((state)=> state.user);

    const cartCount=userInfo.isLogged? cart.count():0

    return(
        <IconButton onClick={()=>navigate("/GioHang")} color="inherit" size="large">
            <Badge badgeContent={cartCount} color="error">
                <ShoppingBasketOutlinedIcon color="inherit" />
            </Badge>
        </IconButton>
    )
}