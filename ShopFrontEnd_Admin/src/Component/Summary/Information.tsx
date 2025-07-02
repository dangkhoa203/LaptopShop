import Container from "@mui/material/Container";
import TopCategoryChart from "./TopCategoryChart.tsx";
import Divider from "@mui/material/Divider";
import AllSubCategorySale from "./AllSubCategorySale.tsx";
import AllMainCategoriesSale from "./AllMainCategoriesSale.tsx";
import TopCustomer from "./TopCustomer.tsx";
import AllCustomerOrder from "./AllCustomerOrder.tsx";
import OrderStatusChart from "./OrderStatusChart.tsx";
export default function Information(){
    return(
        <Container maxWidth="lg">
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