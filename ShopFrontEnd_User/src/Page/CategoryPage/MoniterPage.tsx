import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/05_Febeb00e3c3f19ceda40733b5d4d8f335ed.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function MoniterPage(){
    useEffect(()=>{
        document.title="Màn hình"
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
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Nguồn từ 100W đến 300W"} categoryId={"PSU_100W"} redirectLink={"/PSU/100W"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Nguồn từ 300W đến 500W"} categoryId={"PSU_300W"} redirectLink={"/PSU/300W"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Nguồn từ 500W đến 600W"} categoryId={"PSU_500W"} redirectLink={"/PSU/500W"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Nguồn từ 600W đến 800W"} categoryId={"PSU_600W"} redirectLink={"/PSU/600W"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Nguồn từ 800W trở lên"} categoryId={"PSU_800W"} redirectLink={"/PSU/800W"}/>
                </Grid>
            </Grid>
        </>
    )
}