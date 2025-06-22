import {useState} from "react";
import {
    Checkbox,
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
import Button from "@mui/material/Button";

type validationError={
    userName: string,
    password: string,
    globalError: string,
}
type loginInfo={
    userName: string,
    password: string,
    remember: boolean,
}
export default function LoginDialog(props:{open:boolean,handleClose:()=>void,openRegister:()=>void,openReset:()=>void,reFetch:any,isLoggedIn:boolean}){
    const [validateError, setValidateError] = useState<validationError>(
        {
            userName:"",
            password:"",
            globalError:"",
        }
    );
    const [loginInfo, setLoginInfo] = useState<loginInfo>({
        userName:"",
        password:"",
        remember: false,
    })

    const handleUserNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginInfo({...loginInfo, userName:event.target.value})
    }
    const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginInfo({...loginInfo, password:event.target.value})
    }
    const handleRememberChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({...loginInfo,remember:e.target.checked});
    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {isPending,mutate}=useMutation({
        mutationFn:async ()=>{
            setValidateError({
                userName:"",
                password:"",
                globalError:"",
            })
            const response = await fetch(`https://localhost:7075/api/Account/Login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(loginInfo)
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                close()
                props.reFetch()
            }
            else {
                const error:validationError={
                    userName:"",
                    password:"",
                    globalError:"",
                }
                if(!data.validationError.isValid){
                    const list:any[]=data.validationError.errors
                    list.forEach(element=>{
                        if(element.propertyName==="Username")
                            error.userName=element.errorMessage
                        if(element.propertyName==="Password")
                            error.password=element.errorMessage
                    })
                }
                error.globalError=data.errorMessage
                setValidateError(error)
            }
        }
    })
    const close=()=>{
        props.handleClose()
        setLoginInfo({
            userName:"",
            password:"",
            remember: false,
        })
        setValidateError({
            userName:"",
            password:"",
            globalError:"",
        })
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
                    Đăng nhập
                </DialogTitle>
                <DialogContent sx={{border:"1px solid orange",borderTop:0,minHeight:"300px",padding:"50px"}} >
                    <Grid sx={{paddingTop:"15px"}} container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                value={loginInfo.userName} onChange={handleUserNameChange} fullWidth
                                error={validateError.userName.length>0}  helperText={validateError.userName}
                                color="primary"
                                label="Tên đăng nhập"
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
                            <FormControl   error={validateError.password.length!==0}  fullWidth variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    color="primary"
                                    value={loginInfo.password}

                                    onChange={handlePasswordChange}
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
                                    label="Mật khẩu"
                                />
                                <FormHelperText >{validateError.password}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid sx={{textAlign:'start'}} size={12}>
                            <Checkbox value={loginInfo.remember} onChange={handleRememberChange} color={"primary"} sx={{marginLeft:0}}/>
                            <span
                                style={{fontSize:"14px",transition:"0.3s all"}}>Nhớ đăng nhập</span>
                        </Grid>
                        {validateError.globalError.length>0 &&
                            <Grid sx={{textAlign:'center',minHeight:"19px",color:"red"}} size={12}>
                                {validateError.globalError}
                            </Grid>
                        }
                        <Grid size={12}>
                            <Link
                                color="secondary"
                                underline="hover"
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    close()
                                    props.openRegister()
                                }}
                            >
                                Chưa có tài khoản?
                            </Link>
                        </Grid>
                        <Grid size={12}>
                            <Link
                                color="secondary"
                                underline="hover"
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    close()
                                    props.openReset()
                                }}
                            >
                                Quên mật khẩu?
                            </Link>
                        </Grid>
                        <Grid sx={{paddingX:"60px"}} size={12}>
                            <Button fullWidth loading={isPending} loadingPosition="end" variant="contained" color="success" onClick={()=>mutate()}>Đăng nhập</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
    )
}