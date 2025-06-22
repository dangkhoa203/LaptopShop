import {ProductData} from "../../Type/ProductData.ts";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

export default function ProductCard(props: {product:ProductData}){
    return(
        <Card sx={{maxWidth:150,display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"100%"}}>
            <CardMedia
                sx={{ height: 150,width:150}}
                image={`https://localhost:7075/api/Products/${props.product.id}/Thumbnail`}
                title="green iguana"
            />
            <CardContent sx={{flexGrow:2}}>
                <Typography sx={{fontSize:"0.7em"}} component="p" >
                    {props.product.name}
                </Typography>
            </CardContent>

            <CardActions sx={{flexGrow: 1,display:"flex",flexDirection:"column",maxHeight:"63px"}}>
                <Typography variant="body2" sx={{ color: 'text.secondary',flexGrow:1 }}>
                    {props.product.isDiscount? props.product.priceAfterDiscount : props.product.price}
                </Typography>
                <Button fullWidth>Thêm vào giỏ hàng</Button>
            </CardActions>
        </Card>
    )
}