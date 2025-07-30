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

export default function ChangePasswordDialog(props:{username:string,id:string,open:boolean,handleClose:()=>void,reFetch:any}) {
    const [newPassword, setNewPassword] = useState('');
    const [globalError, setGlobalError] = useState("");
    const [success, setSuccess] = useState<boolean>(false);
    const [validateError, setValidateError] = useState<string>("");
    const handlePassword=(e:any)=>{
        setNewPassword(e.target.value);
    }
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Admin/Account/Password/${props.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({password:newPassword})
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setSuccess(true);
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
                setNewPassword("")
                setGlobalError("")
                setValidateError("")
                setSuccess(false)
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    fontFamily:"Open sans",
                    letterSpacing:1,
                    borderTop:"10px solid rgb(230, 81, 0)",
                }}>
                Thay đổi mật khẩu người dùng <span style={{fontWeight:700}}>{props.username}</span>
            </DialogTitle>
            <IconButton
                color="secondary"
                onClick={()=> {
                    props.handleClose()
                    setNewPassword("")
                    setGlobalError("")
                    setValidateError("")
                    setSuccess(false)
                }}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon color="secondary" />
            </IconButton>
            <DialogContent dividers>
                <DialogContentText >
                    <TextField value={newPassword} onChange={handlePassword} fullWidth
                               onKeyDown={handleKeyDown}
                               error={validateError.length>0}  helperText={validateError}
                               color="secondary" disabled={success}
                               size={"medium"} label="Mật khẩu mới" variant="filled" />
                </DialogContentText>

            </DialogContent>
            <DialogActions sx={{minHeight:"55px"}}>
                {isPending?
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                    :
                    success ?
                        <>
                            <div style={{color:"green"}}>
                                Thay đổi thành công
                            </div>
                            <Button color="success" variant={"outlined"} onClick={()=> {
                                props.handleClose()
                                setNewPassword("")
                                setGlobalError("")
                                setValidateError("")
                                setSuccess(false)
                            }}>Quay về</Button>
                        </>
                    :
                        <>
                            <div style={{color:"red"}}>
                                {globalError}
                            </div>
                            <Button color="error" variant={"outlined"} onClick={()=> {
                                props.handleClose()
                                setNewPassword("")
                                setGlobalError("")
                                setValidateError("")
                                setSuccess(false)
                            }}>Hủy</Button>
                            <Button variant="contained" color="secondary" onClick={()=> {
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