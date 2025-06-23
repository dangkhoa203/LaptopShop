import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {buildProduct} from "../PCBuilderPage.tsx";


export default function BuildItemOrderCard(props:{product:buildProduct}){

    // @ts-ignore
    return(
        <Card key={props.product.productId} sx={{ display: 'flex',justifyContent:"center",marginBottom:"10px" }} elevation={3}>
            <CardMedia
                component="img"
                sx={{ margin:"auto",width: 150,height:150 }}
                image={`https://localhost:7075/api/Products/${props.product.productId}/Thumbnail`}
                alt="Live from space album cover"
            />
            <Container sx={{ borderLeft:"1px solid black" }}>
                <CardContent sx={{minWidth:"100%",paddingX:"5px",display: 'flex', flexDirection: 'column',justifyContent:"space-between",gap:6}}>
                    <Typography  variant="subtitle1">
                        {props.product.productName}
                    </Typography>
                    <div style={{width:"100%",justifyContent:"start",display:"flex",gap:2}}>
                        {props.product.isDiscount?
                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                <Typography component="div" textAlign={"center"} variant="subtitle2" sx={{textDecoration:"line-through"}}>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VND</Typography>
                                <Typography component="div" textAlign={"center"} variant="subtitle1">{props.product.priceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 0 })} VND</Typography>
                            </div>
                            :
                            <Typography>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                        }
                    </div>
                </CardContent>
            </Container>
        </Card>
    )
}
