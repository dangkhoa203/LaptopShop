import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {ProductData} from "../../../Type/ProductData.ts";
import {CircularProgress, Grid, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import ProductCard from "../../Product/Component/ProductCard.tsx";
import Button from "@mui/material/Button";

export default function SubCategoryItem(props:{title:string,categoryId:string,redirectLink:string}){
    const [products, setProducts] = useState<ProductData[]>([])
    const {data,isFetching}=useQuery ({
        queryKey: [`SubCategory_${props.categoryId}`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{// @ts-ignore
            const response = await fetch(`https://localhost:7075/api/Category/Sub/${props.categoryId}/Main_Page`, {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET",
            });
            return await response.json()
        },
    })
    useEffect(() => {
        if(data){
            if(data?.success){
                setProducts(data.data)
            }

        }
    }, [data]);
    return(
        <>
            {(!isFetching && products.length>0) &&
                <Paper elevation={6} sx={{padding:"10px",paddingBottom:"20px"}}>
                    <Grid style={{display:"flex",justifyContent:"center"}} container spacing={3}>
                        {!isFetching &&
                            <Grid size={12}>
                                <Typography sx={{fontFamily:"Manrope",textTransform:"uppercase",fontWeight:300,letterSpacing:"5px"}} variant="h3" textAlign="center" component="p">{props.title}</Typography>
                            </Grid>
                        }
                        {isFetching?
                            <CircularProgress sx={{margin:"auto"}} size="3rem" />
                            :
                            <>
                                {products.length <=0 &&
                                    <Typography sx={{margin:"auto"}} variant={"body1"}>
                                        Không có sản phẩm
                                    </Typography>
                                }
                                {products.map(product=>
                                    <Grid size={{xs:12,sm:6,md:4,lg:4}}>
                                        <ProductCard product={product}/>
                                    </Grid>

                                )}
                            </>
                        }
                        {products.length >5  &&
                            <Grid sx={{display:"flex",justifyContent:"center"}} size={12}>
                                <Button sx={{width:"150px"}} variant={"outlined"}>Xem thêm </Button>
                            </Grid>
                        }

                    </Grid>
                </Paper>
            }
        </>
    )
}