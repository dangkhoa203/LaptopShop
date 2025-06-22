import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {Grid, InputAdornment, TextField} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import Typography from "@mui/material/Typography";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
type emailChangeInfo={
    oldEmail:string,
    newEmail:string,
}

export default function ChangeEmailDialog(props:{open:boolean,handleClose:()=>void}) {
    const [emailChangeInfo, setEmailChangeInfo] = useState<emailChangeInfo>({
        newEmail:"",
        oldEmail:""
    });
    const handleOldEmailChange=(e:any)=>{
        setEmailChangeInfo({...emailChangeInfo,oldEmail:e.target.value});
    }
    const handleNewEmailChange=(e:any)=>{
        setEmailChangeInfo({...emailChangeInfo,newEmail:e.target.value});
    }
    const [globalError, setGlobalError] = useState("");
    const close=()=>{
        props.handleClose();
        setEmailChangeInfo({
            newEmail:"",
            oldEmail:""
        })
        setGlobalError("")
        setSuccess(false)
    }
    const [success,setSuccess]=useState(false)
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setGlobalError("")
            const response = await fetch(`https://localhost:7075/api/Account/EmailChange`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(emailChangeInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setSuccess(true)
            }
            else {
                setGlobalError(data.errorMessage)
            }
        }
    })
    return (
        <Dialog
            open={props.open}
            onClose={close}
            maxWidth="sm"
        >
            <DialogTitle>Thay đổi email</DialogTitle>
            <DialogContent>
                {success ?
                    <Grid sx={{paddingTop:"15px",display:"flex",justifyContent:"center"}} container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="h6" textAlign="center">
                                Email xác nhận thay đổi được gửi tới email cũ.
                            </Typography>
                        </Grid>
                        <Grid sx={{paddingX:"60px"}} size={12}>
                            <Button fullWidth variant="contained" color="success" onClick={close}>OK</Button>
                        </Grid>
                    </Grid>
                    :
                    <>
                        <DialogContentText>
                            Thay đổi email của tài khoản
                        </DialogContentText>
                        <TextField
                            value={emailChangeInfo.oldEmail} onChange={handleOldEmailChange} fullWidth
                            margin="dense"
                            color="primary"
                            type="email"
                            label="Email cũ"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AlternateEmailIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                        />
                        <TextField
                            value={emailChangeInfo.newEmail} onChange={handleNewEmailChange} fullWidth
                            margin="dense"
                            color="primary"
                            type="email"
                            label="Email mới"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <AlternateEmailIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                        />
                    </>
                }

            </DialogContent>
            {!success &&
                <DialogActions>

                    <Typography color="error">
                        {globalError}
                    </Typography>
                    <Button loading={isPending} loadingPosition="end" variant="outlined" onClick={close}>Hủy</Button>
                    <Button loading={isPending} loadingPosition="end" variant="contained" onClick={()=>mutate()}>Thay đổi</Button>
                </DialogActions>
            }

        </Dialog>
    );
}