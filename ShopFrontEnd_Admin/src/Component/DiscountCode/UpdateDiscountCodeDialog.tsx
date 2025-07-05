import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    LinearProgress, Switch,
    TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
type oldCodeInfo = {
    id: string,
    name: string,
    description: string,
    percent:number,
    code:string,
    isActive:boolean,
    endDate:Date
}
type newCodeInfo = {
    name: string,
    description: string,
    percent:number,
    code:string,
    isActive:boolean,
    endDate:string
}
export default function UpdateDiscountCodeDialog(props:{old:oldCodeInfo,open:boolean,handleClose:()=>void,reFetch:any}){
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()+1);
    const showDate = currentDate.toISOString().substring(0,10);
    const [globalError, setGlobalError] = useState("");

    const [validationError, setValidationError] = useState(
        {
            name:"",
            percent:""
        }
    );
    const [newCodeInfo, setNewCodeInfo] = useState<newCodeInfo>(
        {
            name:'',
            description:'',
            percent:1,
            code:'',
            isActive:false,
            endDate:showDate,
        }
    );
    const handleNameChange = (e:any) => {
        setNewCodeInfo({...newCodeInfo, name: e.target.value});
    }
    const handleDescriptionChange = (e:any) => {
        setNewCodeInfo({...newCodeInfo, description: e.target.value});
    }
    const handleDPercentChange = (e:any) => {
        setNewCodeInfo({...newCodeInfo, percent: e.target.value});
    }
    const handleCodeChange = (e:any) => {
        setCodeInfo({...codeInfo, code: e.target.value});
    }
    const handleIsActiveChange = (e:any) => {
        setNewCodeInfo({...newCodeInfo, isActive: e.target.checked});
    }
    const handleEndDateChange = (e:any) => {
        setNewCodeInfo({...newCodeInfo, endDate: e.target.value});
    }
    const checkSame=()=>{
        const oldDate=new Date(props.old.endDate)
        oldDate.setDate(oldDate.getDate()+1)
        return props.old.name === newCodeInfo.name &&
                props.old.description === newCodeInfo.description &&
                props.old.percent === newCodeInfo.percent &&
                props.old.isActive === newCodeInfo.isActive &&
                oldDate.toISOString().split('T')[0] === newCodeInfo.endDate;

    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            if(!checkSame()){
                setGlobalError("")
                const response = await fetch(`https://localhost:7075/api/Admin/Discount-Codes/${props.old.id}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(newCodeInfo)
                })
                return await response.json();
            }
            else props.handleClose();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setNewCodeInfo({
                    name:'',
                    description:'',
                    percent:1,
                    code:'',
                    isActive:false,
                    endDate:showDate,
                })
                setGlobalError("")
                setValidationError({
                    name:"",
                    percent:""
                })
                props.reFetch()
            }
            else {
                setGlobalError(data.errorMessage)
                if(!data.validationError.isValid){
                    const list:any[]=data.validationError.errors
                    const error={
                        name:"",
                        percent:""
                    }
                    list.forEach(element=>{
                        if(element.propertyName==="Percent")
                            error.percent=element.errorMessage
                        if(element.propertyName==="Name")
                            error.name=element.errorMessage
                    })
                    setValidationError(error)
                }
            }
        }
    })
    useEffect(()=>{
        const oldDate=new Date(props.old.endDate)
        oldDate.setDate(oldDate.getDate()+1)
        setNewCodeInfo({
            name:props.old.name,
            description:props.old.description,
            percent:props.old.percent,
            code:props.old.code,
            isActive:props.old.isActive,
            endDate: oldDate.toISOString().split('T')[0],
        })

    },[props.old])
    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setNewCodeInfo({
                    name:'',
                    description:'',
                    percent:1,
                    code:'',
                    isActive:false,
                    endDate:showDate,
                })
                setGlobalError("")
                setValidationError({
                    name:"",
                    percent:""
                })
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    borderTop:"10px solid rgb(230, 81, 0)",
                }}>
                Sửa mã giảm giá {props.old.id}
            </DialogTitle>
            <IconButton
                color="warning"
                onClick={()=> {
                    props.handleClose()
                    setNewCodeInfo({
                        name:'',
                        description:'',
                        percent:1,
                        code:'',
                        isActive:false,
                        endDate:showDate,
                    })
                    setGlobalError("")
                    setValidationError({
                        name:"",
                        percent:""
                    })
                }}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon color="warning" />
            </IconButton>
            <DialogContent dividers>
                <DialogContentText >
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField value={newCodeInfo.name} onChange={handleNameChange} fullWidth
                                       error={validationError.name.length>0}  helperText={validationError.name}
                                       color="warning"
                                       size={"medium"} label="Tên" variant="filled" />
                        </Grid>
                        <Grid size={6}>
                            <TextField value={newCodeInfo.endDate} onChange={handleEndDateChange} fullWidth
                                       color="warning" type="date"
                                       size={"medium"} label="Hạn dùng" variant="filled" />
                        </Grid>
                        <Grid size={12}>
                            <TextField value={newCodeInfo.code} onChange={handleCodeChange} fullWidth
                                       color="primary"
                                       size={"medium"} label="Code" variant="filled" />
                        </Grid>
                        <Grid size={6}>
                            <Switch color="warning" value={newCodeInfo.isActive} onChange={handleIsActiveChange} checked={newCodeInfo.isActive} /> Hoạt động
                        </Grid>
                        <Grid size={6}>
                            <TextField value={newCodeInfo.percent} onChange={handleDPercentChange} fullWidth
                                       type="number" error={validationError.percent.length>0} helperText={validationError.percent}
                                       color="warning"
                                       size={"medium"} label="Phần trăm " variant="filled" />
                        </Grid>
                        <Grid size={12}>
                            <TextField value={newCodeInfo.description} onChange={handleDescriptionChange} fullWidth
                                       color="warning"
                                       multiline  minRows={2} maxRows={4}
                                       size={"medium"} label="Mô tả" variant="filled" />
                        </Grid>
                    </Grid>
                </DialogContentText>

            </DialogContent>
            <DialogActions sx={{minHeight:"55px"}}>
                {isPending?
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                    :
                    <>
                        <div style={{color:"red"}}>
                            {globalError}
                        </div>
                        <Button color="error" variant={"outlined"} onClick={()=> {
                            props.handleClose()
                            setNewCodeInfo({
                                name:'',
                                description:'',
                                percent:1,
                                code:'',
                                isActive:false,
                                endDate:showDate,
                            })
                            setGlobalError("")
                            setValidationError({
                                name:"",
                                percent:""
                            })
                        }}>Hủy</Button>
                        <Button variant="contained" color="warning" onClick={()=> {
                            mutate()
                        }} autoFocus
                        >
                            Sửa
                        </Button>
                    </>

                }

            </DialogActions>
        </Dialog>
    )
}