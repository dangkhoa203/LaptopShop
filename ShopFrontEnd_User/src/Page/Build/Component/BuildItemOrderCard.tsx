import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {buildProduct} from "../PCBuilderPage.tsx";
import {useNavigate} from "react-router";
import Tooltip from "@mui/material/Tooltip";


export default function BuildItemOrderCard(props:{product:buildProduct}){
    const navigate=useNavigate()
    // @ts-ignore
    return(
        <Card key={props.product.productId} sx={{ display: 'flex',justifyContent:"center",marginBottom:"10px" }} elevation={3}>
            <CardMedia
                component="img"
                sx={{ margin:"auto",width: 150,height:150,cursor:"pointer" }}
                image={`https://localhost:7075/api/Products/${props.product.productId}/Thumbnail`}
                alt={props.product.productName}
                title={props.product.productName}
                onClick={()=>navigate(`/SanPham/${props.product.productId}`)}
            />
            <Container sx={{ borderLeft:"1px solid black" }}>
                <CardContent sx={{minWidth:"100%",paddingX:"5px",display: 'flex', flexDirection: 'column',justifyContent:"space-between",gap:1}}>
                    <Tooltip title={props.product.productName}>
                        <p style={{cursor:"pointer",fontSize:"0.9em",marginBottom:"5px"}} onClick={()=>navigate(`/SanPham/${props.product.productId}`)} className="ProductName">
                            {props.product.productName}
                        </p>
                    </Tooltip>
                    <div style={{width:"100%",justifyContent:"end",display:"flex",gap:2}}>
                        {props.product.priceAfterDiscount===0?
                            <Typography color="primary" sx={{fontWeight:700}} variant="subtitle1" textAlign={"end"}>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                            :
                            <div style={{display:"flex", flexDirection:"column",justifyContent:"end"}}>
                                <Typography variant="subtitle2" sx={{textDecoration:"line-through",fontWeight:400}} textAlign={"end"}>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                <Typography color="primary" sx={{fontWeight:700}} variant="subtitle1" textAlign={"end"}>{props.product.priceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                            </div>
                        }

                    </div>
                    <div>
                        Số lượng: <span style={{fontWeight:"bolder",fontFamily:"Manrope",fontSize:"1.1em",color:"rgb(237, 108, 2)"}}>{props.product.quantity}</span>
                    </div>
                </CardContent>
            </Container>
        </Card>
    )
}
