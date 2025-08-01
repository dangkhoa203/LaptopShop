import Typography from "@mui/material/Typography";
import {ProductData} from "../../../Type/ProductData.ts";
import { useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import "../../../CSS/ProductCard.css"
import {Grid, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import MainPageProductCard from "./MainPageProductCard.tsx";
import {useNavigate} from "react-router";


export default function MainPageMainCategoryProductStyle2(props:{isMain:boolean,category:string,categoryId:string,redirectLink:string}) {
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
                <Paper elevation={9} sx={{display: "flex",justifyContent:"center",flexDirection:"column", gap:2,padding:"10px"}}  >
                    <Typography sx={{fontFamily:"Manrope",textTransform:"uppercase",fontWeight:300,letterSpacing:"5px"}} variant="h3" textAlign="center" component="p">
                        {props.category}
                    </Typography>
                    <Grid sx={{padding:"10px"}} container spacing={2} >
                        {products.slice(0,3).map((product) =>
                            <Grid key={product.id} size={{xs:12,sm:12,md:6,lg:6}}>
                                <MainPageProductCard  product={product}/>
                            </Grid>
                        )}
                    </Grid>
                    <Button onClick={()=>navigate(props.redirectLink)}>Xem thêm</Button>
                </Paper>
            }

        </div>
    )
}
