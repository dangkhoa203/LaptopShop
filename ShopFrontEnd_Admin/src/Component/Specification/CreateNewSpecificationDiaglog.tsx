import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid,
    LinearProgress,
    TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
type brandInfo = {
    name: string,
    tag: string
}
export default function CreateNewSpecificationDiaglog(props:{open:boolean,handleClose:()=>void,reFetch:any}){
    const [globalError, setGlobalError] = useState("");
    const [validateError, setValidateError] = useState<brandInfo>(
        {
            name:"",
            tag:""
        }
    );
    const [brandInfo, setBrandInfo] = useState<brandInfo>(
        {
            name:"",
            tag:""
        }
    );
    const handleNameChange = (e:any) => {
        setBrandInfo({...brandInfo, name: e.target.value});
    }
    const handleTagChange = (e:any) => {
        setBrandInfo({...brandInfo, tag: e.target.value.toUpperCase()});
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Brands`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(brandInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setBrandInfo({
                    name:"",
                    tag:""
                })
                setGlobalError("")
                setValidateError({
                    name:"",
                    tag:""
                })
                props.reFetch()
            }
            else {
                console.log(data.errorMessage)
                setGlobalError(data.errorMessage)
                if(!data.validationError.isValid){
                    const list:any[]=data.validationError.errors
                    const error:brandInfo={
                        name:"",
                        tag:""
                    }
                    list.forEach(element=>{
                        if(element.propertyName==="Tag")
                            error.tag=element.errorMessage
                        if(element.propertyName==="Name")
                            error.name=element.errorMessage
                    })
                    setValidateError(error)
                }
            }
        }
    })
    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setBrandInfo({
                    name:"",
                    tag:""
                })
                setGlobalError("")
                setValidateError({
                    name:"",
                    tag:""
                })
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    borderTop:"10px solid rgb(25, 118, 210)",
                }}>
                Tạo hãng mới
            </DialogTitle>
            <IconButton
                color="primary"
                onClick={()=> {
                    props.handleClose()
                    setBrandInfo({
                        name:"",
                        tag:""
                    })
                    setGlobalError("")
                    setValidateError({
                        name:"",
                        tag:""
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
                            <TextField value={brandInfo.name} onChange={handleNameChange} fullWidth
                                       error={validateError.name.length>0}  helperText={validateError.name}
                                       color="primary"
                                       size={"medium"} label="Tên" variant="filled" />
                        </Grid>
                        <Grid size={6}>
                            <TextField value={brandInfo.tag} onChange={handleTagChange} fullWidth
                                       error={validateError.tag.length>0}  helperText={validateError.tag}
                                       color="primary"
                                       size={"medium"} label="Tag" variant="filled" />
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
                            setBrandInfo({
                                name:"",
                                tag:""
                            })
                            setGlobalError("")
                            setValidateError({
                                name:"",
                                tag:""
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