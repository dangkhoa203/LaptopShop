import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";
import {FormControl, FormHelperText, Grid, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import Typography from "@mui/material/Typography";
type passwordChangeInfo={
    oldPassword:string,
    newPassword:string,
    confirmNewPassword:string,
}
type validationError={
    oldPassword:string,
    newPassword:string,
    confirmNewPassword:string,
    globalError:string,
}
export default function ChangePasswordDialog(props:{open:boolean,handleClose:()=>void}) {
    const [passwordChangeInfo,setPasswordChangeInfo]=useState<passwordChangeInfo>({
        oldPassword:"",
        newPassword:"",
        confirmNewPassword:"",
    });
    const [validationError,setValidationError]=useState<validationError>({
        oldPassword:"",
        newPassword:"",
        confirmNewPassword:"",
        globalError:""
    })
    const handleOldPasswordChange = (e:any)=>{
        setPasswordChangeInfo({...passwordChangeInfo,oldPassword:e.target.value});
    }
    const handleNewPasswordChange = (e:any)=>{
        setPasswordChangeInfo({...passwordChangeInfo,newPassword:e.target.value});
    }
    const handleConfirmNewPasswordChange = (e:any)=>{
        setPasswordChangeInfo({...passwordChangeInfo,confirmNewPassword:e.target.value});
    }
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const close=()=>{
        props.handleClose();
        setPasswordChangeInfo({
            oldPassword:"",
            newPassword:"",
            confirmNewPassword:"",
        })
        setValidationError({
            oldPassword:"",
            newPassword:"",
            confirmNewPassword:"",
            globalError:""
        })
        setSuccess(false)
    }
    const [success,setSuccess]=useState(false)
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setValidationError({
                oldPassword:"",
                newPassword:"",
                confirmNewPassword:"",
                globalError:""
            })
            const response = await fetch(`https://localhost:7075/api/Account/PasswordChange`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(passwordChangeInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setSuccess(true)
            }
            else {
                const error:validationError={
                    oldPassword:"",
                    newPassword:"",
                    confirmNewPassword:"",
                    globalError:""
                }
                if(!data.validationError.isValid){
                    const list:any[]=data.validationError.errors
                    list.forEach(element=>{
                        if(element.propertyName==="OldPassword")
                            error.oldPassword=element.errorMessage
                        if(element.propertyName==="NewPassword")
                            error.newPassword=element.errorMessage
                        if(element.propertyName==="ConfirmNewPassword")
                            error.confirmNewPassword=element.errorMessage
                    })
                }
                error.globalError=data.errorMessage
                setValidationError(error)
            }
        }
    })
    return (
        <Dialog
            open={props.open}
            onClose={close}
            maxWidth="sm"
        >
            <DialogTitle>Thay đổi mật khẩu</DialogTitle>
            <DialogContent>
                {success ?
                    <Grid sx={{paddingTop:"15px",display:"flex",justifyContent:"center"}} container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="h6" textAlign="center">
                                Email xác nhận thay đổi được gửi tới email đăng ký.
                            </Typography>
                        </Grid>
                        <Grid sx={{paddingX:"60px"}} size={12}>
                            <Button fullWidth variant="contained" color="success" onClick={close}>OK</Button>
                        </Grid>
                    </Grid>
                    :
                    <>
                        <DialogContentText>
                            Thay đổi mật khẩu của tài khoản
                        </DialogContentText>
                        <FormControl error={validationError.oldPassword.length>0} sx={{marginTop:"5px"}} fullWidth   variant="standard">
                            <InputLabel >Mật khẩu cũ</InputLabel>
                            <Input
                                value={passwordChangeInfo.oldPassword}
                                onChange={handleOldPasswordChange}
                                type={showOldPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showOldPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowOldPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText >{validationError.oldPassword}</FormHelperText>
                        </FormControl>
                        <FormControl error={validationError.newPassword.length>0} sx={{marginTop:"10px"}} fullWidth   variant="standard">
                            <InputLabel >Mật khẩu mới</InputLabel>
                            <Input
                                value={passwordChangeInfo.newPassword}
                                onChange={handleNewPasswordChange}
                                type={showNewPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showNewPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText >{validationError.newPassword}</FormHelperText>
                        </FormControl>
                        <FormControl error={validationError.confirmNewPassword.length>0} sx={{marginTop:"10px"}} fullWidth  variant="standard">
                            <InputLabel >Xác nhận mật khẩu mới</InputLabel>
                            <Input
                                value={passwordChangeInfo.confirmNewPassword}
                                onChange={handleConfirmNewPasswordChange}
                                type={showNewPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showNewPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText >{validationError.confirmNewPassword}</FormHelperText>
                        </FormControl>
                    </>
                }

            </DialogContent>
            {!success &&
                <DialogActions>

                    <Typography color="error">
                        {validationError.globalError}
                    </Typography>
                    <Button loading={isPending} loadingPosition="end" variant="outlined" onClick={close}>Hủy</Button>
                    <Button loading={isPending} loadingPosition="end" variant="contained" onClick={()=>mutate()}>Thay đổi</Button>
                </DialogActions>
            }

        </Dialog>
    );
}