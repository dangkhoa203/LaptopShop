import {useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ChangeEmailDialog(props:{username:string,email:string,id:string,open:boolean,handleClose:()=>void,reFetch:any}) {
    const [newEmail, setNewEmail] = useState('');
    const [globalError, setGlobalError] = useState("");
    const [validateError, setValidateError] = useState<string>("");
    const handleEmailPassword=(e:any)=>{
        setNewEmail(e.target.value);
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Account/Email/${props.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({email:newEmail})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                props.handleClose()
                setNewEmail("")
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
                setNewEmail("")
                setGlobalError("")
                setValidateError("")
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    borderTop:"10px solid rgb(230, 81, 0)",
                }}>
                Thay đổi email người dùng {props.username}
            </DialogTitle>
            <IconButton
                color="warning"
                onClick={()=> {
                    props.handleClose()
                    setNewEmail("")
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
                <CloseIcon color="warning" />
            </IconButton>
            <DialogContent dividers>
                <DialogContentText >
                    <Typography sx={{marginBottom:"5px"}}>
                        Email cũ: {props.email}
                    </Typography>
                    <TextField type="email" value={newEmail} onChange={handleEmailPassword} fullWidth
                               onKeyDown={handleKeyDown}
                               error={validateError.length>0}  helperText={validateError}
                               color="warning"
                               size={"medium"} label="Email mới" variant="filled" />
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
                            setNewEmail("")
                            setGlobalError("")
                            setValidateError("")
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