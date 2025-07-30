import {useUserInfo} from "../../State/User.ts";
import {Grid, ThemeProvider} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import {Threedom} from "../../Type/ThreedomPalette.ts";
import ChangePasswordDialog from "./ChangePasswordDialog.tsx";
import {useEffect, useState} from "react";
import ChangeEmailDialog from "./ChangeEmailDialog.tsx";
import {Navigate} from "react-router";

export default function AccountPage(){
    const userInfo=useUserInfo((state)=>state.user)

    const [openEmail,setOpenEmail] = useState(false);
    const handleOpenEmail = () => {
        setOpenEmail(true);
    }
    const handleCloseEmail = () => {
        setOpenEmail(false);
    }

    const [openPassword,setOpenPassword] = useState(false);
    const handleOpenPassword = () => {
        setOpenPassword(true);
    }
    const handleClosePassword = () => {
        setOpenPassword(false);
    }
    useEffect(()=>{
        document.title="Tài khoản"
    },[])
    if((!userInfo.isLogged) && userInfo.userName!=='default'){
        return <Navigate to={"/"}></Navigate>
    }
    return(
        <ThemeProvider theme={Threedom}>
            <Grid container spacing={2} sx={{paddingX:"50px"}} alignItems="center">
                <Grid size={12}>
                    <Typography variant="h3" sx={{textAlign:"center"}} color="textSecondary">
                        Xin chào {userInfo.userName}
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Container maxWidth="sm" sx={{display:"flex",flexDirection:"column",gap:3}}>
                        <Button onClick={handleOpenEmail} fullWidth color="primary" variant="contained">Thay đổi email</Button>
                        <Button onClick={handleOpenPassword} fullWidth color="primary" variant="contained">Thay đổi mật khẩu</Button>
                    </Container>
                </Grid>
            </Grid>
            <ChangePasswordDialog open={openPassword} handleClose={handleClosePassword}/>
            <ChangeEmailDialog open={openEmail} handleClose={handleCloseEmail}/>
        </ThemeProvider>
    )
}