import Card from "@mui/material/Card";
import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/28_Oct8c7956d0b3ecd3d5cfbbbbc90fd597b6.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import {useEffect} from "react";

export default function CPUPage(){
    useEffect(()=>{
        document.title="CPU"
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
                    <SubCategoryItem title={"CPU Intel"} categoryId={"CPU_Intel"} redirectLink={"/CPU/Intel"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"CPU AMD"} categoryId={"CPU_AMD"} redirectLink={"/CPU/AMD"}/>
                </Grid>
            </Grid>
        </>
    )
}