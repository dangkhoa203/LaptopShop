import {useParams, Navigate, useNavigate} from "react-router"
import {useState, useEffect} from "react"
import {useMutation} from "@tanstack/react-query";
import {Response} from "../../Type/Respone.ts";
import {useUserInfo} from "../../State/User.ts";
import Container from "@mui/material/Container";
import {CircularProgress, FormControl, FormHelperText, Grid, Input, InputAdornment, InputLabel} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";


export default function ResetMatKhau() {

    const navigate = useNavigate();

    const {id, code} = useParams()
    const [validId, setValidId] = useState<number>(2)
    const [error, setError] = useState<string>("")
    const [validationError, setValidatationError] = useState<any>({
        newPassword: "",
        confirmNewPassword: "",
    })
    const [data,setData] = useState<any>({
        newPassword: "",
        confirmNewPassword: "",
    })
    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data,newPassword: e.target.value})
    }
    const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data,confirmNewPassword: e.target.value})
    }
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const checkId=useMutation({
        mutationFn:async ()=>{
            const response = await fetch(`https://localhost:7075/api/Account/PasswordReset/ResetValidation/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })
            return await response.json();
        },
        onSuccess:(data:Response)=>{
            if(data.success){
                setValidId(1)
            }
            else {
                setValidId(0)
            }
        }
    })


    const [success,setSuccess]=useState(false)
    const sendChange=useMutation({
        mutationFn:async ()=>{
                const response = await fetch(`https://localhost:7075/api/Account/PasswordReset/${id}/${code}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                return await response.json();

        },
        onSuccess:(data:Response)=>{
            if(data!==null){
                if(data.success){
                    setSuccess(true)
                }
                else {
                    if(!data.validationError.isValid){
                        const list:any=data.validationError.errors
                        const error={
                            newPassword: "",
                            confirmNewPassword: "",
                        }
                        list.forEach((element:any) => {
                            if(element.propertyName==="NewPassword")
                                error.newPassword=element.errorMessage
                            if(element.propertyName==="ConfirmNewPassword")
                                error.confirmNewPassword=element.errorMessage
                        })
                        setValidatationError(error)
                        setError(data.errorMessage)
                    }
                }
            }

        }
    })
    const userInfo=useUserInfo(state=>state.user)
    useEffect(() => {
        document.title = 'Xác nhận';
        checkId.mutate()
    }, [])
    if (userInfo.isLogged) {
        return <Navigate to="/Loi"></Navigate>
    }
    if(validId===0){
        return <Navigate to="/Loi"></Navigate>
    }
    return (
        <Container>
            {checkId.isPending ?
                <Box sx={{minHeight:"80vh",display:"flex",justifyContent:"center"}}>
                    <div style={{display:"flex",flexDirection:"column",margin:"auto", justifyContent:"center"}}>
                        <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}>
                            <CircularProgress sx={{textAlign:"center"}} size="3rem" />
                        </div>
                    </div>
                </Box>
                :
                <>
                    {success ?
                        <Box sx={{minHeight:"80vh",display:"flex",justifyContent:"center"}}>
                            <div style={{display:"flex",flexDirection:"column",margin:"auto", justifyContent:"center"}}>
                                <Typography textAlign={"center"} color={"success"} variant={"h4"}>Thay đổi mật khẩu tài khoản thành công</Typography>
                                <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
                                    <Button onClick={()=>navigate("/")} variant={"contained"} color="success">Quay về trang chủ</Button>
                                </div>
                            </div>
                        </Box>
                        :
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <FormControl error={validationError.newPassword.length>0} sx={{marginTop:"5px"}} fullWidth   variant="standard">
                                    <InputLabel >Mật khẩu mới</InputLabel>
                                    <Input
                                        value={data.newPassword}
                                        onChange={handleNewPasswordChange}
                                        type={showNewPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
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
                            </Grid>
                            <Grid size={6}>
                                <FormControl error={validationError.confirmNewPassword.length>0} sx={{marginTop:"5px"}} fullWidth   variant="standard">
                                    <InputLabel >Xác nhận mật khẩu</InputLabel>
                                    <Input
                                        value={data.confirmNewPassword}
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
                            </Grid>
                            <Grid size={12}>
                                <Typography variant={"h6"} color={"error"}>{error}</Typography>
                            </Grid>
                            <Grid sx={{display:"flex",justifyContent:"center"}} size={12}>
                                <Button loading={sendChange.isPending} onClick={()=>sendChange.mutate()} sx={{width:"190px"}} variant="contained">Thay đổi</Button>
                            </Grid>
                        </Grid>
                    }
                </>

            }

        </Container>
    )
}