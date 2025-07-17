import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/14_Sepd84bf66551a540c7aa404989b210d888.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function CardPage(){
    useEffect(()=>{
        document.title="Card đồ họa"
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
                    <SubCategoryItem title={"Card đồ họa Nvidia"} categoryId={"CARD_NVIDIA"} redirectLink={"/GPU/Nvidia"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Card đồ họa Intel"} categoryId={"CARD_Intel"} redirectLink={"/GPU/Intel"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Card đồ họa AMD"} categoryId={"CARD_AMD"} redirectLink={"/GPU/AMD"}/>
                </Grid>
            </Grid>
        </>
    )
}