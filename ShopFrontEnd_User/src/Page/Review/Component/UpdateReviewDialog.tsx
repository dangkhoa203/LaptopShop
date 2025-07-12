import {useEffect, useState} from "react";
import {useAppError} from "../../../State/AppErrorState.ts";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../../Type/Respone.ts";
import {Dialog, DialogContent, DialogTitle, Grid, Rating, TextField} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function UpdateReviewDialog(props:{open:boolean,handleClose:()=>void,reviewId:string,content:string,score:number,refetch:any}) {

    const [reviewModel, setReviewModel] = useState({
        id:"",
        score:1,
        content:""
    })
    const handleChangeContent=(e:any)=>{
        setReviewModel({...reviewModel,content:e.target.value})
    }
    const [validationErrors,setValidationErrors] = useState({
        score:"",
        content:""
    })
    const globalError=useAppError()
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Reviews`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    id:props.reviewId,
                    score:reviewModel.score,
                    content:reviewModel.content,
                })
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                props.refetch()
            }
            else {
                if(!data.validationError.isValid){
                    const list:any[]=data.validationError.errors
                    const error={
                        score:"",
                        content:""
                    }
                    list.forEach(element=>{
                        if(element.propertyName==="Score")
                            error.score=element.errorMessage
                        if(element.propertyName==="Content")
                            error.content=element.errorMessage
                    })
                    setValidationErrors(error)
                    globalError.setError(data.errorMessage)
                }
            }
        }
    })
    useEffect(() => {
        setReviewModel({
            id: props.reviewId,
            score: props.score,
            content:props.content,
        })
    }, [props.reviewId]);
    return(
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogTitle>Tạo review</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Sửa review {props.reviewId}
                </DialogContentText>
                <div style={{display:"flex", flexDirection:"column",gap:"5px"}}>
                    <Rating size="large"
                        // @ts-ignore
                            onChange={(event, newValue) => {
                                // @ts-ignore
                                setReviewModel({...reviewModel,score: newValue});
                            }}
                            value={reviewModel.score} precision={0.5} />
                    <TextField
                        color="secondary"
                        label="Nội dung"
                        multiline
                        value={reviewModel.content}
                        onChange={handleChangeContent}
                        rows={4}
                        variant="filled"
                        error={validationErrors.content.length>0}
                        helperText={validationErrors.content}
                    />
                </div>

            </DialogContent>
            <DialogActions>
                <Grid container spacing={2}>
                    <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                        <Button
                            loading={isPending}
                            onClick={()=>{
                                props.handleClose();
                            }}
                            fullWidth variant={"outlined"} color="error">Hủy</Button>
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                        <Button loading={isPending} fullWidth variant={"contained"} onClick={()=>mutate()} color={"primary"}>Sửa</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}