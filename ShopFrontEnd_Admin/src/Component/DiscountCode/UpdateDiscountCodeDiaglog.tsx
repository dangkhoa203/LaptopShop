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
type codeInfo = {
    id: string,
    name: string,
    description: string,
    percent:number,
    isActive:boolean,
    endDate:Date
}
type newCodeInfo = {
    name: string,
    description: string,
    percent:number,
    isActive:boolean,
    endDate:string
}
export default function UpdateDiscountCodeDiaglog(props:{old:codeInfo,open:boolean,handleClose:()=>void,reFetch:any}){
    const curr = new Date();
    curr.setDate(curr.getDate()+1);
    const date = curr.toISOString().substring(0,10);
    const [globalError, setGlobalError] = useState("");

    const [validateError, setValidateError] = useState(
        {
            name:"",
            percent:""
        }
    );
    const [codeInfo, setCodeInfo] = useState<newCodeInfo>(
        {
            name:'',
            description:'',
            percent:1,
            isActive:false,
            endDate:date,
        }
    );
    const handleNameChange = (e:any) => {
        setCodeInfo({...codeInfo, name: e.target.value});
    }
    const handleDescriptionChange = (e:any) => {
        setCodeInfo({...codeInfo, description: e.target.value});
    }
    const handleDPercentChange = (e:any) => {
        setCodeInfo({...codeInfo, percent: e.target.value});
    }
    const handleIsActiveChange = (e:any) => {
        setCodeInfo({...codeInfo, isActive: e.target.checked});
    }
    const handleEndDateChange = (e:any) => {
        setCodeInfo({...codeInfo, endDate: e.target.value});
    }
    const checkSame=()=>{
        const olddate=new Date(props.old.endDate)
        olddate.setDate(olddate.getDate()+1)
        return props.old.name === codeInfo.name &&
                props.old.description === codeInfo.description &&
                props.old.percent === codeInfo.percent &&
                props.old.isActive === codeInfo.isActive &&
                olddate.toISOString().split('T')[0] === codeInfo.endDate;

    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            if(!checkSame()){
                setGlobalError("")
                const response = await fetch(`https://localhost:7075/api/Admin/Discount-Codes/${props.old.id}`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(codeInfo)
                })
                return await response.json();
            }
            else props.handleClose();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setCodeInfo({
                    name:'',
                    description:'',
                    percent:1,
                    isActive:false,
                    endDate:date,
                })
                setGlobalError("")
                setValidateError({
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
                    setValidateError(error)
                }
            }
        }
    })
    useEffect(()=>{
        const olddate=new Date(props.old.endDate)
        olddate.setDate(olddate.getDate()+1)
        setCodeInfo({
            name:props.old.name,
            description:props.old.description,
            percent:props.old.percent,
            isActive:props.old.isActive,
            endDate: olddate.toISOString().split('T')[0],
        })

    },[props.old])
    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setCodeInfo({
                    name:'',
                    description:'',
                    percent:1,
                    isActive:false,
                    endDate:date,
                })
                setGlobalError("")
                setValidateError({
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
                    setCodeInfo({
                        name:'',
                        description:'',
                        percent:1,
                        isActive:false,
                        endDate:date,
                    })
                    setGlobalError("")
                    setValidateError({
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
                            <TextField value={codeInfo.name} onChange={handleNameChange} fullWidth
                                       error={validateError.name.length>0}  helperText={validateError.name}
                                       color="warning"
                                       size={"medium"} label="Tên" variant="filled" />
                        </Grid>
                        <Grid size={6}>
                            <TextField value={codeInfo.endDate} onChange={handleEndDateChange} fullWidth
                                       color="warning" type="date"
                                       size={"medium"} label="Hạn dùng" variant="filled" />
                        </Grid>
                        <Grid size={6}>
                            <Switch color="warning" value={codeInfo.isActive} onChange={handleIsActiveChange} checked={codeInfo.isActive} /> Hoạt động
                        </Grid>
                        <Grid size={6}>
                            <TextField value={codeInfo.percent} onChange={handleDPercentChange} fullWidth
                                       type="number" error={validateError.percent.length>0} helperText={validateError.percent}
                                       color="warning"
                                       size={"medium"} label="Phần trăm " variant="filled" />
                        </Grid>
                        <Grid size={12}>
                            <TextField value={codeInfo.description} onChange={handleDescriptionChange} fullWidth
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
                            setCodeInfo({
                                name:'',
                                description:'',
                                percent:1,
                                isActive:false,
                                endDate:date,
                            })
                            setGlobalError("")
                            setValidateError({
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