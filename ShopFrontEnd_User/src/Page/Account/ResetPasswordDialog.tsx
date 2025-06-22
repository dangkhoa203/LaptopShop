import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid, InputAdornment,
    TextField,
} from "@mui/material";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type validationError={
    email: string,
    globalError: string,
}
type resetInfo={
    email: string,
}
export default function ResetPasswordDialog(props:{open:boolean,handleClose:()=>void,openLogin:()=>void,isLoggedIn:boolean}){
    const [validateError, setValidateError] = useState<validationError>(
        {
            email:"",
            globalError:"",
        }
    );
    const [resetInfo, setRegisterInfo] = useState<resetInfo>({
        email:"",
    })
    const [success, setSuccess] = useState<boolean>(false);

    const handleEmailChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRegisterInfo({...resetInfo, email:event.target.value})
    }


    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setValidateError({
                email:"",
                globalError:"",
            })
            const response = await fetch(`https://localhost:7075/api/Account/Register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(resetInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setSuccess(true)
            }
            else {
                const error:validationError={
                    email:"",
                    globalError:"",
                }
                if(!data.validationError.isValid){
                    error.email=data.validationError.errors[0].errorMessage
                }
                error.globalError=data.errorMessage
                setValidateError(error)
            }
        }
    })
    const close=()=>{
        props.handleClose()
        setRegisterInfo({
            email:"",
        })
        setValidateError({
            email:"",
            globalError:"",
        })
        setSuccess(false)
    }
    if(props.isLoggedIn){
        props.handleClose()
    }
    return (
        <Dialog
            open={props.open}
            onClose={close}
            fullWidth
            maxWidth="sm"
            hideBackdrop={true}
        >
            <DialogTitle sx={{border:"1px solid orange",borderBottom:0,textAlign:"center",fontSize:"2em"}}>
                Quên mật khẩu
            </DialogTitle>
            <DialogContent sx={{border:"1px solid orange",borderTop:0,minHeight:"300px",padding:"50px"}} >
                {success ?
                    <Grid sx={{paddingTop:"15px",display:"flex",justifyContent:"center"}} container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="h5">
                                Email thay đổi mật khẩu sẽ được gửi tới email người dùng.
                            </Typography>
                        </Grid>
                        <Grid sx={{paddingX:"60px"}} size={12}>
                            <Button fullWidth variant="contained" color="success" onClick={close}>Quay về</Button>
                        </Grid>
                    </Grid>
                    :
                    <Grid sx={{paddingTop:"15px"}} container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                value={resetInfo.email} onChange={handleEmailChange} fullWidth
                                error={validateError.email.length>0}  helperText={validateError.email}
                                color="primary"
                                type="email"
                                label="Email"
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AlternateEmailIcon />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        {validateError.globalError.length>0 &&
                            <Grid sx={{textAlign:'center',minHeight:"19px",color:"red"}} size={12}>
                                {validateError.globalError}
                            </Grid>
                        }
                        <Grid sx={{paddingX:"60px"}} size={12}>
                            <Button fullWidth loading={isPending} loadingPosition="end" variant="contained" color="success" onClick={()=>mutate()}>Gửi yêu cầu đặt lại mật khẩu</Button>
                        </Grid>
                        <Grid sx={{paddingX:"60px"}} size={12}>
                            <Button fullWidth variant="contained" color="secondary" onClick={()=>{
                                close()
                                props.openLogin()
                            }}>Quay về</Button>
                        </Grid>
                    </Grid>
                }

            </DialogContent>
        </Dialog>
    )
}