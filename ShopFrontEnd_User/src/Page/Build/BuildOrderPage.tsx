import Container from "@mui/material/Container";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select, Skeleton,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {useUserInfo} from "../../State/User.ts";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import {buildProduct} from "./PCBuilderPage.tsx";
import {districts} from "../../Type/Districts.ts";
import {Response} from "../../Type/Respone.ts";
import BuildItemOrderCard from "./Component/BuildItemOrderCard.tsx";
import Typography from "@mui/material/Typography";
type orderInfo = {
    receiver:string,
    phoneNumber:string,
    address:string,
    paymentMethod:number
}
export default function BuildOrderPage(){
    const userInfo=useUserInfo(state=>state.user);
    const [build,setBuild]=useState<buildProduct[]>([]);
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["build"],
        enabled:userInfo.isLogged,
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Build', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    })
    useEffect(() => {
        if(data){
            if(!checkOutCheck(data.data)){
                navigate("..")
            }
            setBuild(data.data)
        }
    }, [data]);
    const [districtInfo, setDistrictInfo] = useState({
        id:-1,
        district:"",
    });
    const [wardInfo, setwardInfo] = useState("")
    const getTotal=()=>{
        let total=0;
        build.forEach((item)=>{
            if(item.priceAfterDiscount!==0)
                total+=item.priceAfterDiscount*item.quantity;
            else
                total+=item.price*item.quantity;
        })
        return total;
    }
    const handleDistrictChange=(e:any)=>{
        setDistrictInfo({id:e.target.value,district: districts[e.target.value].name})
        setwardInfo("")
    }
    const handleWardChange=(e:any)=>{
        setwardInfo(e.target.value)
    }
    const [orderInfo,setOrderInfo]=useState<orderInfo>({
        address:"",
        paymentMethod:0,
        phoneNumber:"",
        receiver:""
    })
    const handleAddressChange=(e:any)=>{
        setOrderInfo({...orderInfo,address:e.target.value})
    }
    const handlePhoneNumberChange=(e:any)=>{
        if(e.target.value.length<11)
            setOrderInfo({...orderInfo,phoneNumber:e.target.value})
    }
    const handleReceiverChange=(e:any)=>{
        setOrderInfo({...orderInfo,receiver:e.target.value})
    }
    const handlePaymentMethodChange=(value: number) => {
        setOrderInfo({...orderInfo,paymentMethod:value})
    };
    const navigate=useNavigate();


    const [momoLoading,setMomoLoading]=useState(false)
    const ORDER=useMutation({
        mutationFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Orders/Build`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    receiver:orderInfo.receiver,
                    phoneNumber:orderInfo.phoneNumber,
                    address:`${orderInfo.address}, ${districtInfo.district}, ${wardInfo}`,
                    paymentMethod:orderInfo.paymentMethod,
                })
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                if(data.data!==""){
                    setMomoLoading(true)
                    window.location.replace(data.data)
                }
                else {
                    refetch()
                }
            }
            else {

            }
        }
    })
    const itemCheck=["MOTHERBOARD","CPU","CARD","PSU","RAM","OCUNG","CASE","MANHINH"]
    const checkOutCheck:(buildItems:buildProduct[])=>boolean=(buildItems)=>{
        if(buildItems.length===0)
            return false;

        return itemCheck.every(cat=>{
            return buildItems.some(i=>i.componentName==cat)
        })
    }

    return(
        <Container maxWidth="lg">
            {momoLoading ?
                <Grid container sx={{padding:"10px",paddingTop:"80px"}} spacing={2} >
                    <Grid size={12} sx={{textAlign:"center"}}>
                        <CircularProgress size="4rem" />
                        <Typography sx={{marginTop:"10px"}} variant="h4">
                            Chuyển đến thanh toán Momo
                        </Typography>
                    </Grid>
                </Grid>
                :
                <Grid container sx={{padding:"10px"}} spacing={2} >
                    <Grid size={{xs:12,sm:12,md:6,lg:7}}>
                        <Paper elevation={12} sx={{padding:"10px",display:"flex",gap:2,flexDirection:"column",justifyContent:"center"}}>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Quận</InputLabel>
                                        <Select
                                            value={districtInfo.id}
                                            label="Quận"
                                            onChange={handleDistrictChange}
                                        >
                                            <MenuItem value={-1} disabled>Chọn quận</MenuItem>
                                            {districts.map((item)=>
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={6}>
                                    <FormControl fullWidth>
                                        <InputLabel >Phường</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            disabled={districtInfo.id === -1}
                                            value={wardInfo}
                                            label="Phường"
                                            onChange={handleWardChange}
                                        >
                                            {districts[districtInfo.id ===-1 ? 0:districtInfo.id].ward.map((item)=>
                                                <MenuItem value={item}>{item}</MenuItem>
                                            )}

                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={12}>
                                    <TextField fullWidth value={orderInfo.address} onChange={handleAddressChange} label="Số nhà" variant="outlined" />
                                </Grid>
                                <Grid size={6}>
                                    <TextField fullWidth value={orderInfo.receiver} onChange={handleReceiverChange} label="Người nhận" variant="outlined" />
                                </Grid>
                                <Grid size={6}>
                                    <TextField value={orderInfo.phoneNumber} onChange={handlePhoneNumberChange} fullWidth label="Điện thoại" variant="outlined" />
                                </Grid>
                                <Grid sx={{display:"flex",justifyContent:"center"}} size={12}>
                                    <ToggleButtonGroup
                                        color={"primary"}
                                        value={orderInfo.paymentMethod}
                                        exclusive

                                    >
                                        <ToggleButton value={0} onClick={()=>handlePaymentMethodChange(0)} aria-label="left aligned">
                                            COD
                                        </ToggleButton>
                                        <ToggleButton value={1} onClick={()=>handlePaymentMethodChange(1)} aria-label="centered">
                                            Chuyển khoản
                                        </ToggleButton>
                                        <ToggleButton value={2} onClick={()=>handlePaymentMethodChange(2)} aria-label="right aligned">
                                            Momo
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                                <Grid size={6}>
                                    <Button  onClick={()=>navigate("/Dung-PC")} fullWidth color="error" variant="outlined">Hủy</Button>
                                </Grid>
                                <Grid size={6}>
                                    <Button loading={ORDER.isPending} onClick={()=>ORDER.mutate()} fullWidth variant="contained">Đặt hàng</Button>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6,lg:5}}>
                        <Paper elevation={12} sx={{padding:"10px",marginBottom:"10px",display:"flex",justifyContent:"center"}}>
                            {isFetching ? <Skeleton variant="rectangular"  height={30} sx={{width:"70%"}} />:
                                <>
                                    Giá trị : {getTotal()} VNĐ
                                </>
                            }
                        </Paper>
                        <Paper sx={{padding:"10px",maxHeight:"480px",overflowY:"auto"}} elevation={12}>
                            {isFetching ?
                                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                                    <Skeleton variant="rectangular"  height={150} />
                                    <Skeleton variant="rectangular"  height={150} />
                                    <Skeleton variant="rectangular"  height={150} />
                                </div>

                                :
                                <>
                                    {build.map(product=>
                                        <BuildItemOrderCard product={product}/>
                                    )}
                                </>
                            }

                        </Paper>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}