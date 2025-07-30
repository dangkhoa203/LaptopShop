import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Navigate, useNavigate, useParams} from "react-router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Breadcrumbs, Card, CardContent, CardMedia, Grid, Paper, Link, Skeleton} from "@mui/material";
import Divider from "@mui/material/Divider";
import {PaymentMethods} from "../../Type/PaymentMethod.ts";
import {OrderStatus} from "../../Type/OrderStatus.ts";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReviewDialog from "../Review/Component/ReviewDialog.tsx";
import Tooltip from "@mui/material/Tooltip";
import {useUserInfo} from "../../State/User.ts";
import {useAppError} from "../../State/AppErrorState.ts";
import NotFoundPage_Order from "../CommonPage/NotFoundPage_Order.tsx";
type orderDetail={
    id:string,
    dateOfOrder:string,
    paymentMethod:number,
    status:number,
    noteFromOrder:string,
    value:number,
    deliveryInfo:{
        receiver:string,
        phoneNumber:string,
        address:string,
    }
    details:{
        id:string,
        name:string,
        price:number,
        quantity:number,
        reviewAble:boolean
    }[],
    discountCode:{
        id:string,
        name:string,
        percent:number,
    }
}
export default function OrderDetail(){
    const {id} = useParams() as {id:string};
    const [success, setSuccess] = useState(false);
    const [orderDetail, setOrderDetail] = useState<orderDetail>(
        {
            id:'',
            dateOfOrder:'',
            paymentMethod:0,
            status:0,
            noteFromOrder:"",
            value:0,
            deliveryInfo:{
                address:"",
                phoneNumber:"",
                receiver:""
            },
            details:[],
            discountCode:{
                id:"",
                name:"",
                percent:0
            }
        }
    );
    const globalError=useAppError();
    const [notFound, setNotFounded]=useState(false);
    const {data,isFetching,refetch}=useQuery({
        queryKey:[`Order_${id}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Orders/${id}`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            if(data?.success){
                setSuccess(data.success)
                setOrderDetail(data.data);
            }else {
                if(data.notFound){
                    setNotFounded(true);
                }else {
                    globalError.setError(data.errorMessage)
                }
            }


        }
    }, [data]);
    useEffect(()=>{
        document.title=orderDetail.id==="" ? "Đơn hàng":orderDetail.id
    },[orderDetail]);
    const [product, setProduct] = useState({
        id:"",
        name:"",
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = (productName:string,productId:string) => {
        setProduct({name: productName,id:productId});
        setOpen(true);
    };

    const handleClose = () => {
        setProduct({name: "",id:""});
        setOpen(false);
    };

    const navigate=useNavigate();
    const originalPrice=orderDetail.discountCode.id!=="" ? (orderDetail.value/(100-orderDetail.discountCode.percent))*100 :0
    const userInfo=useUserInfo(state=>state.user);
    if((!userInfo.isLogged) && userInfo.userName!=='default'){
        return <Navigate to={"/"}></Navigate>
    }
    if(notFound){
        return <NotFoundPage_Order/>
    }
    // @ts-ignore
    return(
        <Container maxWidth="lg" sx={{paddingTop:"5px",display:"flex",flexDirection:"column"}}>
            {success ?
                <>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link sx={{cursor:"pointer"}} underline="hover" color="inherit" onClick={()=>navigate("/DonHang")}>
                            Đơn hàng
                        </Link>
                        <Link
                            underline={"none"}
                            color="text.primary"
                            aria-current="page"
                        >
                            Chi tiết đơn hàng
                        </Link>
                    </Breadcrumbs>
                    {isFetching ?
                        <>
                            <Grid sx={{marginY:"10px",display:"flex",justifyContent:"center"}} container spacing={2}>
                                <Grid size={12}>
                                    <Skeleton variant="rectangular" height={210}  />
                                </Grid>
                            </Grid>
                            <Divider/>

                            <Grid sx={{marginY:"10px",display:"flex",justifyContent:"center"}} container spacing={2}>
                                <Grid size={12}>
                                    <Skeleton variant="rectangular" height={150}  />
                                </Grid>
                                <Grid size={12}>
                                    <Divider/>
                                </Grid>

                                <Grid size={12}>
                                    <Skeleton variant="rectangular" height={240}  />
                                </Grid>
                            </Grid>

                        </>
                        :
                        <>
                            <Grid sx={{marginY:"10px",display:"flex",justifyContent:"center"}} container spacing={2}>

                                <Grid size={3}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        ID đơn hàng
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {orderDetail.id}
                                    </Typography>
                                </Grid>
                                <Grid size={3}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Ngày đặt
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {new Date(orderDetail.dateOfOrder).toLocaleString('En-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit' })}
                                    </Typography>
                                </Grid>
                                <Grid size={3}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Phương thức thanh toán
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {PaymentMethods[orderDetail.paymentMethod]}
                                    </Typography>
                                </Grid>
                                <Grid size={3}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Trạng thái
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {OrderStatus[orderDetail.status]}
                                    </Typography>
                                </Grid>
                                {orderDetail.noteFromOrder!=="" &&
                                    <Grid size={12}>
                                        <Typography textAlign="center" variant="h5" color="textPrimary">
                                            Ghi Chú
                                        </Typography>
                                        <Typography component="pre" textAlign="center" variant="body1" color="textSecondary">
                                            {orderDetail.noteFromOrder}
                                        </Typography>
                                    </Grid>
                                }
                            </Grid>
                            <Divider/>

                            <Grid sx={{marginY:"10px",display:"flex",justifyContent:"center"}} container spacing={2}>
                                <Grid size={6}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Người nhận đơn hàng
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {orderDetail.deliveryInfo.receiver}
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Số điện thoại
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {orderDetail.deliveryInfo.phoneNumber}
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Địa chỉ
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {orderDetail.deliveryInfo.address}
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Divider/>
                                </Grid>

                                <Grid size={12} style={{margin:"10px 0px"}}>
                                    <Typography  textAlign="center" variant="h5" color="textPrimary">
                                        Chi tiết
                                    </Typography>
                                    <Paper sx={{marginY:"10px",padding:"10px",maxHeight:"400px",overflowY:"auto"}} elevation={12}>

                                        {orderDetail.details.map(detail =>
                                            <Card  sx={{border:"1px solid rgba(9,8,8,0.2)",display: 'flex',justifyContent:"center",marginBottom:"10px" }} elevation={3}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ margin:"auto",objectFit: "contain",width: 200,height:200,cursor:"pointer" }}
                                                    image={`https://localhost:7075/api/Products/${detail.id}/Thumbnail`}
                                                    onClick={()=>navigate(`/SanPham/${detail.id}`)}
                                                    title={detail.name}

                                                />
                                                <Container sx={{ borderLeft:"1px solid black",display: 'flex', flexDirection: 'column' }}>
                                                    <CardContent sx={{minWidth:"100%",paddingX:"5px"}}>
                                                        <Tooltip title={detail.name} placement="bottom-start">
                                                            <p className="ProductName" style={{
                                                                fontSize:"1.2em",cursor:"pointer",marginBottom:"5px"}} onClick={()=> navigate(`/SanPham/${detail.id}`)}  >
                                                                {detail.name}
                                                            </p>
                                                        </Tooltip>

                                                        <Grid container spacing={2}>
                                                            <Grid size={6}>
                                                                <Typography  variant="subtitle1" color="textSecondary">
                                                                    Giá: {detail.price.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ
                                                                </Typography>
                                                            </Grid>
                                                            <Grid size={6}>
                                                                <Typography  variant="subtitle1" color="textSecondary">
                                                                    Số lượng: {detail.quantity}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Divider/>
                                                        <Typography fontWeight={300} sx={{marginY:"10px"}}  variant="h5" color="textPrimary">
                                                            Tổng giá trị: <span style={{fontFamily:"Roboto",fontWeight:"bolder",fontSize:"1.1em",color:"rgb(237, 108, 2)"}}>{(detail.price*detail.quantity).toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ </span>
                                                        </Typography>
                                                        {detail.reviewAble &&
                                                            <Button onClick={()=>handleClickOpen(detail.name,detail.id)} variant={"outlined"} color="secondary">Review</Button>
                                                        }
                                                    </CardContent>
                                                </Container>
                                            </Card>
                                        )}
                                    </Paper>
                                </Grid>
                                <Grid size={12}>
                                    {orderDetail.discountCode.id !="" ?
                                        <>
                                            <Typography textAlign={"end"} variant={"h6"}>Giá trị gốc : {originalPrice.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                            <Typography textAlign={"end"} color="error" variant={"h6"}>- {(originalPrice-orderDetail.value).toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</Typography>
                                            <Typography textAlign={"end"} variant={"h5"}>Giá trị đơn hàng : <span style={{fontFamily:"Roboto",fontWeight:"bolder",fontSize:"1.1em",color:"rgb(237, 108, 2)"}}>{orderDetail.value.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</span></Typography>
                                        </>
                                        :
                                        <Typography textAlign={"end"} variant={"h5"}>Giá trị đơn hàng :  <span style={{fontFamily:"Roboto",fontWeight:"bolder",fontSize:"1.1em",color:"rgb(237, 108, 2)"}}>{orderDetail.value.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ</span> </Typography>
                                    }

                                </Grid>
                            </Grid>
                        </>
                    }
                </>
                :
                <Grid container spacing={2}  >
                    <Grid size={12}>
                        <Typography textAlign="center" variant="h4">Lỗi xảy ra</Typography>
                    </Grid>
                    <Grid sx={{display:"flex",justifyContent:"center"}} size={12}>
                        <Button startIcon={<ArrowBackIcon/>} variant="contained" sx={{width:"150px"}} onClick={()=>navigate(-1)}>Quay về</Button>
                    </Grid>
                </Grid>
            }
            <ReviewDialog open={open} handleClose={handleClose}  orderId={id} productName={product.name} productId={product.id} refetch={refetch}/>
        </Container>
    )
}