import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {ButtonGroup, Divider, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Card from "@mui/material/Card";
import {cartItem} from "../../Type/CartItem.ts";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import {useCart} from "../../State/Cart.ts";

export default function CartProductCard(props:{product:cartItem}){
    const reFetch=useCart(state => state.reFetch)
    const DELETE=useMutation({
        mutationFn:async (id:string)=>{
            const response = await fetch(`https://localhost:7075/api/Cart`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({productId:id})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                reFetch()
            }
            else {

            }
        }
    })
    const UPDATE=useMutation({
        mutationFn:async (info:{productId: string,quantity:number})=>{
            const response = await fetch(`https://localhost:7075/api/Cart`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(info)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                reFetch()
            }
            else {

            }
        }
    })
    // @ts-ignore
    return(
        <Card key={props.product.productId} sx={{ display: 'flex',justifyContent:"center",marginBottom:"10px" }} elevation={3}>
            <CardMedia
                component="img"
                sx={{ margin:"auto",width: 150,height:150 }}
                image={`https://localhost:7075/api/Products/${props.product.productId}/Thumbnail`}
                alt="Live from space album cover"
            />
            <Container sx={{ borderLeft:"1px solid black",display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{minWidth:"100%",paddingX:"5px"}}>
                    <Typography  variant="h6">
                        {props.product.productName}
                    </Typography>
                    <div style={{width:"100%"}}>
                        <Container style={{width:"100%",justifyContent:"end",display:"flex",gap:2}}>
                            {props.product.priceAfterDiscount===0?
                                <Typography>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                :
                                <>
                                    <Typography variant="subtitle1">{props.product.priceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                    <Typography variant="subtitle2" sx={{textDecoration:"line-through"}}>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                </>
                            }
                        </Container>
                    </div>

                    <Divider/>
                    <Grid sx={{marginTop:"10px"}} container spacing={3}>
                        <Grid size={1}>
                            <IconButton loading={DELETE.isPending} onClick={()=>DELETE.mutate(props.product.productId)} >
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                        <Grid sx={{display:"flex",justifyContent:"center"}} size={11}>
                            <ButtonGroup variant="outlined" aria-label="Basic button group">
                                <Button loading={UPDATE.isPending} disabled={props.product.quantity===1} onClick={//@ts-ignore
                                     ()=>UPDATE.mutate({productId:props.product.productId, quantity:props.product.quantity - 1})} startIcon={<ChevronLeftIcon/>}></Button>
                                <Button disabled>{props.product.quantity}</Button>
                                <Button loading={UPDATE.isPending} disabled={props.product.quantity>=props.product.storageCount} onClick={//@ts-ignore
                                    ()=>UPDATE.mutate({productId:props.product.productId, quantity:props.product.quantity + 1})} endIcon={<ChevronRightIcon/>}></Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </CardContent>
            </Container>
        </Card>
    )
}
