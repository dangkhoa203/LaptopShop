import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/14_Sep385fec783516626ced0fce5ab8e727ab.png";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function RAMPage(){
    useEffect(()=>{
        document.title="RAM"
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
                    <SubCategoryItem title={"RAM DDR4"} categoryId={"RAM_DDR4"} redirectLink={"/RAM/DDR4"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"RAM DDR5"} categoryId={"RAM_DDR5"} redirectLink={"/RAM/DDR5"}/>
                </Grid>
            </Grid>
        </>
    )
}