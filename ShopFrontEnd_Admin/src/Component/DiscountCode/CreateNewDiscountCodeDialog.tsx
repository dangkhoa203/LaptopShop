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
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
type codeInfo = {
    name: string,
    description: string,
    percent:number,
    code:string
    isActive:boolean,
    endDate:string
}
export default function CreateNewDiscountCodeDialog(props:{open:boolean,handleClose:()=>void,reFetch:any}){
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
    const [codeInfo, setCodeInfo] = useState<codeInfo>(
        {
            name:"",
            description:"",
            percent:0,
            code:"",
            isActive:false,
            endDate:showDate,
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
    const handleCodeChange = (e:any) => {
        setCodeInfo({...codeInfo, code: e.target.value});
    }
    const handleIsActiveChange = (e:any) => {
        setCodeInfo({...codeInfo, isActive: e.target.checked});
    }
    const handleEndDateChange = (e:any) => {
        setCodeInfo({...codeInfo, endDate: e.target.value});
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Discount-Codes`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(codeInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setCodeInfo({
                    name:"",
                    description:"",
                    percent:0,
                    code:"",
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
                console.log(data.errorMessage)
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
    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
            mutate()
        }
    }
    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setCodeInfo({
                    name:"",
                    description:"",
                    percent:0,
                    code:"",
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
                    borderTop:"10px solid rgb(25, 118, 210)",
                }}>
                Tạo mã giảm giá mới
            </DialogTitle>
            <IconButton
                color="primary"
                onClick={()=> {
                    props.handleClose()
                    setCodeInfo({
                        name:"",
                        description:"",
                        percent:0,
                        code:"",
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
                <CloseIcon color="primary" />
            </IconButton>
            <DialogContent dividers>
                <DialogContentText >
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField value={codeInfo.name} onChange={handleNameChange} fullWidth
                                       error={validationError.name.length>0}  helperText={validationError.name}
                                       onKeyDown={handleKeyDown}
                                       color="primary"
                                       size={"medium"} label="Tên" variant="filled" />
                        </Grid>
                        <Grid size={6}>
                            <TextField value={codeInfo.endDate} onChange={handleEndDateChange} fullWidth
                                       color="primary" type="date"
                                       onKeyDown={handleKeyDown}
                                       size={"medium"} label="Hạn dùng" variant="filled" />
                        </Grid>
                        <Grid size={12}>
                            <TextField value={codeInfo.code} onChange={handleCodeChange} fullWidth
                                       color="primary"
                                       onKeyDown={handleKeyDown}
                                       size={"medium"} label="Code" variant="filled" />
                        </Grid>
                        <Grid size={6}>
                            <Switch value={codeInfo.isActive} onChange={handleIsActiveChange} /> Hoạt động
                        </Grid>
                        <Grid size={6}>
                            <TextField value={codeInfo.percent} onChange={handleDPercentChange} fullWidth
                                       type="number" error={validationError.percent.length>0} helperText={validationError.percent}
                                       color="primary"
                                       onKeyDown={handleKeyDown}
                                       size={"medium"} label="Phần trăm" variant="filled" />
                        </Grid>
                        <Grid size={12}>
                            <TextField value={codeInfo.description} onChange={handleDescriptionChange} fullWidth
                                       color="primary"
                                       onKeyDown={handleKeyDown}
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
                                name:"",
                                description:"",
                                percent:0,
                                code:"",
                                isActive:false,
                                endDate:showDate,
                            })
                            setGlobalError("")
                            setValidationError({
                                name:"",
                                percent:""
                            })
                        }}>Hủy</Button>
                        <Button variant="contained" color="primary" onClick={()=> {
                            mutate()
                        }} autoFocus
                        >
                            Tạo
                        </Button>
                    </>

                }

            </DialogActions>
        </Dialog>
    )
}