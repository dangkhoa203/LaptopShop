import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/11_Sep0986ed59f52f60d65f95f8e7021987fc.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function PSUPage(){
    useEffect(()=>{
        document.title="Nguôn máy tính"
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
                    <SubCategoryItem title={"Màn hình 60Hz"} categoryId={"MANHINH_60HZ"} redirectLink={"/Man_Hinh/60Hz"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Màn hình 120Hz"} categoryId={"MANHINH_120HZ"} redirectLink={"/Man_Hinh/120Hz"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Màn hình 1080"} categoryId={"MANHINH_1080P"} redirectLink={"/Man_Hinh/1080p"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Màn hình 2K"} categoryId={"MANHINH_2K"} redirectLink={"/Man_Hinh/2K"}/>
                </Grid>
            </Grid>
        </>
    )
}