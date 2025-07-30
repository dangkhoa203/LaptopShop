import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle, FormControl, FormHelperText,
    Grid, InputAdornment, InputLabel, OutlinedInput,
    TextField,
    Link
} from "@mui/material";
import {AccountCircle, Visibility, VisibilityOff} from "@mui/icons-material";
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import IconButton from "@mui/material/IconButton";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useAppNotify} from "../../State/AppGlobalNotifyState.ts";

type validationError={
    userName: string,
    password: string,
    confirmPassword: string,
    email: string,
    globalError: string,
}
type registerInfo={
    userName: string,
    password: string,
    confirmPassword: string,
    email: string,
}
export default function RegisterDialog(props:{open:boolean,handleClose:()=>void,openLogin:()=>void,isLoggedIn:boolean}){
    const [validateError, setValidateError] = useState<validationError>(
        {
            userName:"",
            password:"",
            confirmPassword:"",
            email:"",
            globalError:"",
        }
    );
    const [registerInfo, setRegisterInfo] = useState<registerInfo>({
        userName:"",
        password:"",
        confirmPassword:"",
        email:"",
    })
    const [success, setSuccess] = useState<boolean>(false);
    const handleUserNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRegisterInfo({...registerInfo, userName:event.target.value})
    }
    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRegisterInfo({...registerInfo, password:event.target.value})
    }
    const handleConfirmPasswordChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRegisterInfo({...registerInfo, confirmPassword:event.target.value})
    }
    const handleEmailChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRegisterInfo({...registerInfo, email:event.target.value})
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const globalNotify=useAppNotify()
    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setValidateError({
                userName:"",
                password:"",
                confirmPassword:"",
                email:"",
                globalError:"",
            })
            const response = await fetch(`https://localhost:7075/api/Account/Register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(registerInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                globalNotify.setNotify("Đăng ký thành công")
                setSuccess(true)
            }
            else {
                const error:validationError={
                    userName:"",
                    password:"",
                    confirmPassword:"",
                    email:"",
                    globalError:"",
                }
                if(!data.validationError.isValid){
                    const list:any[]=data.validationError.errors
                    list.forEach(element=>{
                        if(element.propertyName==="Username")
                            error.userName=element.errorMessage
                        if(element.propertyName==="Password")
                            error.password=element.errorMessage
                        if(element.propertyName==="ConfirmPassword")
                            error.confirmPassword=element.errorMessage
                        if(element.propertyName==="Email")
                            error.email=element.errorMessage
                    })
                }
                error.globalError=data.errorMessage
                setValidateError(error)
            }
        }
    })
    const close=()=>{
        props.handleClose()
        setRegisterInfo({
            userName:"",
            password:"",
            confirmPassword:"",
            email:"",
        })
        setValidateError({
            userName:"",
            password:"",
            confirmPassword:"",
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
            hideBackdrop={false}
        >
            <DialogTitle sx={{border:"1px solid orange",borderBottom:0,textAlign:"center",fontSize:"2.5em",fontWeight:"bold",fontFamily: "Quicksand"}}>
                Đăng ký
            </DialogTitle>
            <DialogContent sx={{border:"1px solid orange",borderTop:0,minHeight:"300px",padding:"50px"}} >
                {success ?
                    <Grid sx={{paddingTop:"15px",display:"flex",justifyContent:"center"}} container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="h5">
                                Email xác nhận sẽ được gửi tới email đăng ký.
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
                                value={registerInfo.userName} onChange={handleUserNameChange} fullWidth
                                error={validateError.userName.length>0}  helperText={validateError.userName}
                                color="warning"
                                label="Tên đăng nhập"
                                onKeyDown={(event)=>{
                                    if(event.key === 'Enter'){
                                        mutate()
                                    }
                                }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                value={registerInfo.email} onChange={handleEmailChange} fullWidth
                                error={validateError.email.length>0}  helperText={validateError.email}
                                color="primary"
                                type="email"
                                label="Email"
                                onKeyDown={(event)=>{
                                    if(event.key === 'Enter'){
                                        mutate()
                                    }
                                }}
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
                        <Grid size={6}>
                            <FormControl   error={validateError.password.length!==0}  fullWidth variant="outlined">
                                <InputLabel>Mật khẩu</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    color="primary"
                                    value={registerInfo.password}
                                    onChange={handlePasswordChange}
                                    type={showPassword ? 'text' : 'password'}
                                    onKeyDown={(event)=>{
                                        if(event.key === 'Enter'){
                                            mutate()
                                        }
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText >{validateError.password}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl error={validateError.confirmPassword.length!==0}  fullWidth variant="outlined">
                                <InputLabel>Xác nhận </InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    color="primary"
                                    value={registerInfo.confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    onKeyDown={(event)=>{
                                        if(event.key === 'Enter'){
                                            mutate()
                                        }
                                    }}
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText >{validateError.confirmPassword}</FormHelperText>
                            </FormControl>
                        </Grid>
                        {validateError.globalError.length>0 &&
                            <Grid sx={{textAlign:'center',minHeight:"19px",color:"red"}} size={12}>
                                {validateError.globalError}
                            </Grid>
                        }
                        <Grid size={12}>
                            <Link
                                sx={{fontFamily:"Mandrop",fontSize:"1.1em"}}
                                color="secondary"
                                underline="hover"
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    close()
                                    props.openLogin()
                                }}
                            >
                                Đã có tài khoản?
                            </Link>
                        </Grid>
                        <Grid sx={{paddingX:"60px"}} size={12}>
                            <Button fullWidth loading={isPending} loadingPosition="end" variant="contained" color="success" onClick={()=>mutate()}>Đăng ký</Button>
                        </Grid>
                    </Grid>
                }

            </DialogContent>
        </Dialog>
    )
}