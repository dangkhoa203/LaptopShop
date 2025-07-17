import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {ProductReviewData} from "../../../Type/ProductReviewData.ts";
import {Paper} from "@mui/material";
import ReviewCard from "./ReviewCard.tsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";

export default function ProductReviewPreviewBox(props:{id:string|undefined}){
    const [reviews,setReviews]=useState<ProductReviewData[]>([])
    const [total,setTotal]=useState<number>(0)
    const [fail,setFail]=useState<boolean>(false)
    const {data,refetch}=useQuery({
        queryKey: [`product_${props.id}_reviews_preview`],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{// @ts-ignore
            const response = await fetch(`https://localhost:7075/api/Products/${props.id}/Reviews?preview=1`, {
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
                setTotal(data.total)
            }else {
                setFail(true)
            }

        }
    }, [data]);
    const navigate=useNavigate();
    return(
        <>
            <Paper sx={{padding:"10px",borderTop:"5px solid orange"}}>
                {fail &&
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Button variant={"contained"} color={"primary"} onClick={()=>refetch()}>Tải lại</Button>
                    </div>
                }
                <Typography textAlign={"center"} variant={"h4"}>Review sản phẩm</Typography>
                {reviews?.length===0 &&
                    <Typography textAlign={"center"} variant={"h6"}>Chưa có review</Typography>
                }
                {reviews.map(review=>
                    <>
                        <ReviewCard review={review}/>
                    </>


                )}
                {total>3 &&
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <Button onClick={()=>navigate("review")} variant={"contained"}>Xem tất cả</Button>
                    </div>
                }
            </Paper>
        </>
    )
}