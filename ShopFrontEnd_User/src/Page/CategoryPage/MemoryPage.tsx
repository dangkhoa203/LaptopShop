import {CardActionArea, Grid, Paper} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import salebanner from "../../assets/25_Jun67f5266644530c8f02b50888b8dbdc8d.jpg";
import SubCategoryItem from "./Component/SubCategoryItem.tsx";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {useEffect} from "react";

export default function MemoryPage(){
    useEffect(()=>{
        document.title="Ổ cứng"
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
                    <SubCategoryItem title={"SDD"} categoryId={"OCUNG_SDD"} redirectLink={"/Memory/SSD"}/>
                </Grid>
                <Grid size={12} padding={5}>
                    <SubCategoryItem title={"HDD"} categoryId={"OCUNG_HDD"} redirectLink={"/Memory/HDD"}/>
                </Grid>
            </Grid>
        </>
    )
}