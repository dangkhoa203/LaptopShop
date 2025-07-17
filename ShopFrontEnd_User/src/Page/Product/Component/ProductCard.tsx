import {ProductData} from "../../../Type/ProductData.ts";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {Rating, Stack} from "@mui/material";
import {useCart} from "../../../State/Cart.ts";
import {useUserInfo} from "../../../State/User.ts";
import {useAppError} from "../../../State/AppErrorState.ts";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../../Type/Respone.ts";
import Tooltip from "@mui/material/Tooltip";
import {useNavigate} from "react-router";
import {useAppNotify} from "../../../State/AppGlobalNotifyState.ts";
export default function ProductCard(props: {product:ProductData}){
    const reFetch=useCart((state)=>state.reFetch)
    const userInfo=useUserInfo(state => state.user)
    const globalError=useAppError()
    const globalNotify=useAppNotify()
    const {mutate}=useMutation({
        mutationFn:async (id:string)=>{
            const response = await fetch(`https://localhost:7075/api/Cart`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({productId:id})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                reFetch();
                globalNotify.setNotify("Thêm vào giỏ hàng thành công!")
            }
            else {
                globalError.setError(data.errorMessage)
            }
        }
    })
    const navigate=useNavigate()
    return(
        <Card elevation={12} className="productCard" sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"100%"}}>
            <div style={{minHeight:"300px",overflow:"hidden"}}>
                <CardMedia
                    className={"cardImg"}
                    sx={{ objectFit: "contain",cursor:"pointer" }}
                    onClick={()=>navigate(`/SanPham/${props.product.id}`)}
                    image={`https://localhost:7075/api/Products/${props.product.id}/Thumbnail`}
                    title={props.product.name}
                    component="img"
                />
            </div>

            <CardContent sx={{flexGrow:2}}>
                <Tooltip title={props.product.name}>
                    <Typography className="ProductName" sx={{
                        fontSize:"1em",cursor:"pointer"}} onClick={()=>navigate(`/SanPham/${props.product.id}`)} component="p" >
                        {props.product.name}
                    </Typography>
                </Tooltip>

            </CardContent>
            <CardActions sx={{maxHeight:"130px",display:"flex", flexDirection:"column"}}>
                <div style={{display:"flex",marginBottom:"10px",justifyContent:"start", width:"100%"}}>
                    <Rating name="read-only" value={props.product.score} readOnly precision={0.25} />
                </div>
                <Stack width="100%" sx={{minHeight:"60px",display:"flex", flexDirection:"column",justifyContent:"end"}}>
                        <Typography component="div" variant="body2" color="textSecondary" textAlign="start" sx={{fontWeight:600,textDecoration:"line-through"}}>
                            {props.product.isDiscount && props.product.price.toLocaleString(undefined, {minimumFractionDigits: 0}) + " VNĐ"}
                        </Typography>
                    <div style={{display:"flex",marginBottom:"10px"}}>
                        <Typography component="div"  color="primary" textAlign="start" sx={{fontSize:"1.2em",fontWeight:600}}>
                            {props.product.isDiscount? props.product.priceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 0 })+" VNĐ" : props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })+" VNĐ"}
                        </Typography>
                        {props.product.isDiscount &&
                            <Typography color={"textPrimary"} sx={{margin:"auto",fontWeight:700,marginLeft:"5px",fontSize:"0.85em",border:"0.5px solid orange",borderRadius:"50%",bgcolor:"#f4ce89", paddingX:"5px"}} component="div">
                                {(100-Math.floor((props.product.priceAfterDiscount/props.product.price)*100))+"%"}
                            </Typography>
                        }
                    </div>
                </Stack>
                <div style={{margin:0}}>
                    {props.product.quantity<=0 ?
                        <Button  disabled fullWidth variant={"outlined"}>Hết hàng</Button>
                        :
                        <Button  variant={"contained"} color="success" onClick={()=> {
                            if(userInfo.isLogged)
                                mutate(props.product.id)
                            else
                                globalError.setError("Chưa đăng nhập!")
                        }} fullWidth>Thêm vào giỏ hàng</Button>
                    }
                </div>

            </CardActions>
        </Card>
    )
}