import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import Container from "@mui/material/Container";
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../assets/banner1.jpg"
import banner2 from "../assets/banner2.jpg"
import banner3 from "../assets/banner3.jpg"
import banner4 from "../assets/banner4.jpg"
import banner5 from "../assets/banner5.jpg"
import banner7 from "../assets/banner7.gif"
import banner8 from "../assets/thang_04_pc_tang_man_banner_191b3b.jpg"
import banner9 from "../assets/home_tabs_6_banner.jpg"
import {CardActionArea, Grid, Paper} from "@mui/material";
import MainPageMainCategoryProduct from "./Product/Component/MainPageMainCategoryProduct.tsx";
import MainPageCategory from "./MainPageCategory.tsx";
import {useEffect} from "react";
import MainPageMainCategoryProductStyle2 from "./Product/Component/MainPageMainCategoryProductStyle2.tsx";



export default function HomePage() {
    useEffect(()=>{
        document.title="DKShop"
    },[])
    return (
        <Container sx={{display: "flex", justifyContent: "center",flexDirection:"column", alignItems:"center",gap:3}}>
            <div>
                <Paper elevation={12} sx={{marginBottom:"30px"}}>
                    <Carousel
                        showThumbs={false} showStatus={false} stopOnHover autoPlay={true} infiniteLoop={true} dynamicHeight={false}>
                        <Card sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={banner1}

                                    alt="green iguana"
                                />
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={banner2}
                                    height={"auto"}
                                    alt="green iguana"
                                />
                            </CardActionArea>
                        </Card>
                        <Card sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={banner3}
                                    alt="green iguana"
                                />
                            </CardActionArea>
                        </Card>
                    </Carousel>
                </Paper>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Card elevation={6} sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={banner4}
                                    alt="green iguana"
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={6}>
                        <Card elevation={6} sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={banner5}
                                    alt="green iguana"
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={12}>
                        <MainPageCategory/>
                    </Grid>
                </Grid>
            </div>
            <MainPageMainCategoryProduct isMain={true} category={"Máy tính"} categoryId={"PC"} redirectLink={"/PC"}/>
            <Paper elevation={6}>
                <Card sx={{ maxWidth: "100%" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={banner7}
                            height={"auto"}
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Card>
            </Paper>


            <MainPageMainCategoryProduct isMain={true} category={"Máy laptop"} categoryId={"LAPTOP"} redirectLink={"/Laptop"}/>
            <Paper elevation={6}>
                <Card sx={{ maxWidth: "100%" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={banner8}
                            height={"auto"}
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Card>
            </Paper>
            <MainPageMainCategoryProduct isMain={true} category={"Bo mạch"} categoryId={"MOTHERBOARD"} redirectLink={"/Bo_Mach"}/>

            <Grid container spacing={2}>
                <Grid sx={{display:{xs:"none",sm:"none",md:"block",lg:"block"}}} size={4}>
                    <Paper elevation={6}>
                        <Card sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={banner9}
                                    height={"auto"}
                                    alt="green iguana"
                                />
                            </CardActionArea>
                        </Card>
                    </Paper>
                </Grid>
                <Grid size={{xs:12,sm:12,md:8,lg:8}}>
                    <MainPageMainCategoryProductStyle2 isMain={true} category={"Case máy tính"} categoryId={"CASE"} redirectLink={"/Case"}/>
                </Grid>
            </Grid>
            <MainPageMainCategoryProduct isMain={true} category={"RAM"} categoryId={"RAM"} redirectLink={"/RAM"}/>
        </Container>

    );
}