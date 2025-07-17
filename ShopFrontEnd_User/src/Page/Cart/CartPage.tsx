import Container from "@mui/material/Container";
import {useCart} from "../../State/Cart.ts";
import Button from "@mui/material/Button";
import {Grid, Paper} from "@mui/material";
import CartProductCard from "./CartProductCard.tsx";
import {Navigate, useNavigate} from "react-router";
import {useUserInfo} from "../../State/User.ts";
import {useEffect} from "react";
export default function CartPage(){
    const navigate = useNavigate();
    const cartItems=useCart((state)=>state.cartItems);
    const getTotal=()=>{
        let total=0;
        cartItems.forEach((item)=>{
            console.log(item);
            if(item.priceAfterDiscount!==0)
                total+=item.priceAfterDiscount*item.quantity;
            else
                total+=item.price*item.quantity;
        })
        return total;
    }
    const userInfo=useUserInfo(state=>state.user);
    if(!userInfo.isLogged){
        return <Navigate to={"/"}></Navigate>
    }
    useEffect(()=>{
        document.title="Giỏ hàng"
    },[])
    return(
        <Container maxWidth="lg">
            <Grid container sx={{padding:"10px"}} spacing={2} >
                <Grid size={{xs:12,sm:12,md:12,lg:9}}>
                    <Paper sx={{padding:"10px",maxHeight:"480px",overflowY:"auto"}} elevation={12}>
                        {cartItems.length===0 &&
                        <>
                        Chưa có sản phẩm trong giỏ hàng
                        </>
                        }
                        {cartItems.map((item)=>
                            <CartProductCard product={item}/>
                        )}
                    </Paper>
                </Grid>
                <Grid size={{xs:12,sm:12,md:12,lg:3}}>
                    <Paper elevation={12} sx={{padding:"10px",display:"flex",gap:2,flexDirection:"column",justifyContent:"center"}}>
                        Tổng giá trị: {getTotal().toLocaleString(undefined, { minimumFractionDigits: 0 })} VND
                        <Button disabled={cartItems.length===0} onClick={()=>navigate("/DatHang")} fullWidth variant="contained">Thanh toán</Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    )
}