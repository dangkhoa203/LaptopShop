import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {Navigate, useNavigate} from "react-router";
import {useUserInfo} from "../../State/User.ts";


export default function NotFoundPage(){
    const navigate=useNavigate();
    const userInfo=useUserInfo((state)=> state.user);
    if(!userInfo.isLogged && userInfo.userName!=="default"){
        return <Navigate to="/Login" />
    }
    return(
        <Container sx={{minHeight:"70vh",display:"flex",flexDirection:"column"}}>
            <div style={{margin:"auto"}}>
                <Typography variant="h3" sx={{marginBottom:"10px"}} textAlign={"center"}>Không tìm thấy trang bạn đang tìm</Typography>
                <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    <Button color="secondary" sx={{minWidth:"185px",fontSize:"1em"}} onClick={()=>navigate(`/`)} variant="outlined">Đến trang chủ </Button>
                </div>
            </div>
        </Container>
    )
}