import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/11_Sep0986ed59f52f60d65f95f8e7021987fc.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function ThermalPage(){
    useEffect(()=>{
        document.title="Tản nhiệt"
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
                    <SubCategoryItem title={"Quạt máy tính"} categoryId={"TANNHIET_QUAT"} redirectLink={"/Tan_Nhiet/Quat"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Kem tản nhiệt"} categoryId={"TANNHIET_KEM"} redirectLink={"/Tan_Nhiet/KEM"}/>
                </Grid>
            </Grid>
        </>
    )
}