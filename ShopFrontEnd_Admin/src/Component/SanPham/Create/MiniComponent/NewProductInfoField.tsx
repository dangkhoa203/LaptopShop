import {productInfo} from "../../../../Type/productInfo.ts";
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
import {productValidationError} from "../CreateProductPage.tsx";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import Button from "@mui/material/Button";
import {NumericFormat} from "react-number-format";
type brandData={
    id:string,
    name:string,
}
export default function NewProductInfoField(props:{productInfo:productInfo,setProductInfo:(value:any)=>void,validationError:productValidationError}) {
    const [success, setSuccess] = useState(false);
    const [brands, setBrands] = useState<brandData[]>([]);
    const {data,refetch}=useQuery({
        refetchOnWindowFocus:false,
        queryKey:["brand_list"],
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Admin/Brands', {
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
            setBrands(data.data)
        }
    }, [data]);

    const handleNameChange=(e:any)=>{
        props.setProductInfo({...props.productInfo,name:e.target.value});
    }

    const handleQuantityChange=(e:any)=>{
        props.setProductInfo({...props.productInfo,quantity:e.target.value});
    }
    const handleBrandIdChange=(e:any)=>{
        props.setProductInfo({...props.productInfo,brandId:e.target.value});
    }
    const handleIsDiscountChange=(e:any)=>{
        props.setProductInfo({...props.productInfo,isDiscount:e.target.checked});
    }

    // @ts-ignore
    const handleStatusChange=(event: React.MouseEvent<HTMLElement>,
                              value: number,
    ) => {
        props.setProductInfo({...props.productInfo,status:value});
    };
    return(
        <Grid container spacing={2}>
            <Grid size={6}>
                <TextField
                    fullWidth
                    label="Tên"
                    variant="filled"
                    value={props.productInfo.name}
                    onChange={handleNameChange}
                    error={props.validationError.name.length>0}
                    helperText={props.validationError.name}
                />
            </Grid>
            <Grid size={6}>
                <NumericFormat
                    isAllowed={(values) => {
                        const { floatValue } = values;
                        // @ts-ignore
                        return floatValue >0;
                    }}
                    value={props.productInfo.price}
                    onValueChange={(values) => {
                        props.setProductInfo({...props.productInfo,price:values.value});
                    }}
                    error={props.validationError.price.length>0}
                    helperText={props.validationError.price}
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
                    fullWidth
                    label="Số lượng"
                    type="number"
                    variant="filled"
                    value={props.productInfo.quantity}
                    onChange={handleQuantityChange}
                    error={props.validationError.quantity.length>0}
                    helperText={props.validationError.quantity}
                />
            </Grid>
            <Grid size={6}>
                {success?
                    <FormControl error={props.validationError.brandId.length>0}
                                 variant="filled" fullWidth>
                        <InputLabel >Hãng</InputLabel>
                        <Select
                            value={props.productInfo.brandId}
                            onChange={handleBrandIdChange}
                        >
                            <MenuItem value="0" disabled>Chọn hãng</MenuItem>
                            {brands.map((item) => (
                                <MenuItem value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                            {props.validationError.brandId}
                        </FormHelperText>
                    </FormControl>
                    :
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Button onClick={()=>refetch()} variant="contained">Load lại</Button>
                    </div>
                    }

            </Grid>
            <Grid size={6}>
                <Switch onChange={handleIsDiscountChange} value={props.productInfo.isDiscount}/> Giảm
            </Grid>
            <Grid size={6}>
                <NumericFormat
                    isAllowed={(values) => {
                        const { floatValue } = values;
                        // @ts-ignore
                        return floatValue >0;
                    }}
                    disabled={!props.productInfo.isDiscount}
                    fullWidth
                    label="Giá sau giảm"
                    variant="filled"
                    value={props.productInfo.priceAfterDiscount}
                    onValueChange={(values) => {
                        props.setProductInfo({...props.productInfo,priceAfterDiscount:values.value});
                    }}
                    error={props.validationError.priceAfterDiscount.length>0}
                    helperText={props.validationError.priceAfterDiscount}
                    suffix={" VNĐ"}
                    thousandSeparator
                    customInput={TextField}
                />
            </Grid>
            <Grid size={12} sx={{display:"flex",justifyContent:"center"}}>
                <ToggleButtonGroup
                    color="primary"
                    value={props.productInfo.status}
                    exclusive
                    onChange={handleStatusChange}
                    aria-label="Platform"
                >
                    <ToggleButton value={0}>Đang bán</ToggleButton>
                    <ToggleButton value={1}>Không bán</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
        </Grid>
    )
}