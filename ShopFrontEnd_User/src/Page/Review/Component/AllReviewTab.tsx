import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {ReviewData} from "../../../Type/ReviewData.ts";
import {CardHeader, Divider, Rating, TextField} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import UpdateReviewDialog from "./UpdateReviewDialog.tsx";
export default function AllReviewTab(){
    const [review,setReview]=useState<ReviewData[]>([]);
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["All_review"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Reviews', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                method:"GET"
            });
            const content = await response.json();
            return(content);
        },
    })
    useEffect(() => {
        if(data){
            if(data.success)
                setReview(data.data)
        }
    }, [data]);
    const [editModel, setEditModel]=useState({
        id:"",
        content:"",
        score:1
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = (id:string,content:string,score:number) => {
        setEditModel({
            id:id,
            content: content,
            score:score,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setEditModel({
            id:"",
            content:"",
            score:1
        })
        setOpen(false);
    };

    return(
        <>
            {!isFetching &&
                <>
                    {review.map((review:ReviewData) =>
                        <Card key={review.id} sx={{borderTop:"5px solid blue",marginBottom:"10px"}} elevation={6}>
                            <CardMedia
                                component="img"
                                sx={{ objectFit: "contain",width:"150px" }}
                                image={`https://localhost:7075/api/Products/${review.productId}/Thumbnail`}
                                alt={review.productName}
                            />
                            <CardHeader title={review.productName} subheader={
                                new Date(review.reviewDate).toLocaleString('En-GB', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit' })
                            }>
                            </CardHeader>
                            <CardContent sx={{paddingTop:"0px"}}>
                                <div style={{display:"flex",flexDirection:"column",paddingTop:"0px",gap:3}}>
                                    <Rating readOnly value={review.score} precision={0.5} />
                                    <TextField
                                        color="primary"
                                        label="Nội dung"
                                        multiline
                                        rows={7}
                                        value={review.content}
                                        variant="filled"
                                    />
                                </div>
                                <Divider sx={{marginY:"10px"}}/>
                                <div style={{display:"flex",justifyContent:"end"}}>
                                    <Button variant={"contained"} color={"primary"} onClick={()=>handleClickOpen(review.id,review.content,review.score)}>Sửa</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </>
            }
            <UpdateReviewDialog open={open} handleClose={handleClose} reviewId={editModel.id} content={editModel.content} score={editModel.score} refetch={refetch}/>
        </>
    )
}