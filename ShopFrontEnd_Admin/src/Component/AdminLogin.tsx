import Container from "@mui/material/Container";
import {
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel, LinearProgress, Paper,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Navigate} from "react-router";
import {useUserInfo} from "../State/User.ts";
import * as React from "react";
import {useMutation} from "@tanstack/react-query";


interface loginInfo{
    userName: string;
    password: string;
}
interface loginError{
    Username:string,
    Password:string,
    Global:string
}
export default function AdminLogin(){

    const [loginInfo,setLoginInfo]=useState<loginInfo>({
        userName:"",
        password:"",
    })
    const [validatationError,setValidatationError]=useState<loginError>({
        Username:"",
        Password:"",
        Global:""
    })
    const [showPassword, setShowPassword] = useState(false);
    const checkLoginInfo=()=>{
        const errorModel:loginError={
            Username:'',
            Password:'',
            Global:''
        }
        setValidatationError(errorModel)
        if(loginInfo.userName.length===0||loginInfo.password.length===0){
            setValidatationError({...errorModel,Global:"Chưa nhập thông tin đầy đủ!"})
            return false;
        }
        return true;
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleUserNameChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({...loginInfo,userName:e.target.value});
    }
    const handlePasswordChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({...loginInfo,password:e.target.value});
    }
    const userInfo=useUserInfo((state)=> state.user);
    const reFetch=useUserInfo((state)=> state.reFetch);
    const { isPending, mutate }=useMutation({mutationFn:async ()=>{
            if (checkLoginInfo()) {
                try {
                    const response = await fetch('https://localhost:7075/api/Admin/Account/Login', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify(loginInfo)
                    })
                    if (!response.ok) {
                        const content = await response.json();
                        const errormessage:loginError={
                            Username:"",
                            Password:"",
                            Global:""
                        }
                        if( content.validateError!==null && !content.validateError.isValid) {
                            const list = content.validateError.errors
                            list.forEach((element: any) => {

                                if (element.propertyName === "UserName")
                                    errormessage.Username=element.errorMessage

                                if (element.propertyName === "Password"){
                                    errormessage.Password=element.errorMessage
                                }
                            })
                        }
                        errormessage.Global=content.errorMessage
                        setValidatationError(errormessage)
                    }else{
                        await reFetch()
                    }
                } catch  {
                    console.log("validatationError")
                }
            }
        }});
    const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
            mutate()
        }
    }
    useEffect(()=>{
        document.title="Đăng nhập"
    },[])
    if(userInfo.isLogged)
        return <Navigate to="/" />

    return (

        <Container maxWidth="lg" sx={{display:"flex",justifyContent:"center",minHeight:"100",paddingTop:"100px"}} >
            <Paper elevation={12}
                   property="div"
                   sx={{
                       border:"5px solid #1976d2",
                       minHeight:"330px",
                       maxWidth:"500px",
                       paddingY:"10px",
                       display:"flex",flexDirection:"column"}}  >
                <Typography fontSize={"3em"} textAlign={"center"}>
                    Đăng nhập Admin
                </Typography>
                <Grid container spacing={2} paddingX="50px" paddingTop="20px" paddingBottom="20px" >
                    <Grid sx={{textAlign:'center'}} size={12}>
                        <TextField value={loginInfo.userName} onChange={handleUserNameChange}
                                   onKeyDown={handleKeyDown}
                                   color="info" sx={{fontSize:"1.5em",width:"100%"}}
                                   label="UserName" variant="standard"
                                   error={validatationError.Username.length!==0}
                                   helperText={validatationError.Username}
                        />
                    </Grid>
                    <Grid sx={{textAlign:'center'}} size={12}>
                        <FormControl fullWidth variant="standard">
                            <InputLabel color={validatationError.Password.length!==0 ? "error":"info"} sx={{color:validatationError.Password.length!==0 ?"rgb(211, 47, 47)":""}} >Password</InputLabel>
                            <Input
                                onKeyDown={handleKeyDown}
                                color="info"
                                value={loginInfo.password}
                                error={validatationError.Password.length!==0}
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
                                        >
                                            {!showPassword ? <VisibilityOff className="password-icon" /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <p style={{fontSize:"12px",textAlign:"left",margin:0,marginTop:"3px",color:"rgb(211, 47, 47)"}} >{validatationError.Password}</p>
                    </Grid>
                </Grid>

                <p style={{fontSize:"1.3em",paddingBottom:"10px",textAlign:"center",margin:0,marginTop:"3px",color:"rgb(211, 47, 47)"}}>
                    {validatationError.Global}
                </p>

                {isPending ?
                    <LinearProgress sx={{marginX:"20px",minHeight:"10px"}} color="success" />
                    :
                    <Button sx={{marginX:"100px"}} color={"info"}  onClick={()=>mutate()} variant="outlined">Đăng nhập</Button>
                }

            </Paper>
        </Container>
    )
}