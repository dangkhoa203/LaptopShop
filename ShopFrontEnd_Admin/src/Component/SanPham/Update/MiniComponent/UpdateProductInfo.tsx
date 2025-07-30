import {useMutation, useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField, ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {NumericFormat} from "react-number-format";
import Button from "@mui/material/Button";
import {Response} from "../../../../Type/Respone.ts";
type productInfo={
    name:string,
    price:number,
    quantity:number,
    isDiscount:boolean,
    priceAfterDiscount:number,
    status:number,
    brandId:string,
}
type productValidateError={
    price:string,
    priceAfterDiscount:string,
    quantity:string,
    name:string,
    brandId:string,
}
type brandData={
    id:string,
    name:string,
}
export default function UpdateProductInfo(props:{id:string,notFound:boolean,setNotFound:(value:any)=>void}){
    const [oldInfo,setOldInfo]=useState<productInfo>({
        name:"",
        brandId:"",
        quantity:0,
        isDiscount:false,
        status:0,
        price:0,
        priceAfterDiscount:0
    })
    const [newInfo,setNewInfo]=useState<productInfo>({
        name:"",
        brandId:"",
        quantity:0,
        isDiscount:false,
        status:0,
        price:0,
        priceAfterDiscount:0
    })
    const [globalError, setGlobalError] = useState<string>();
    const [validateError, setValidateError] = useState<productValidateError>({
        price:"",
        priceAfterDiscount:"",
        quantity:"",
        name:"",
        brandId:"",
    });
    const [success,setSuccess]=useState(false)
    const [brandSuccess,setBrandSuccess]=useState(false)
    const [brands,setBrands]=useState<brandData[]>([])
    const brand=useQuery({
        queryKey:["brand_list"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            setSuccess(false)
            const response = await fetch('https://localhost:7075/api/Admin/Brands', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });
    useEffect(() => {
        if(brand.data){
            setBrandSuccess(brand.data.success)
            setBrands(brand.data.data)
        }
    }, [brand.data]);

    const info=useQuery({
        queryKey:[`product_info_${props.id}`],
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Info`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            return await response.json();
        },
    });

    useEffect(() => {
        if(info.data){
            if (info.data?.success) {
                setSuccess(info.data.success)
                setOldInfo(info.data.data)
                document.title=info.data.data.name
            } else {
                if (info.data.notFound) {
                    props.setNotFound(true);
                } else { /* empty */ }
            }
        }
    }, [info.data]);
    useEffect(()=>{
        setNewInfo(oldInfo)
    },[oldInfo])

    const handleNameChange=(e:any)=>{
        setNewInfo({...newInfo,name:e.target.value});
    }

    const handleQuantityChange=(e:any)=>{
       setNewInfo({...newInfo,quantity:e.target.value});
    }
    const handleBrandIdChange=(e:any)=>{
       setNewInfo({...newInfo,brandId:e.target.value});
    }
    const handleIsDiscountChange=(e:any)=>{
       setNewInfo({...newInfo,isDiscount:e.target.checked});
    }

    // @ts-ignore
    const handleStatusChange=(event: React.MouseEvent<HTMLElement>,
                              value: number,
    ) => {
       setNewInfo({...newInfo,status:value});
    };
    const [isEdit,setIsEdits]=useState(false)
    const getBrandName=(id:string)=>{
        if(brands.length===0){
            return 1;
        }
        const brand=brands.find((i)=>i.id==id);
        // @ts-ignore
        return brand.name;
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Products/${props.id}/Info`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(newInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setGlobalError("")
                setValidateError({
                    price:"",
                    priceAfterDiscount:"",
                    quantity:"",
                    name:"",
                    brandId:"",})
                setIsEdits(false)
                info.refetch()
            }
            else {
                setGlobalError(data.errorMessage)
                if(!data.validationError.isValid){
                    const list:any[]=data.validationError.errors
                    const error={
                        price:"",
                        priceAfterDiscount:"",
                        quantity:"",
                        name:"",
                        brandId:"",
                    }
                    list.forEach(element=>{
                        if(element.propertyName==="Price")
                            error.price=element.errorMessage
                        if(element.propertyName==="priceAfterDiscount")
                            error.priceAfterDiscount=element.errorMessage
                        if(element.propertyName==="Quantity")
                            error.quantity=element.errorMessage
                        if(element.propertyName==="Name")
                            error.name=element.errorMessage
                        if(element.propertyName==="BrandId")
                            error.brandId=element.errorMessage
                    })
                    setValidateError(error)
                }
            }
        }
    })

    // @ts-ignore
    return(
        <>
            {isEdit ?
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <TextField
                            fullWidth
                            color="warning"
                            label="Tên"
                            variant="filled"
                            value={newInfo.name}
                            onChange={handleNameChange}
                            error={validateError.name.length>0}
                            helperText={validateError.name}
                        />
                    </Grid>
                    <Grid size={6}>
                        <NumericFormat
                            color="warning"
                            isAllowed={(values) => {
                                const { floatValue } = values;
                                // @ts-ignore
                                return floatValue >0;
                            }}
                            value={newInfo.price}
                            onValueChange={(values) => {
                                // @ts-ignore
                                setNewInfo({...newInfo,price:values.floatValue});
                            }}
                            error={validateError.price.length>0}
                            helperText={validateError.price}
                            suffix={" VNĐ"}
                            thousandSeparator
                            customInput={TextField}
                            fullWidth
                            label="Giá"
                            variant="filled"
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            color="warning"
                            fullWidth
                            label="Số lượng"
                            type="number"
                            variant="filled"
                            value={newInfo.quantity}
                            onChange={handleQuantityChange}
                            error={validateError.quantity.length>0}
                            helperText={validateError.quantity}
                        />
                    </Grid>
                    <Grid size={6}>
                        {brandSuccess?
                            <FormControl color="warning"  error={validateError.brandId.length>0}
                                         variant="filled" fullWidth>
                                <InputLabel >Hãng</InputLabel>
                                <Select
                                    color="warning"
                                    value={newInfo.brandId}
                                    onChange={handleBrandIdChange}
                                >
                                    <MenuItem value="0" disabled>Chọn hãng</MenuItem>
                                    {brands.map((item) => (
                                        <MenuItem color="warning" value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>
                                    {validateError.brandId}
                                </FormHelperText>
                            </FormControl>
                            :
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <Button onClick={()=>brand.refetch()} variant="contained">Load lại</Button>
                            </div>
                        }

                    </Grid>
                    <Grid size={6}>
                        <Switch color={"warning"} checked={newInfo.isDiscount} onChange={handleIsDiscountChange} value={newInfo.isDiscount}/> Giảm
                    </Grid>
                    <Grid size={6}>
                        <NumericFormat
                            isAllowed={(values) => {
                                const { floatValue } = values;
                                // @ts-ignore
                                return floatValue >0;
                            }}
                            disabled={!newInfo.isDiscount}
                            fullWidth
                            label="Giá sau giảm"
                            variant="filled"
                            value={newInfo.priceAfterDiscount}
                            onValueChange={(values) => {
                                // @ts-ignore
                                setNewInfo({...newInfo,priceAfterDiscount:values.floatValue});
                            }}
                            error={validateError.priceAfterDiscount.length>0}
                            helperText={validateError.priceAfterDiscount}
                            suffix={" VNĐ"}
                            thousandSeparator
                            customInput={TextField}
                            color="warning"
                        />
                    </Grid>
                    <Grid size={12} sx={{display:"flex",justifyContent:"center"}}>
                        <ToggleButtonGroup
                            color="warning"
                            value={newInfo.status}
                            exclusive
                            onChange={handleStatusChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value={0}>Đang bán</ToggleButton>
                            <ToggleButton value={1}>Không bán</ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid size={12} sx={{display:"flex",justifyContent:"center",gap:3}} >
                        <Button loading={isPending} loadingPosition={"end"} variant="contained" color="error" sx={{width:120}}
                            onClick={()=>{
                            setNewInfo(oldInfo)
                            setIsEdits(false)
                        }}>Hủy</Button>
                        <Button loading={isPending} loadingPosition={"end"} variant="contained" color="warning" sx={{width:120}}
                                onClick={()=>mutate()}>Sửa</Button>
                    </Grid>
                </Grid>
                :

                <>
                    {success?
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Tên"
                                    variant="filled"
                                    value={oldInfo.name}
                                    disabled
                                />
                            </Grid>
                            <Grid size={6}>
                                <NumericFormat
                                    value={oldInfo.price}
                                    suffix={" VNĐ"}
                                    thousandSeparator
                                    customInput={TextField}
                                    fullWidth
                                    label="Giá"
                                    variant="filled"
                                    disabled
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Số lượng"
                                    type="number"
                                    variant="filled"
                                    value={oldInfo.quantity}
                                    disabled
                                />
                            </Grid>
                            <Grid size={6}>
                                <TextField
                                    fullWidth
                                    label="Hãng"
                                    variant="filled"
                                    value={brand.isPending? "Load": getBrandName(oldInfo.brandId)}
                                    disabled
                                />
                            </Grid>
                            <Grid size={6}>
                                <Switch checked={newInfo.isDiscount} color="default" disabled value={oldInfo.isDiscount}/> Giảm
                            </Grid>
                            <Grid size={6}>
                                <NumericFormat
                                    disabled
                                    fullWidth
                                    label="Giá sau giảm"
                                    variant="filled"
                                    value={oldInfo.priceAfterDiscount}
                                    suffix={" VNĐ"}
                                    thousandSeparator
                                    customInput={TextField}
                                />
                            </Grid>
                            <Grid size={12} sx={{display:"flex",justifyContent:"center"}}>
                                <ToggleButtonGroup
                                    color="standard"
                                    value={oldInfo.status}
                                    exclusive
                                    disabled
                                    aria-label="Platform"
                                >
                                    <ToggleButton value={0}>Đang bán</ToggleButton>
                                    <ToggleButton value={1}>Không bán</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid size={12} sx={{display:"flex",justifyContent:"center"}}>
                                <Button sx={{width:120}} onClick={()=>setIsEdits(true)} variant="contained" color="warning">Sửa</Button>
                            </Grid>
                        </Grid>
                        :
                        <div>
                            <h3 style={{textAlign:"center",color:"red"}}>{globalError}</h3>
                            <div style={{display:"flex",justifyContent:"center"}}>
                                <Button onClick={()=>info.refetch()} variant="contained" color="warning" sx={{width:120}}>Load lại</Button>
                            </div>
                        </div>
                         }

                </> }
        </>
    )
}