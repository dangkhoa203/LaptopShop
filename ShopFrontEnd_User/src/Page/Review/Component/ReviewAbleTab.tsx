import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {CardHeader} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ReviewDialog from "./ReviewDialog.tsx";
type ReviewAble = {
    productId: string,
    orderId: string,
    productName:string,
    orderDate:string
}
export default function ReviewAbleTab(){
    const [review,setReview]=useState<ReviewAble[]>([]);
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["All_reviewable"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            const response = await fetch('https://localhost:7075/api/Reviews/ReviewAble', {
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
            setReview(data.data)
        }
    }, [data]);

    const [newReview,setNewReview]=useState({
        orderId:"",
        productId:"",
        productName:"",
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = (orderId:string,productName:string,productId:string) => {
        setNewReview({orderId: orderId,productName: productName,productId:productId});
        setOpen(true);
    };

    const handleClose = () => {
        setNewReview({
            orderId:"",
            productId:"",
            productName:"",
        });
        setOpen(false);
    };
    return(
        <>
            {!isFetching &&
                <>
                    {review.map(review =>
                        <Card key={review.productId+review.orderId} sx={{ display: 'flex',marginBottom:"10px" }} elevation={6}>
                            <CardMedia
                                component="img"
                                sx={{ objectFit: "contain",width:"150px" }}
                                image={`https://localhost:7075/api/Products/${review.productId}/Thumbnail`}
                                alt={review.productName}
                            />

                            <CardContent sx={{display:"flex",flexDirection:"column",paddingTop:"0px",width:"100%"}}>
                                <Container>
                                    <CardHeader title={review.productName} subheader={review.productId}>
                                    </CardHeader>
                                    <Typography sx={{padding:"16px",paddingTop:"0"}}>
                                        {
                                            "\nNgày đặt: "+new Date(review.orderDate).toLocaleString('En-GB', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit' })
                                        }
                                    </Typography>
                                </Container>
                                <Button sx={{margin:"auto",width:"130px"}} color="secondary" variant={"outlined"} onClick={()=>handleClickOpen(review.orderId,review.productName,review.productId)}>Review</Button>
                            </CardContent>
                        </Card>
                    )}
                </>
            }
            <ReviewDialog open={open} handleClose={handleClose} orderId={newReview.orderId} productName={newReview.productName} productId={newReview.productId} refetch={refetch}/>
        </>
    )
}