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

export default function CreateNewSpecificationDiaglog(props:{open:boolean,handleClose:()=>void,reFetch:any}){
    const [globalError, setGlobalError] = useState("");
    const [validateError, setValidateError] = useState("");
    const [name, setName] = useState("");
    const handleNameChange = (e:any) => {
        setName(e.target.value);
    }

    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Specifications`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({name:name})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setName("")
                setGlobalError("")
                setValidateError("")
                props.reFetch()
            }
            else {
                setGlobalError(data.errorMessage)
                if(!data.validationError.isValid){
                    setValidateError(data.validationError.errors[0].errorMessage)
                }
            }
        }
    })
    return(
        <Dialog
            open={props.open}
            onClose={()=> {
                props.handleClose()
                setName("")
                setGlobalError("")
                setValidateError("")
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    borderTop:"10px solid rgb(25, 118, 210)",
                }}>
                Tạo thông số mới
            </DialogTitle>
            <IconButton
                color="primary"
                onClick={()=> {
                    props.handleClose()
                    setName("")
                    setGlobalError("")
                    setValidateError("")
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
                        <Grid size={12}>
                            <TextField value={name} onChange={handleNameChange} fullWidth
                                       error={validateError.length>0}  helperText={validateError}
                                       color="primary"
                                       size={"medium"} label="Tên" variant="filled" />
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
                            setName("")
                            setGlobalError("")
                            setValidateError("")
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