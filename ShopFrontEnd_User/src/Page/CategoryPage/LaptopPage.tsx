import Card from "@mui/material/Card";
import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/thang_06_laptop_vp_ld_-_pc.png";
import salebanner1 from "../../assets/thang_04_pc_tang_man_banner_191b3b.jpg";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import BrandItem from "./Component/BrandItem.tsx";
import {useEffect} from "react";

export default function LaptopPage(){
    useEffect(()=>{
        document.title="Laptop"
    },[])
    return(
        <>
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
                        <SubCategoryItem title={"Laptop Gaming"} categoryId={"LAPTOP_GAMING"} redirectLink={"/Laptop/Gaming"}/>
                    </Grid>
                    <Grid size={12} padding={5}>
                        <SubCategoryItem title={"Laptop văn phòng"} categoryId={"LAPTOP_VANPHONG"} redirectLink={"/Laptop/Van_Phong"}/>
                    </Grid>
                    <Grid size={12} padding={5}>
                        <BrandItem title={"Laptop Asus"} brandTag={"ASUS"} categoryId={"LAPTOP"} redirectLink={"/Laptop/Asus"}/>
                    </Grid>
                    <Grid size={12} padding={5}>
                        <BrandItem title={"Laptop Acer"} brandTag={"Acer"} categoryId={"LAPTOP"} redirectLink={"/Laptop/Acer"}/>
                    </Grid>
                </Grid>
        </>
    )
}