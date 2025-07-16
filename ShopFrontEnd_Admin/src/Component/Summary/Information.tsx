import Container from "@mui/material/Container";
import TopCategoryChart from "./TopCategoryChart.tsx";
import Divider from "@mui/material/Divider";
import AllSubCategorySale from "./AllSubCategorySale.tsx";
import AllMainCategoriesSale from "./AllMainCategoriesSale.tsx";
import TopCustomer from "./TopCustomer.tsx";
import AllCustomerOrder from "./AllCustomerOrder.tsx";
import OrderStatusChart from "./OrderStatusChart.tsx";
import SaleOfYear from "./SaleOfYear.tsx";
import AllSale from "./AllSale.tsx";
import {useEffect} from "react";
export default function Information(){
    useEffect(()=>{
        document.title="Thống kê"
    },[])
    return(
        <Container maxWidth="lg">
            <SaleOfYear year={new Date().getFullYear()}/>
            <AllSale/>
            <Divider sx={{marginY:"10px"}}/>
            <TopCategoryChart/>
            <AllMainCategoriesSale/>
            <Divider sx={{marginY:"10px"}}/>
            <AllSubCategorySale/>
            <Divider sx={{marginY:"10px"}}/>
            <TopCustomer/>
            <AllCustomerOrder/>
            <Divider sx={{marginY:"10px"}}/>
            <OrderStatusChart/>
        </Container>
    )
}