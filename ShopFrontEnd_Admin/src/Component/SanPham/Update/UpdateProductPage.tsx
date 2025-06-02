import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Container from "@mui/material/Container";
import {useNavigate, useParams} from "react-router";
import UpdateThumbnail from "./MiniComponent/UpdateThumbnail.tsx";
import UpdateProductInfo from "./MiniComponent/UpdateProductInfo.tsx";
import UpdateDescription from "./MiniComponent/UpdateDescription.tsx";
import UpdateImage from "./MiniComponent/UpdateImage.tsx";
import UpdateCaterory from "./MiniComponent/UpdateCaterory.tsx";
import UpdateProductSpecification from "./MiniComponent/UpdateProductSpecification.tsx";
import UpdateCompatibility from "./MiniComponent/UpdateCompatibility.tsx";

export default function UpdateProductPage(){
    const navigate = useNavigate();
    const {id} = useParams() as {id:string};
    return(
        <Container sx={{display:"flex", flexDirection:"column", justifyContent:"center",gap:2}}>
            <Button sx={{width:"200px"}} startIcon={<ArrowBackIosIcon/>} onClick={()=>navigate("..")} variant="contained" color="warning">Quay về</Button>
            <p style={{textAlign:"center",fontSize:"2.5em",margin:"0"}}>Sửa sản phẩm</p>
            <Container sx={{display:"flex", flexDirection: {xs:"column",sm:"column",md:"column",lg:"row"}, justifyContent:"center",gap:2}}>
                <Container sx={{flex:1}}>
                    <UpdateThumbnail id={id}/>
                </Container>
                <Container sx={{flex:2}}>
                    <UpdateProductInfo id={id}/>
                </Container>
            </Container>
            <UpdateImage id={id}/>
            <UpdateDescription id={id}/>
            <UpdateCaterory id={id}/>
            <UpdateProductSpecification id={id}/>
            <UpdateCompatibility id={id}/>
        </Container>
    )
}
