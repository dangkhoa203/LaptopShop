import Typography from "@mui/material/Typography";
import {ProductData} from "../../../Type/ProductData.ts";
import {useContext, useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import "../../../CSS/ProductCard.css"
import {Paper} from "@mui/material";
import Button from "@mui/material/Button";
import MainPageProductCard from "./MainPageProductCard.tsx";
import {publicApiType, ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu';
import Container from "@mui/material/Container";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useNavigate} from "react-router";


export default function MainPageMainCategoryProduct(props:{isMain:boolean,category:string,categoryId:string,redirectLink:string}) {
    const [products, setProducts] = useState<ProductData[]>([])
    const {data}=useQuery({
        queryKey: [`category_${props.categoryId}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
                const response = await fetch(`https://localhost:7075/api/Category/${props.isMain ? "Main":"Sub"}/${props.categoryId}/Main_Page`, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method:"GET",
                });
                return await response.json()
        },
    })
    const navigate=useNavigate();
    useEffect(() => {
        if(data){
            if(data?.success)
                setProducts(data.data)
        }
    }, [data]);

    return (
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"15px"}}>
            {products.length!==0 &&
                <>
                    <Paper elevation={9} sx={{display: "flex",justifyContent:"center",flexDirection:"column", gap:2,padding:"10px"}}  >
                        <Typography sx={{fontFamily:"Manrope",textTransform:"uppercase",fontWeight:300,letterSpacing:"5px"}} variant="h3" textAlign="center" component="p">
                            {props.category}
                        </Typography>
                        <Container sx={{
                            padding:"10px",

                            '.react-horizontal-scrolling-menu--scroll-container': {
                                display:"flex",gap:5,padding:"25px 20px"
                            }
                        }}>
                            <ScrollMenu LeftArrow={<LeftArrow/> } RightArrow={<RightArrow/>}>
                                {products.map((product,index) =>
                                    <MainPageProductCard key={index} product={product}/>
                                )}

                            </ScrollMenu>
                        </Container>
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
