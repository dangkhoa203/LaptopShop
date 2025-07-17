import {CardActionArea, Grid, Paper} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import laptop_category from "../assets/category_laptop.png";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import pc_category from "../assets/category_PC.png";
import cpu_category from "../assets/category_CPU.png";
import motherboard_category from "../assets/category_motherboard.png";
import vga_category from "../assets/category_vga.jpg";
import psu_category from "../assets/category_psu.png";
import moniter_category from "../assets/category_moniter.jpg";
import ram_category from "../assets/Category_RAM.png";
import fan_category from "../assets/category_fan.jpg";
import drive_category from "../assets/category_drive.png";
import case_category from "../assets/category_case.png";
import cable_category from "../assets/category_cable.png";
import {useNavigate} from "react-router";

export default function MainPageCategory(){
    const navigate=useNavigate();
    return(
        <Paper elevation={6} sx={{overflowX:"auto"}}>
            <Grid container>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card>
                        <CardActionArea onClick={()=>navigate("/Laptop")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={laptop_category}
                                title="Laptop"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Laptop
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/PC")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={pc_category}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    PC
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/CPU")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={cpu_category}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    CPU
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/Bo_Mach")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={motherboard_category}
                                title="Bo mạch"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Motherboard
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/GPU")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={vga_category}
                                title="GPU"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Card
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/PSU")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={psu_category}
                                title="PSU"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Nguồn
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/Man_Hinh")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={moniter_category}
                                title="Màn hình"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Màn hình
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/RAM")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={ram_category}
                                title="RAM"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    RAM
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/Tan_Nhiet")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={fan_category}
                                title="Tản nhiệt"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Tản nhiệt
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/Memory")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={drive_category}
                                title="Ổ cứng"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Ổ cứng
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/Case")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={case_category}
                                title="Case"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Case
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={{xs:3,sm:3,md:2,lg:2}}>
                    <Card >
                        <CardActionArea onClick={()=>navigate("/Phu_Kien")} sx={{padding:"5px"}}>
                            <CardMedia
                                sx={{ margin:"auto",height: 60,width:60}}
                                image={cable_category}
                                title="Phụ kiện"
                            />
                            <CardContent>
                                <Typography textAlign="center" component="p">
                                    Phụ kiện
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}