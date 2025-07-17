import Card from "@mui/material/Card";
import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/14_Sepb4eb35e60d6f2414bfa23b0cc28a8bce.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import {useEffect} from "react";

export default function MotherBoardPage(){
    useEffect(()=>{
        document.title="Bo mạch"
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
                    <SubCategoryItem title={"Bo mạch AMD"} categoryId={"MOTHERBOARD_AMD"} redirectLink={"/Bo_Mach/AMD"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"Bo mạch Intel"} categoryId={"MOTHERBOARD_Intel"} redirectLink={"/Bo_Mach/Intel"}/>
                </Grid>

            </Grid>
        </>
    )
}