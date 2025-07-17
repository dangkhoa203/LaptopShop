import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/11_Sep0986ed59f52f60d65f95f8e7021987fc.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function CasePage(){
    useEffect(()=>{
        document.title="Case máy tính"
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
                    <SubCategoryItem title={"ATX"} categoryId={"CASE_ATX"} redirectLink={"/Case/ATX"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Micro-ATX"} categoryId={"CASE_MICROATX"} redirectLink={"/Case/Micro-ATX"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Mini-ITX"} categoryId={"CASE_MINIITX"} redirectLink={"/Case/Mini-ITX"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Tower"} categoryId={"CASE_Tower"} redirectLink={"/Case/Tower"}/>
                </Grid>
            </Grid>
        </>
    )
}