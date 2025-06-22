import Container from "@mui/material/Container";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import BuildItemCard from "./Component/BuildItemCard.tsx";
import {useUserInfo} from "../../State/User.ts";
export type buildProduct={
    productId: string;
    productName: string;
    quantity:number;
    storageCount: number;
    price:number,
    priceAfterDiscount:number,
    componentName:string;
}
export default function PCBuilderPage(){
    const userInfo=useUserInfo(state=>state.user);
    const [build,setBuild]=useState<buildProduct[]>([]);
    const {data,refetch}=useQuery({
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
    return(
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid size={12}>
                    <BuildItemCard categoryId={"MOTHERBOARD"} products={build} componentName={"MAINBOARD"} reFetch={refetch} updateAble={true}/>

                </Grid>
                <Grid size={12}>

                </Grid>
            </Grid>
        </Container>
    )
}