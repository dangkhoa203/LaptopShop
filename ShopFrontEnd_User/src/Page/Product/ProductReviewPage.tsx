import {useEffect, useState} from "react";
import {ProductReviewData} from "../../Type/ProductReviewData.ts";
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router";
import Typography from "@mui/material/Typography";
import ReviewCard from "./Component/ReviewCard.tsx";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function ProductReviewPage(){
    const {id}=useParams()
    const [reviews,setReviews]=useState<ProductReviewData[]>([])
    const [fail,setFail]=useState<boolean>(false)
    const {data}=useQuery({
        queryKey: [`product_${id}_reviews`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{// @ts-ignore
            const response = await fetch(`https://localhost:7075/api/Products/${id}/Reviews?preview=0`, {
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
                setFail(false)
                setReviews(data.data)
            }else {
                setFail(true)
            }

        }
    }, [data]);
    const navigate = useNavigate();
    useEffect(()=>{
        document.title="Review sản phẩm"
    },[])
    return(
        <Container maxWidth="lg" sx={{paddingY:"10px"}}>
            {fail ?
                <>
                    <Typography textAlign={"center"} variant={"h4"}>Lỗi xảy ra</Typography>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Button startIcon={<ArrowBackIcon/>} onClick={()=>navigate(`/SanPham`)} variant={"contained"}>Quay về</Button>
                    </div>
                </>
                :
                <>
                    <Button startIcon={<ArrowBackIcon/>} onClick={()=>navigate(`/SanPham/${id}`)}>Quay về</Button>
                    <Typography textAlign={"center"} variant={"h4"}>Review sản phẩm</Typography>
                    {reviews?.length===0 &&
                        <Typography textAlign={"center"} variant={"h6"}>Chưa có review</Typography>
                    }
                    {reviews.map(review=>
                        <>
                            <ReviewCard review={review}/>
                        </>
                    )}
                </>
            }
        </Container>
    )
}