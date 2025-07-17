import {useMutation, useQuery} from "@tanstack/react-query";
import { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {Carousel} from "react-responsive-carousel";
import ImageViewer from 'react-simple-image-viewer';
import {Grid, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {useCart} from "../../State/Cart.ts";
import {useAppError} from "../../State/AppErrorState.ts";
import {Response} from "../../Type/Respone.ts";
import ProductReviewPreviewBox from "./Component/ProductReviewPreviewBox.tsx";
type specification={
    name: string,
    value: string,
}
type product={
    id:string,
    name: string,
    price: number,
    quantity: number,
    isDiscount: boolean,
    priceAfterDiscount: number,
    description: string,
    specifications:specification[],
    productImage: string[],
    averageScore:number,
    reviewCount:number
}
export default function ProductPage(){
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const {id} = useParams();
    const [product,setProduct]=useState<product>({
        id:"",
        description:"",
        productImage:[],
        name:"",
        isDiscount:false,
        price:0,
        specifications:[],
        priceAfterDiscount:0,
        quantity:0,
        averageScore:0,
        reviewCount:0,
    });
    const {data}=useQuery({
        queryKey: [`product_${id}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{// @ts-ignore
            const response = await fetch(`https://localhost:7075/api/Products/${id}`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET",
            });
            return await response.json()
        },
    })
    useEffect(() => {
        if(data){
            if(data?.success){
                setProduct(data.data)
                document.title=data.data.name
            }else {
                navigate("/")
            }

        }
    }, [data]);
    const openImageViewer = (index:number) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };
    const productImage = product.productImage.map(i=>`https://localhost:7075/api/Products/${id}/Images/${i}`)
    const imageList=[`https://localhost:7075/api/Products/${id}/Thumbnail`].concat(productImage);

    const reFetch=useCart((state)=>state.reFetch)
    const globalError=useAppError()
    const ADDCART=useMutation({
        mutationFn:async (request:{id:string,toCart:boolean})=>{
            const response = await fetch(`https://localhost:7075/api/Cart`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({productId:request.id})
            })
            const data=await response.json();
            return {data,toCart:request.toCart}
        },
        onSuccess:(response: { data: Response,toCart:boolean })=>{
            console.log(response)
            if(response.data.success){
                reFetch();
                if(response.toCart)
                    navigate("/DatHang")
            }
            else {
                globalError.setError(response.data.errorMessage)
            }
        }
    })
    const navigate=useNavigate()
    const [readMore, setReadMore] = useState(false);

    const toggleReadMore = () => {
        setReadMore(!readMore);
    };
    useEffect(() => {
        if(product.description.length<150)
            setReadMore(true)
        else
            setReadMore(false)
    }, [product]);

    return(
        <Grid container sx={{padding:"10px"}} spacing={1}>
            <Grid size={{xs:12,lg:7}} >
                <Paper elevation={8}>
                    <Carousel
                        showIndicators={false}
                        renderArrowPrev={(onClickHandler, hasPrev, label) =>
                            hasPrev && (
                                <IconButton size="large"  onClick={onClickHandler} title={label} sx={{
                                    position: 'absolute',
                                    zIndex: 1,
                                    top: 'calc(50% - 15px)',
                                    width: 30,
                                    height: 30,
                                    cursor: 'pointer',
                                    left: 15,

                                }} >
                                    <ArrowBackIosNewIcon color={"primary"}/>
                                </IconButton>
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext, label) =>
                            hasNext && (
                                <IconButton size="large" onClick={onClickHandler} title={label} sx={{
                                    position: 'absolute',
                                    zIndex: 1,
                                    top: 'calc(50% - 15px)',
                                    width: 30,
                                    height: 30,
                                    cursor: 'pointer',
                                    right:15
                                }} >
                                    <ArrowForwardIosIcon color={"primary"}/>
                                </IconButton>
                            )
                        }
                        showStatus={false}  infiniteLoop={true} dynamicHeight={false} showArrows={true} >

                        <Box onClick={()=>openImageViewer(0)} sx={{width: {xs:"300px",sm:"350px",md:"450px",lg:"500px"},cursor:"pointer", height:{xs:"300px",sm:"350px",md:"450px",lg:"500px"},justifyContent:"center",margin:"auto"}}>
                            <img  alt="Thumbnail" src={`https://localhost:7075/api/Products/${id}/Thumbnail`} />
                        </Box>

                        {product.productImage.map((i,index)=>
                            <Box onClick={()=>openImageViewer(index+1)} sx={{width: {xs:"300px",sm:"350px",md:"450px",lg:"500px"},cursor:"pointer", height:{xs:"300px",sm:"350px",md:"450px",lg:"500px"},justifyContent:"center",margin:"auto"}}>
                                <img  src={`https://localhost:7075/api/Products/${id}/Images/${i}`} />
                            </Box>
                        )}

                    </Carousel>
                </Paper>
            </Grid>
            <Grid sx={{marginBottom:{xs:"10px",sm:"10px",md:"10px",lg:0}}} size={{xs:12,lg:5}} >
                <Paper sx={{padding:"10px"}} elevation={8}>
                    <Grid container spacing={1}>
                        <Grid size={12}>
                            <Typography variant="h5">
                                {product.name}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body1">
                                Tình trạng: <Typography component="span" variant={"body1"} sx={{fontWeight:"bold"}} color="primary">{product.quantity===0 ? "Hết hàng":"Còn hàng"}</Typography>
                            </Typography>
                        </Grid>
                        <Grid sx={{display:"flex"}} size={12}>
                            <Rating readOnly value={product.averageScore} precision={0.5} /> <Typography> ({product.reviewCount})</Typography>
                        </Grid>
                        <Grid size={12}>
                            <div style={{display:"flex",marginBottom:"10px"}}>
                                <Typography component="div"  color="primary" textAlign="start" sx={{fontSize:"1.2em",fontWeight:600,marginRight:'5px'}}>
                                    {product.isDiscount? product.priceAfterDiscount.toLocaleString(undefined, { minimumFractionDigits: 0 })+" VNĐ" : product.price.toLocaleString(undefined, { minimumFractionDigits: 0 })+" VNĐ"}
                                </Typography>
                                {product.isDiscount &&
                                    <>
                                        <Typography component="div" variant="body2" color="textSecondary" textAlign="start" sx={{fontWeight:600,textDecoration:"line-through",marginY:"auto"}}>
                                            {product.price.toLocaleString(undefined, {minimumFractionDigits: 0}) + " VNĐ"}
                                        </Typography>
                                        <Typography color={"textPrimary"} sx={{margin:"auto",fontWeight:700,marginLeft:"5px",fontSize:"0.85em",border:"0.5px solid orange",borderRadius:"50%",bgcolor:"#f4ce89", paddingX:"5px"}} component="div">
                                            {"-"+(100-Math.floor((product.priceAfterDiscount/product.price)*100))+"%"}
                                        </Typography>
                                    </>
                                }
                            </div>
                        </Grid>
                        <Grid size={6}>
                            <Button fullWidth disabled={product.quantity<=0} loading={ADDCART.isPending} variant={"outlined"} onClick={()=>ADDCART.mutate({id:product.id,toCart:false})}>{product.quantity<=0? "Hết hàng": "Thêm vào giỏ hàng"}</Button>
                        </Grid>
                        <Grid size={6}>
                            <Button fullWidth disabled={product.quantity<=0} loading={ADDCART.isPending} variant={"contained"} onClick={()=>ADDCART.mutate({id:product.id,toCart:true})}>{product.quantity<=0? "Hết hàng": "Mua ngay"}</Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

            <Grid size={product.specifications.length===0 ? 12 :{xs:12,sm:12,md:8,lg:7}}>
                <Paper sx={{padding:"20px",maxHeight:"600px",overflowY:"auto",borderTop:"5px solid orange"}} className="containerNFT">
                    <Typography textAlign={"center"} variant={"h4"}>Mô tả sản phẩm</Typography>
                    {product.description.length===0 ?
                        <div> </div>
                        :
                        <div className={`card${readMore ? ' active' : ''}`}>
                            <div dangerouslySetInnerHTML={{ __html: product.description }} className="content">
                            </div>
                            {(product.description.length>150) &&
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button onClick={toggleReadMore}
                                            variant="text">
                                        {readMore ? 'Đóng' : 'Mở'}
                                    </Button>
                                </div>
                            }

                        </div>
                    }

                </Paper>
            </Grid>
            {product.specifications.length>0 &&
                <Grid size={{xs:12,sm:12,md:4,lg:5}}>
                    <Paper sx={{paddingX:"10px",paddingY:"10px",borderTop:"5px solid orange"}}>
                        <Typography textAlign={"center"}  variant={"h4"}>Thông số</Typography>
                        <TableContainer  sx={{marginTop:"10px"}} >
                            <Table  aria-label="simple table">
                                <TableBody>
                                    {product.specifications.map(s=>
                                        <TableRow
                                            key={s.name}
                                            sx={{ ' td,  th': { border: 1 } }}
                                        >
                                            <TableCell sx={{fontSize:"1.1em"}} component="th" scope="row">
                                                {s.name}
                                            </TableCell>
                                            <TableCell align="right">{s.value}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            }

            <Grid size={12}>
               <ProductReviewPreviewBox id={id}/>
            </Grid>
            {isViewerOpen && (
                <ImageViewer
                    src={imageList}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                        zIndex:4,
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            )}

        </Grid>
    )
}