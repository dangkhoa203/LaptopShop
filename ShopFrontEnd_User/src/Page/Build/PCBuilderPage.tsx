import Container from "@mui/material/Container";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Grid, Paper, Skeleton} from "@mui/material";
import BuildItemCard from "./Component/BuildItemCard.tsx";
import {useUserInfo} from "../../State/User.ts";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
export type buildProduct={
    productId: string;
    productName: string;
    quantity:number;
    storageCount: number;
    isDiscount: boolean;
    price:number,
    priceAfterDiscount:number,
    componentName:string;
}
export default function PCBuilderPage(){
    const userInfo=useUserInfo(state=>state.user);
    const [build,setBuild]=useState<buildProduct[]>([]);
    const {data,refetch,isLoading}=useQuery({
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
            setBuild(data.data)
        }
    }, [data]);
    const navigate = useNavigate();
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
    const itemCheck=["MOTHERBOARD","CPU","CARD","PSU","RAM","OCUNG","CASE","MANHINH"]
    const checkOutCheck:()=>boolean=()=>{
        if(build.length===0)
            return false;

        return itemCheck.every(cat=>{
            return build.some(i=>i.componentName==cat)
        })
    }
    const showCheck=checkOutCheck()
    return(
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid sx={{gap:2,display:"flex",flexDirection:"column"}} size={{xs:12,sm:12,md:9,lg:9}}>
                    {isLoading ?
                        <div style={{display:"flex",gap:2,flexDirection:"column"}}>
                            <Skeleton sx={{minHeight:"193px"}}/>
                            <Skeleton sx={{minHeight:"193px"}}/>
                            <Skeleton sx={{minHeight:"193px"}}/>
                            <Skeleton sx={{minHeight:"193px"}}/>
                            <Skeleton sx={{minHeight:"193px"}}/>
                            <Skeleton sx={{minHeight:"193px"}}/>
                            <Skeleton sx={{minHeight:"193px"}}/>
                            <Skeleton sx={{minHeight:"193px"}}/>
                        </div>
                        :
                        <>
                            <BuildItemCard categoryId={"MOTHERBOARD"} products={build} componentName={"Motherboard"} reFetch={refetch} updateAble={false}/>
                            <BuildItemCard categoryId={"CPU"} products={build} componentName={"CPU"} reFetch={refetch} updateAble={false}/>
                            <BuildItemCard categoryId={"CARD"} products={build} componentName={"Card đồ họa"} reFetch={refetch} updateAble={false}/>
                            <BuildItemCard categoryId={"PSU"} products={build} componentName={"Nguồn"} reFetch={refetch} updateAble={false}/>
                            <BuildItemCard categoryId={"RAM"} products={build} componentName={"RAM"} reFetch={refetch} updateAble={true}/>
                            <BuildItemCard categoryId={"OCUNG"} products={build} componentName={"Ổ cứng"} reFetch={refetch} updateAble={true}/>
                            <BuildItemCard categoryId={"CASE"} products={build} componentName={"Vỏ Case"} reFetch={refetch} updateAble={false}/>
                            <BuildItemCard categoryId={"MANHINH"} products={build} componentName={"Màn hình"} reFetch={refetch} updateAble={false}/>
                        </>
                    }

                </Grid>
                <Grid size={{xs:12,sm:12,md:3,lg:3}}>
                    {isLoading?
                        <Skeleton sx={{minHeight:"92px"}}/>
                        :
                        <Paper elevation={12} sx={{padding:"10px",display:"flex",gap:2,flexDirection:"column",justifyContent:"center"}}>
                            Tổng giá trị: {getTotal().toLocaleString(undefined, { minimumFractionDigits: 0 })} VND
                            <Button disabled={!showCheck}  onClick={()=>navigate("DatHang")} fullWidth variant="contained">Thanh toán</Button>
                        </Paper>
                    }

                </Grid>
            </Grid>
        </Container>
    )
}