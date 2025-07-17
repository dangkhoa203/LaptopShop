import {ProductData} from "../../../Type/ProductData.ts";
import {useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {publicApiType, ScrollMenu, VisibilityContext} from "react-horizontal-scrolling-menu";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MainPageProductCard from "../../Product/Component/MainPageProductCard.tsx";
import { ArrowBackIos } from "@mui/icons-material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router";

export default function BrandItem(props:{title:string,brandTag:string,categoryId:string,redirectLink:string}){
    const [products, setProducts] = useState<ProductData[]>([])
    const {data}=useQuery({
        queryKey: [`brand_${props.brandTag}_${props.categoryId}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Category/Main/${props.categoryId}?sortMode=${0}&page=${1}&brands=${props.brandTag}`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET",
            });
            return await response.json()
        },
    })
    const navigate=useNavigate()
    useEffect(() => {
        if(data){
            if(data?.success)
                setProducts(data.data.products)
        }
    }, [data]);

    return (
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"15px"}}>
            {products.length!==0 &&
                <>
                    <Paper elevation={9} sx={{display:{xs:"none",sm:"flex",md:"flex",lg:"flex"} ,justifyContent:"center",flexDirection:"column", gap:2,padding:"10px"}}  >
                        <Typography variant="h3" textAlign="center" component="p">
                            {props.title}
                        </Typography>
                        <Box  sx={{
                            padding:"10px",

                            '.react-horizontal-scrolling-menu--scroll-container': {
                                display:"flex",gap:2,padding:"25px 20px"
                            }
                        }}>
                            <ScrollMenu LeftArrow={<LeftArrow/> } RightArrow={<RightArrow/>}>
                                {products.map((product,index) =>
                                    <MainPageProductCard key={index} product={product}/>
                                )}

                            </ScrollMenu>
                        </Box>
                        <Button onClick={()=>navigate(props.redirectLink)}>Xem thêm</Button>
                    </Paper>
                    <Paper elevation={9} sx={{display:{xs:"flex",sm:"none",md:"none",lg:"none"} ,justifyContent:"center",flexDirection:"column", gap:2,padding:"10px"}}  >
                        <Typography variant="h3" textAlign="center" component="p">
                            {props.title}
                        </Typography>
                        {products.slice(0,6).map((product,index) =>
                            <MainPageProductCard key={index} product={product}/>
                        )}
                        <Button onClick={()=>navigate(props.redirectLink)}>Xem thêm</Button>
                    </Paper>
                </>
            }

        </div>
    )
}
const LeftArrow = () => {
    const visibility = useContext<publicApiType>(VisibilityContext) ;
    const isFirstItemVisible = visibility.useIsVisible('first', false);
    const onClick = () =>
        visibility.scrollToItem(visibility.getPrevElement(), 'smooth');
    return (
        <Button
            disabled={isFirstItemVisible}
            onClick={onClick}
            className="left"
        >
            <ArrowBackIos/>
        </Button>
    );
};

const RightArrow = () => {
    const visibility =  useContext<publicApiType>(VisibilityContext) ;
    const isLastItemVisible = visibility.useIsVisible('last', false);
    const onClick = () =>
        visibility.scrollToItem(visibility.getNextElement(), 'smooth');

    return (
        <Button
            disabled={isLastItemVisible}
            onClick={onClick}
            className="right"
        >
            <ArrowForwardIosIcon/>
        </Button>
    );
};
