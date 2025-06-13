import Typography from "@mui/material/Typography";
import {ProductData} from "../../Type/ProductData.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import "../../CSS/ProductCard.css"
import {Grid, Paper} from "@mui/material";
import Button from "@mui/material/Button";
import MainPageProductCard from "./MainPageProductCard.tsx";
export default function MainPageMainCategoryProduct(props:{isMain:boolean,category:string,categoryId:string}) {
    const [products, setProducts] = useState<ProductData[]>([])
    const {data}=useQuery({
        queryKey: [`category_${props.categoryId}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            try {
                const response = await fetch(`https://localhost:7075/api/Category/${props.isMain ? "Main":"Sub"}/${props.categoryId}/Main_Page`, {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method:"GET",
                });
                if (!response.ok) {
                    return({
                        userName: '',
                        userEmail: '',
                        userId: '',
                        isLogged: false,
                    })
                }
                const content = await response.json();
                return(content);
            } catch  {
                return({
                    userName: '',
                    userEmail: '',
                    userId: '',
                    isLogged: false,
                })
            }
        },
    })
    useEffect(() => {
        if(data){
            setProducts(data.data)
        }
    }, [data]);

    return (
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:"15px"}}>
            {products.length!==0 &&
                <>
                    <Paper elevation={9} sx={{display: "flex",justifyContent:"center",flexDirection:"column", gap:2,padding:"10px"}}  >
                        <Typography variant="h3" textAlign="center" component="p">
                            {props.category}
                        </Typography>
                        <Grid container spacing={1}>
                            {products.map(product =>
                                <MainPageProductCard product={product}/>
                            )}
                            <Grid sx={{display:"flex",flexDirection:"column",justifyContent:"center"}} size={products.length===6?{xs:12,sm:12,md:6,lg:6}:12}>
                                <Button color={"secondary"} sx={{margin:"auto",maxWidth:"300px"}}  variant={"outlined"} fullWidth>Xem thêm</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </>
            }

        </div>
    )
}
