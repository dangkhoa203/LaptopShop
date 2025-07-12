import {ProductReviewData} from "../../../Type/ProductReviewData.ts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {CardHeader, Rating} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function ReviewCard(props:{review:ProductReviewData}){
    return(
        <>
            <Card sx={{borderTop:"5px solid blue",marginBottom:"10px"}} elevation={6}>
                <CardHeader title={props.review.userName} subheader="September 14, 2016">

                </CardHeader>
                <CardContent sx={{paddingTop:"0px"}}>
                    <Rating readOnly defaultValue={props.review.score} precision={0.5} />
                    <Typography>
                        {props.review.content}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}