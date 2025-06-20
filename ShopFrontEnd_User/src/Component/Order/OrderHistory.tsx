import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
    CardActionArea,
    Chip, CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider, LinearProgress,
    Paper, Tab, Tabs
} from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {OrderStatus} from "../../Type/OrderStatus.ts";
import {Response} from "../../Type/Respone.ts";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {useNavigate} from "react-router";
import {useAppError} from "../../State/AppErrorState.ts";
type orderData={
    id:string,
    orderDate:string,
    status:number,
    value:number,
    detailId:string[],
    isMomoPaid:boolean,
    paymentMethod:number
}
export default function OrderHistory(){
    const [value, setValue] = useState(0);

    // @ts-ignore
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [orders,setOrders]=useState<orderData[]>([])
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["orders"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
                const response = await fetch('https://localhost:7075/api/Orders', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method:"GET"
                });
                const content = await response.json();
                return(content);
        },
    })
    useEffect(() => {
        if(data){
            setOrders(data.data)
        }
    }, [data]);

    const [openCancel, setOpenCancel] = useState(false);
    const [cancelModel,setCancelModel]=useState<string>("")
    const [globalError,setGlobalError]=useState<string>("")
    const handleClickOpenCancel =(id:string) => {
        setCancelModel(id)
        setOpenCancel(true);
    };

    const handleCloseCancel = () => {
        setGlobalError("")
        setCancelModel("")
        setOpenCancel(false);
    };
    const CANCEL=useMutation({
        mutationFn:async (id:string)=>{
            const response = await fetch(`https://localhost:7075/api/Orders/Cancel`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({id:id})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                refetch()
                handleCloseCancel()
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    const [momoLoading,setMomoLoading]=useState(false)
    // @ts-ignore
    return(
        <Container>
            {momoLoading ?
                <>
                    <CircularProgress size="4rem" />
                    <Typography sx={{marginTop:"10px"}} variant="h4">
                        Chuyển đến thanh toán Momo
                    </Typography>
                </>
                :
                <>
                    <Tabs
                        centered
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        allowScrollButtonsMobile
                    >
                        <Tab label="Tất cả" />
                        <Tab label="Chờ xác nhận" />
                        <Tab label="Chuẩn bị" />
                        <Tab label="Giao hàng" />
                        <Tab label="Hoàn thành" />
                        <Tab label="Đã hủy" />
                    </Tabs>
                    <Divider sx={{marginBottom:"10px"}}/>
                    {isFetching && <LinearProgress />}
                    {value===0 &&
                        <ListRender momoLoading={momoLoading} setMomoLoading={setMomoLoading} isFetching={isFetching} orders={orders} openCancel={handleClickOpenCancel}/>
                    }
                    {value===1 &&
                        <ListRender momoLoading={momoLoading} setMomoLoading={setMomoLoading} isFetching={isFetching} orders={orders.filter(order=>order.status===1)} openCancel={handleClickOpenCancel}/>
                    }
                    {value===2 &&
                        <ListRender momoLoading={momoLoading} setMomoLoading={setMomoLoading} isFetching={isFetching} orders={orders.filter(order=>(order.status===2 || order.status===3))} openCancel={handleClickOpenCancel}/>
                    }
                    {value===3 &&
                        <ListRender momoLoading={momoLoading} setMomoLoading={setMomoLoading} isFetching={isFetching} orders={orders.filter(order=>order.status===4)} openCancel={handleClickOpenCancel}/>
                    }
                    {value===4 &&
                        <ListRender momoLoading={momoLoading} setMomoLoading={setMomoLoading} isFetching={isFetching} orders={orders.filter(order=>order.status===5)} openCancel={handleClickOpenCancel}/>
                    }
                    {value===5 &&
                        <ListRender momoLoading={momoLoading} setMomoLoading={setMomoLoading} isFetching={isFetching} orders={orders.filter(order=>order.status===0)} openCancel={handleClickOpenCancel}/>
                    }

                    <Dialog
                        open={openCancel}
                        onClose={handleCloseCancel}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle >
                            Hủy đơn {cancelModel}
                        </DialogTitle>
                        <IconButton
                            color="warning"
                            onClick={handleCloseCancel}
                            sx={(theme) => ({
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: theme.palette.grey[500],
                            })}
                        >
                            <CloseIcon color="warning" />
                        </IconButton>
                        <DialogContent >
                            <DialogContentText >
                                <Typography>
                                    Bạn có muốn hủy đơn hàng?
                                </Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{minHeight:"55px"}}>
                            {CANCEL.isPending?
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                                :
                                <>
                                    <div style={{color:"red"}}>
                                        {globalError}
                                    </div>
                                    <Button variant="contained" fullWidth color="warning" onClick={()=> {
                                        CANCEL.mutate(cancelModel)
                                    }} autoFocus
                                    >
                                        Hủy
                                    </Button>
                                </>

                            }

                        </DialogActions>
                    </Dialog>
                </>
            }
        </Container>
    )
}
const chipColor=(status:number):string=>{
    switch (status){
        case 0:
            return "error";
        case 1:
            return "secondary";
        case 2:
            return "secondary";
        case 3:
            return "primary";
        case 4:
            return "primary";
        case 5:
            return "success";
        default:
            return "error";
    }
}
function ListRender(props:{orders:orderData[],openCancel:(id:string)=>void,isFetching:boolean,momoLoading:boolean,setMomoLoading:(value:boolean)=>void}) {
    const navigate=useNavigate()
    const error=useAppError()
    const NEWTRANSACTION=useMutation({
        mutationFn:async (id:string)=>{
            const response = await fetch(`https://localhost:7075/api/Orders/Momo`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({orderId:id})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                if(data.data!==""){
                    props.setMomoLoading(true)
                    window.location.replace(data.data)
                }
                else {
                    error.setError(data.errorMessage)
                }
            }

        }
    })
    return(
        <>
            {(props.orders.length===0 && !props.isFetching)  &&
                <Typography textAlign={"center"} color="textSecondary">Không có dữ liệu</Typography>
            }
            {props.orders.map((order)=>(
                <Card key={order.id} elevation={12} sx={{ minWidth: 275,marginBottom:"10px" }}>
                    <CardActionArea onClick={()=>navigate(order.id)}>
                        <CardContent>
                            <div style={{display:"flex",gap:2,justifyContent:"space-between"}}>
                                <Typography variant="h4" color="textPrimary">
                                    Đơn {order.id}
                                </Typography>
                                <div style={{display:"flex",gap:1}}>
                                    {(order.isMomoPaid && (order.status!==0 && order.status!==5)) &&
                                        <Chip
                                            color={
                                                "success"
                                            } label={"Đã thanh toán Momo"} size="small" />
                                    }
                                    <Chip
                                        // @ts-ignore
                                        color={
                                            chipColor(order.status)
                                        } label={OrderStatus[order.status]} size="small" />
                                </div>

                            </div>
                            <Typography variant="h6" color="textSecondary">
                                {new Date(order.orderDate).toLocaleString('En-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit' })}
                            </Typography>
                            <div style={{display:"flex"}}>
                                {order.detailId.map(item=>
                                    <>
                                        <div style={{display:"flex",padding:"5px",width:100,height:100}} >
                                            <Paper sx={{margin:"auto",padding:"0",width:100,height:100}} elevation={6}>
                                                <img style={{border:"1px solid black"}} src={`https://localhost:7075/api/Products/${item}/Thumbnail`} width={100} height={100}/>
                                            </Paper>
                                        </div>
                                    </>

                                )}
                            </div>
                            <Typography sx={{marginTop:"10px"}} variant="h5" component="div">
                                Giá trị: {order.value.toLocaleString(undefined, { minimumFractionDigits: 0 })} VNĐ
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Divider/>
                    <CardActions sx={{display:"flex",justifyContent:"end",gap:1}}>
                        {(order.status===1||order.status===2)&&
                            <Button onClick={()=>props.openCancel(order.id)} variant="outlined" color="error">
                                Hủy
                            </Button>
                        }
                        <Button onClick={()=>navigate(order.id)} variant="contained" color="primary">
                            Xem chi tiết
                        </Button>
                        {(order.paymentMethod===2 && order.status!==0 && order.status!==5) &&
                            <>
                            {!order.isMomoPaid &&
                                <Button variant="contained" loading={NEWTRANSACTION.isPending || props.momoLoading} onClick={()=>NEWTRANSACTION.mutate(order.id)} sx={{width:"151px"}} color="success">
                                    Thanh toán
                                </Button>
                            }
                            </>
                        }
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

