import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {ButtonGroup, Divider, Grid} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Card from "@mui/material/Card";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../../Type/Respone.ts";
import {buildProduct} from "../PCBuilderPage.tsx";
import {useNavigate} from "react-router";
import Tooltip from "@mui/material/Tooltip";

export default function BuildItemProductCard(props:{product:buildProduct,categoryId:string,componentName:string,reFetchBuild:()=>void,updateAble:boolean}) {
    const DELETE=useMutation({
        mutationFn:async (productId:string)=>{
            const response = await fetch(`https://localhost:7075/api/Build`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    productId: productId,
                    componentName:props.categoryId,
                })
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.reFetchBuild()
            }
            else {

            }
        }
    })
    const UPDATE=useMutation({
        mutationFn:async (info:{productId: string,quantity:number})=>{
            if(props.updateAble){
                const response = await fetch(`https://localhost:7075/api/Build`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(info)
                })
                return await response.json();
            }
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.reFetchBuild()
            }
            else {

            }
        }
    })
    const navigate=useNavigate()
    return(
        <>
            <Card key={props.product.productId} sx={{ display: 'flex',justifyContent:"center",marginBottom:"10px",minHeight:"193px" }} elevation={3}>
                <CardMedia
                    component="img"
                    sx={{ margin:"auto",width: 150,height:150,cursor:"pointer" }}
                    image={`https://localhost:7075/api/Products/${props.product.productId}/Thumbnail`}
                    alt={props.product.productName}
                    title={props.product.productName}
                    onClick={()=>navigate(`/SanPham/${props.product.productId}`)}
                />
                <Container sx={{ borderLeft:"1px solid black",display: 'flex', flexDirection: 'column' }}>
                    <Typography textAlign={"center"} sx={{ fontFamily:"Roboto",fontWeight:200,fontSize:"1.8em",textTransform:"uppercase",marginBottom:"5px",marginTop:"5px"}} variant={"h5"}>{props.componentName} </Typography>
                    <CardContent sx={{minWidth:"100%",paddingX:"5px"}}>
                        <Tooltip title={props.product.productName}>
                            <p className="ProductName" style={{
                                fontSize:"1.3em",cursor:"pointer",fontWeight:"200"}} onClick={()=>navigate(`/SanPham/${props.product.productId}`)}  >
                                {props.product.productName}
                            </p>
                        </Tooltip>
                        <div style={{width:"100%"}}>
                            <Container style={{width:"100%",justifyContent:"end",display:"flex",gap:2}}>
                                {props.product.isDiscount?
                                    <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                        <Typography component="div" textAlign={"center"} variant="subtitle2" sx={{textDecoration:"line-through"}}>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                        <Typography color="primary" sx={{fontSize:"1.2em",fontWeight:600}} component="div" textAlign={"center"} variant="subtitle1">{props.product.priceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                    </div>
                                    :
                                    <Typography color="primary" textAlign="start" sx={{fontSize:"1.2em",fontWeight:600}}>{props.product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
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
                            {props.updateAble &&
                                <Grid sx={{display:"flex",justifyContent:"center"}} size={11}>
                                    <ButtonGroup variant="outlined" aria-label="Basic button group">
                                        <Button loading={UPDATE.isPending} disabled={props.product.quantity===1} onClick={//@ts-ignore
                                            ()=>UPDATE.mutate({productId:props.product.productId, quantity:props.product.quantity - 1})} startIcon={<ChevronLeftIcon/>}></Button>
                                        <Button disabled>{props.product.quantity}</Button>
                                        <Button loading={UPDATE.isPending} disabled={props.product.quantity>=props.product.storageCount} onClick={//@ts-ignore
                                            ()=>UPDATE.mutate({productId:props.product.productId, quantity:props.product.quantity + 1})} endIcon={<ChevronRightIcon/>}></Button>
                                    </ButtonGroup>
                                </Grid>
                            }
                        </Grid>
                    </CardContent>
                </Container>
            </Card>
        </>
    )
}