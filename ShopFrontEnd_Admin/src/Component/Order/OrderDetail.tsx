import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Card, CardContent, CardMedia, Grid, LinearProgress, Paper} from "@mui/material";
import Divider from "@mui/material/Divider";
import {PaymentMethods} from "../../Type/PaymentMethod.ts";
import {OrderStatus} from "../../Type/OrderStatus.ts";
import UpdateStatusDialog from "./UpdateStatusDialog.tsx";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
type orderDetail={
    id:string,
    dateOfOrder:string,
    paymentMethod:number,
    status:number,
    noteFromOrder:string,
    user:{
        id:string,
        email:string,
        userName:string,
    }
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
    }[]
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
            user:{
                id:"",
                email:"",
                userName:""
            },
            deliveryInfo:{
                address:"",
                phoneNumber:"",
                receiver:""
            },
            details:[]
        }
    );
    const {data,isPending,refetch}=useQuery({
        queryKey:[`Order_${id}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Orders/${id}`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(data){
            setSuccess(data.success)
            setOrderDetail(data.data);
        }
    }, [data]);

    const [openUpdate, setOpenUpdate] = useState(false);

    const handleClickOpenUpdate =() => {
        setOpenUpdate(true);
    };

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };
    const navigate=useNavigate();
    // @ts-ignore
    return(
        <Container maxWidth="lg" sx={{paddingTop:"5px",display:"flex",flexDirection:"column"}}>
            {isPending ?
                <div style={{height:"400px",display:"flex",justifyContent:"center",alignContent:"center",flexDirection:"column"}}>
                    <LinearProgress />
                </div>

                :
                <>
                    {success ?
                        <>
                            <Button startIcon={<ArrowBackIcon/>} sx={{width:"150px"}} onClick={()=>navigate(-1)}>Quay về</Button>
                            <Typography variant="h3" color="textPrimary" textAlign="center">
                                Chi tiết hóa đơn
                            </Typography>
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
                                    <Grid size={6}>
                                        <Typography textAlign="center" variant="h5" color="textPrimary">
                                            Ghi Chú
                                        </Typography>
                                        <Typography textAlign="center" variant="body1" color="textSecondary">
                                            {orderDetail.noteFromOrder}
                                        </Typography>
                                    </Grid>
                                }
                                <Grid size={12}>
                                    <Button fullWidth color="warning" variant="contained" onClick={handleClickOpenUpdate}>Sửa trạng thái</Button>
                                </Grid>
                            </Grid>

                            <Divider/>

                            <Grid sx={{marginY:"10px",display:"flex",justifyContent:"center"}} container spacing={2}>
                                <Grid size={6}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Người dùng
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {orderDetail.user.userName}
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography textAlign="center" variant="h5" color="textPrimary">
                                        Email người dùng
                                    </Typography>
                                    <Typography textAlign="center" variant="h6" color="textSecondary">
                                        {orderDetail.user.email}
                                    </Typography>
                                </Grid>
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
                            </Grid>
                            <Divider/>
                            <div style={{margin:"10px 0px"}}>
                                <Typography  textAlign="center" variant="h5" color="textPrimary">
                                    Chi tiết
                                </Typography>
                                <Paper sx={{marginY:"10px",padding:"10px",maxHeight:"400px",overflowY:"auto"}} elevation={12}>

                                    {orderDetail.details.map(detail =>
                                        <Card  sx={{border:"1px solid rgba(9,8,8,0.2)",display: 'flex',justifyContent:"center",marginBottom:"10px" }} elevation={3}>
                                            <CardMedia
                                                component="img"
                                                sx={{ margin:"auto",width: 150,height:150 }}
                                                image={`https://localhost:7075/api/Products/${detail.id}/Thumbnail`}
                                                alt="Live from space album cover"
                                            />
                                            <Container sx={{ borderLeft:"1px solid black",display: 'flex', flexDirection: 'column' }}>
                                                <CardContent sx={{minWidth:"100%",paddingX:"5px"}}>
                                                    <Typography  variant="h6">
                                                        {detail.name}
                                                    </Typography>
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
                                                    <Typography sx={{marginTop:"10px"}}  variant="h5" color="textPrimary">
                                                        Tổng giá trị: {(detail.price*detail.quantity).toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ
                                                    </Typography>


                                                </CardContent>
                                            </Container>
                                        </Card>
                                    )}
                                </Paper>
                            </div>
                            <UpdateStatusDialog id={id} status={orderDetail.status} open={openUpdate} handleClose={handleCloseUpdate} reFetch={refetch}/>
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
                </>
            }
        </Container>
    )
}