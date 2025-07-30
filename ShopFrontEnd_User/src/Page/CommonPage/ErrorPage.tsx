import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router";

export default function ErrorPage(){
    const navigate=useNavigate();
    return(
        <Container sx={{minHeight:"70vh",display:"flex",flexDirection:"column"}}>
            <div style={{margin:"auto"}}>
                <Typography variant="h3" sx={{marginBottom:"10px"}} textAlign={"center"}>Lỗi xảy ra</Typography>
                <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                    <Button color="secondary" sx={{minWidth:"185px",fontSize:"1em"}} onClick={()=>navigate(`/`)} variant="outlined">Đến trang chủ </Button>
                </div>
            </div>
        </Container>
    )
}