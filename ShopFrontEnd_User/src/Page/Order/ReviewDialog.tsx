import {Dialog, DialogContent, DialogTitle, Grid, Rating, TextField} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import {useAppError} from "../../State/AppErrorState.ts";

export default function ReviewDialog(props:{open:boolean,handleClose:()=>void,orderId:string,productName:string,productId:string,refetch:any}) {
    const [reviewModel, setReviewModel] = useState({
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
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({
                    orderId:props.orderId,
                    productId:props.productId,
                    score:reviewModel.score,
                    content:reviewModel.content,
                })
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setReviewModel(
                    {
                        score:1,
                        content:""
                    }
                )
                setValidationErrors({
                    score:"",
                    content:""
                })
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
                    Tạo review cho sản phẩm: {props.productName}
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
                                setReviewModel({
                                    score: 1,
                                    content:""
                                })
                                props.handleClose();
                            }}
                            fullWidth variant={"outlined"} color="error">Hủy</Button>
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6,lg:6}}>
                        <Button loading={isPending} fullWidth variant={"contained"} onClick={()=>mutate()} color={"secondary"}>Tạo</Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}