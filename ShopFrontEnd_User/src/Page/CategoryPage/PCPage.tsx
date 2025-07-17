import Card from "@mui/material/Card";
import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/banner_pc-van-phong-ttg_12_cd1455fee7544920a62088fc83973a2d.jpg";
import salebanner1 from "../../assets/best-pc-cases_copy_dcd36f7314434aae9c41ebfe31662933.jpg";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import BrandItem from "./Component/BrandItem.tsx";
import {useEffect} from "react";

export default function PCPage(){
    useEffect(()=>{
        document.title="Máy tính"
    },[])
    return(
        <>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Paper elevation={6}>
                        <Card sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={salebanner}
                                    height={"auto"}
                                    alt="sale"
                                />
                            </CardActionArea>
                        </Card>
                    </Paper>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Máy tính văn phòng"} categoryId={"PC_VANPHONG"} redirectLink={"/PC/Van_Phong"}/>
                </Grid>
                <Grid size={12}>
                    <Paper elevation={6}>
                        <Card sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={salebanner1}
                                    height={"auto"}
                                    alt="sale"
                                />
                            </CardActionArea>
                        </Card>
                    </Paper>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Máy tính Gaming"} categoryId={"PC_GAMING"} redirectLink={"/PC/Van_Phong"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <BrandItem title={"PC Asus"} brandTag={"ASUS"} categoryId={"PC"} redirectLink={"/PC/Asus"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <BrandItem title={"PC MSI"} brandTag={"MSI"} categoryId={"LAPTOP"} redirectLink={"/PC/MSI"}/>
                </Grid>
            </Grid>
        </>
    )
}