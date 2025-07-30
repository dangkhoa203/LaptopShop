import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextEditor from "../../TextEditor.tsx";
import {useEffect, useState} from "react";
import NewThumbnail from "./MiniComponent/NewThumbnail.tsx";
import {productInfo} from "../../../Type/productInfo.ts";
import NewProductInfoField from "./MiniComponent/NewProductInfoField.tsx";
import NewProductImageList from "./MiniComponent/NewProductImageList.tsx";
import NewCateroryTable from "./MiniComponent/NewCateroryTable.tsx";
import Divider from "@mui/material/Divider";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../../Type/Respone.ts";
import {useNavigate} from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
export type productValidationError={
    price:string,
    priceAfterDiscount:string,
    quantity:string,
    name:string,
    brandId:string,
}

export default function CreateProductPage(){
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState<productInfo>({
        name:'',
        price:0,
        brandId:'0',
        quantity:0,
        priceAfterDiscount:0,
        isDiscount:false,
        status:0
    })
    const [description, setDescription] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<any>(null);
    const [productImage, setProductImage] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [globalError, setGlobalError] = useState<string>();
    const [validationError, setValidationError] = useState<productValidationError>({
        price:"",
        priceAfterDiscount:"",
        quantity:"",
        name:"",
        brandId:"",
    });
    const toFormData=()=>{
        const formData=new FormData();
        formData.append("name",productInfo.name);
        formData.append("price",productInfo.price.toString());
        formData.append("brandId",productInfo.brandId);
        formData.append("quantity",productInfo.quantity.toString());
        formData.append("priceAfterDiscount",productInfo.isDiscount? productInfo.priceAfterDiscount.toString():"0");
        formData.append("isDiscount",productInfo.isDiscount.toString());
        formData.append("status",productInfo.status.toString());
        formData.append("description",description);
        if(categories.length!==0)
            categories.forEach((item,index)=>{
                formData.append(`categories[${index}]`,item);
            })
        else
            formData.append(`categories`,"empty");
        formData.append("productPicture[0]",thumbnail);
        // @ts-ignore
        productImage.forEach((item,index)=>{
            formData.append(`productPicture[${index+1}]`,item);
        })
        console.log(formData)
        return formData;
    }
    const [thumbnailError, setThumbnailError] = useState<boolean>(false);
    const checkData=()=>{
        setThumbnailError(false)
        if(thumbnail===null){
            setThumbnailError(true);
            window.scrollTo(0,0);
            return false
        }
        return true;
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            if(checkData()) {
                const response = await fetch(`https://localhost:7075/api/Admin/Products`, {
                    method: 'POST',
                    credentials: 'include',
                    body: toFormData()
                })
                return await response.json();
            }

        },
        onSuccess:(data:Response)=>{
            if(data.success){
               navigate("..")
            }
            else {
                setGlobalError(data.errorMessage)
                console.log(data.validationError)
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
                        if(element.propertyName==="PriceAfterDiscount")
                            error.priceAfterDiscount=element.errorMessage
                        if(element.propertyName==="Quantity")
                            error.quantity=element.errorMessage
                        if(element.propertyName==="Name")
                            error.name=element.errorMessage
                        if(element.propertyName==="BrandId")
                            error.brandId=element.errorMessage
                    })
                    setValidationError(error)
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        }
    })
    // @ts-ignore
    useEffect(()=>{
        document.title="Tạo sản phẩm mới"
    },[])
    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <p className="quicksand-header" style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Tạo sản phẩm</p>
            <Button startIcon={<ArrowBackIcon/>} sx={{width:"150px"}} onClick={()=>navigate(-1)}>Quay về</Button>
            <Container sx={{display:"flex", flexDirection: {xs:"column",sm:"column",md:"column",lg:"row"}, justifyContent:"center",gap:2}}>
                <Container sx={{flex:1}}>
                    <NewThumbnail thumbnail={thumbnail} setThumbnail={setThumbnail} error={thumbnailError}/>
                </Container>
                <Container sx={{flex:2}}>
                    <NewProductInfoField productInfo={productInfo} setProductInfo={setProductInfo} validationError={validationError}/>
                </Container>
            </Container>
            <NewProductImageList productImage={productImage} setProductImage={setProductImage}/>
            <Container sx={{maxWidth: {xs:"450px",sm:"480px",md:"750px",lg:"1152px"}}} style={{padding:0}}>
                <Divider/>
                <h2 style={{textAlign:"center"}}>Mô tả sản phẩm</h2>
                <TextEditor color={"rgb(25, 118, 210)"} description={description} setDescription={setDescription}/>
            </Container>
            <NewCateroryTable categories={categories} setCategories={setCategories}/>
            {globalError!=="" &&
                <div style={{color:"red",textAlign:"center"}}>
                    {globalError}
                </div>
            }
            <div style={{display:"flex",marginBottom:"10px", justifyContent:"end", gap:2}}>
                <Button loading={isPending} loadingPosition={"end"} fullWidth sx={{fontSize:"1.3em"}} onClick={()=>mutate()} variant="contained" color={"primary"}>Tạo</Button>
            </div>
        </Container>
    )
}