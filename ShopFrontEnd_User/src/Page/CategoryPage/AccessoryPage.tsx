import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/11_Sep0986ed59f52f60d65f95f8e7021987fc.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function AccessoryPage(){
    useEffect(()=>{
        document.title="Phụ kiện"
    },[])
    return(
        <>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Container>
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
                    </Container>

                </Grid>
                <Grid size={12} >
                    <SubCategoryItem title={"Chuột máy tính"} categoryId={"PHUKIEN_CHUOT"} redirectLink={"/Phu_Kien/Chuot"}/>
                </Grid>
                <Grid size={12} >
                    <SubCategoryItem title={"Lót chuột máy tính"} categoryId={"PHUKIEN_LOTCHUOT"} redirectLink={"/Phu_Kien/Lot_chuot"}/>
                </Grid>
                <Grid size={12} >
                    <SubCategoryItem title={"Bàn phím cơ"} categoryId={"PHUKIEN_PHIMCO"} redirectLink={"/Phu_Kien/Ban_phim_co"}/>
                </Grid>
                <Grid size={12} >
                    <SubCategoryItem title={"Bàn phím văn phòng"} categoryId={"PHUKIEN_PHIMVANPHONG"} redirectLink={"/Phu_Kien/Ban_phim_van_phong"}/>
                </Grid>
                <Grid size={12} >
                    <SubCategoryItem title={"Hub"} categoryId={"PHUKIEN_CAP"} redirectLink={"/Phu_Kien/Hub"}/>
                </Grid>
                <Grid size={12} >
                    <SubCategoryItem title={"Cáp"} categoryId={"PHUKIEN_CAP"} redirectLink={"/Phu_Kien/Cap"}/>
                </Grid>
            </Grid>
        </>
    )
}