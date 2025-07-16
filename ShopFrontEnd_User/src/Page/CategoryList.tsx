import {Divider, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router";
import {useAppError} from "../State/AppErrorState.ts";
import {useUserInfo} from "../State/User.ts";
import Tooltip from "@mui/material/Tooltip";

export default function CategoryList(){
    const error=useAppError()
    const userInfo=useUserInfo(state=>state.user)
    const [categoryContent, setCategoryContent] = React.useState(1);
    const navigate = useNavigate();
    const handleCategory=(num:number)=>{
        setCategoryContent(num);
    }
    return (
        <>
            <Grid container sx={{width:"800px"}} spacing={2}>
                <Grid size={3} sx={{borderRight:"1px solid black"}}>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                    >
                        <ListItemButton onMouseEnter={()=>handleCategory(1)}>
                            <ListItemText primary="Laptop" />
                        </ListItemButton>
                        <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                            <ListItemText primary="PC" />
                        </ListItemButton>
                        <ListItemButton onMouseEnter={()=>handleCategory(3)}>
                            <ListItemText primary="Linh kiện máy tính" />
                        </ListItemButton>
                        <ListItemButton onMouseEnter={()=>handleCategory(4)}>
                            <ListItemText primary="Màn hình" />
                        </ListItemButton>
                        <ListItemButton onMouseEnter={()=>handleCategory(5)}>
                            <ListItemText primary="Case" />
                        </ListItemButton>
                        <ListItemButton onMouseEnter={()=>handleCategory(6)}>
                            <ListItemText primary="Phụ kiện" />
                        </ListItemButton>
                        <ListItemButton onClick={()=>{
                            if(userInfo.isLogged)
                                navigate("/Dung_PC")
                            else
                                error.setError("Chưa đăng nhập")
                        }}>
                            <ListItemText primary="Xây dựng PC" />
                        </ListItemButton>
                    </List>
                </Grid>
                <Grid  size={9}>
                    {categoryContent===1 && <LaptopCategory/>}
                    {categoryContent===2 && <PCCategory/> }
                    {categoryContent===3 && <PCComponentCategory/>}
                    {categoryContent===4 && <MonitorCategory/> }
                    {categoryContent===5 && <CaseCategory/> }
                    {categoryContent===6 &&  <PCAccessoryCategory/>}
                </Grid>
            </Grid>
        </>
    )
}
const LaptopCategory=()=>{
    const navigate = useNavigate();
    return(
        <Grid  container spacing={1}>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo hãng
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Laptop Asus"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Asus")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Asus
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop MSI"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/MSI")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                MSI
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Acer"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Acer")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Acer
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Lenovo"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Lenovo")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Lenovo
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Dell"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Dell")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Dell
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop HP"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/HP")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                HP
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo nhu cầu
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Laptop Văn phòng"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Van_Phong")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Văn phòng
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Gaming"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Gaming")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Gaming
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={12}>
                <Divider/>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Laptop Asus
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Asus Zenbook"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Zenbook")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Zenbook
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Asus Vivobook"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Vivobook")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Vivobook
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Laptop MSI
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"MSI Modern"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Modern")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Modern
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"MSI Prestige"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Prestige")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Prestige
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Laptop Acer
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Acer Swift"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Swift")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Swift
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Acer Aspire"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Aspire")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Aspire
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Laptop Lenovo
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Lenovo Thinkpad"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Thinkpad")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Thinkpad
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Lenovo Thinkbook"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Thinkbook")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Thinkbook
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Lenovo Ideapad"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Ideapad")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Ideapad
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={12}>
                <Divider/>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Gaming Asus
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Asus ROG"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/ROG")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                ROG
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Asus TUF"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/TUF")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                TUF
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Asus Zephyrus"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Zephyrus")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Zephyrus
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Gaming MSI
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"MSI Thin"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Thin")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Thin
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"MSI Raider"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Raider")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Raider
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"MSI Katana"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Katana")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Katana
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>

            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Gaming Lenovo
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Lenovo Legion"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Legion")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Legion
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Lenovo LOQ"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/LOQ")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                LOQ
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Gaming Acer
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Acer Nitro"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Nitro")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Nitro
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Acer Predator"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Predator")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Predator
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const PCCategory=()=>{
    const navigate=useNavigate();
    return(
        <Grid container spacing={1}>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo hãng
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"PC Asus"}>
                            <ListItemButton onClick={()=>navigate("/PC/Asus")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Asus
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC HP"}>
                            <ListItemButton onClick={()=>navigate("/PC/HP")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                HP
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC Lenovo"}>
                            <ListItemButton onClick={()=>navigate("/PC/Lenovo")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Lenovo
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC Dell"}>
                            <ListItemButton onClick={()=>navigate("/PC/Dell")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Dell
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo nhu cầu
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"PC Văn phòng"}>
                            <ListItemButton onClick={()=>navigate("/PC/Van_Phong")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Văn phòng
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC Gaming"}>
                            <ListItemButton onClick={()=>navigate("/PC/Gaming")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Gaming
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const PCComponentCategory=()=>{
    const navigate=useNavigate();
    return(
        <Grid container spacing={1}>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Motherboard theo CPU
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích CPU Intel"}>
                            <ListItemButton onClick={()=>navigate("/Motherboard/Intel")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Intel
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích CPU AMD"}>
                            <ListItemButton onClick={()=>navigate("/Motherboard/AMD")} sx={{cursor:"pointer",paddingLeft:"5px"}}  >
                                AMD
                            </ListItemButton>
                        </Tooltip>

                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Motherboard theo Case
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích case ATX"}>
                            <ListItemButton onClick={()=>navigate("/Motherboard/ATX")} sx={{cursor:"pointer",paddingLeft:"5px"}}  >
                                ATX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích case Micro-ATX"}>
                            <ListItemButton onClick={()=>navigate("/Motherboard/Micro-ATX")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Micro-ATX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích case Micro-ITX"}>
                            <ListItemButton onClick={()=>navigate("/Motherboard/Micro-ITX")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Micro-ITX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            CPU
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"CPU Intel"}>
                            <ListItemButton onClick={()=>navigate("/CPU/Intel")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Intel
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"CPU AMD"}>
                            <ListItemButton onClick={()=>navigate("/CPU/AMD")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                AMD
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={12}>
                <Divider/>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Card đồ họa
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"GPU Nvidea"}>
                            <ListItemButton onClick={()=>navigate("/GPU/Nvidea")} sx={{cursor:"pointer",paddingLeft:"5px"}}>
                                Nvidea
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"GPU AMD"}>
                            <ListItemButton onClick={()=>navigate("/GPU/AMD")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                AMD
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"GPU Intel"}>
                            <ListItemButton onClick={()=>navigate("/GPU/Intel")} sx={{cursor:"pointer",paddingLeft:"5px"}}>
                                Intel
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            RAM theo thế hệ
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"RAM DDR4"}>
                            <ListItemButton onClick={()=>navigate("/RAM/DDR4")} sx={{cursor:"pointer",paddingLeft:"5px"}}>
                                DDR4
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"RAM DDR5"}>
                            <ListItemButton onClick={()=>navigate("/RAM/DDR5")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                DDR5
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>

                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            RAM theo dung lượng
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"RAM 4GB"}>
                            <ListItemButton onClick={()=>navigate("/RAM/4GB")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                4GB
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"RAM 8GB"}>
                            <ListItemButton onClick={()=>navigate("/RAM/8GB")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                8GB
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"RAM 16GB"}>
                            <ListItemButton onClick={()=>navigate("/RAM/16GB")} sx={{cursor:"pointer",paddingLeft:"5px"}}>
                                16GB
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={12}>
                <Divider/>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Ổ cứng
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Ổ cứng SSD"}>
                            <ListItemButton onClick={()=>navigate("/Memory/SSD")} sx={{cursor:"pointer",paddingLeft:"5px"}}   >
                                SSD
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Ổ cứng HDD"}>
                            <ListItemButton onClick={()=>navigate("/Memory/HDD")} sx={{cursor:"pointer",paddingLeft:"5px"}}  >
                                HDD
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Nguồn
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 100W đến 300W"}>
                            <ListItemButton onClick={()=>navigate("/PSU/100W")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                100W - 300W
                            </ListItemButton>
                        </Tooltip>

                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 300W đến 500W"}>
                            <ListItemButton onClick={()=>navigate("/PSU/300W")} sx={{cursor:"pointer",paddingLeft:"5px"}}>
                                300W - 500W
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 500W đến 600W"}>
                            <ListItemButton onClick={()=>navigate("/PSU/500W")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                500W - 600W
                            </ListItemButton>
                        </Tooltip>

                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 600W đến 800W"}>
                            <ListItemButton onClick={()=>navigate("/PSU/600W")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                600W - 800W
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 800W trở lên"}>
                            <ListItemButton onClick={()=>navigate("/PSU/800W")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                800W trờ lên
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Tản nhiệt
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Quạt máy tính"}>
                            <ListItemButton onClick={()=>navigate("/Tan_Nhiet/Quat")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Quạt
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Kem tản nhiệt máy tính"}>
                            <ListItemButton onClick={()=>navigate("/Tan_Nhiet/Kem")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Kem tản nhiệt
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const MonitorCategory=()=>{
    const navigate=useNavigate();
    return(
        <Grid container spacing={1}>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo tầng số quét
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Màn hình 60hz"}>
                            <ListItemButton onClick={()=>navigate("/ManHinh/60hz")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                60hz
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Màn hình 120hz"}>
                            <ListItemButton onClick={()=>navigate("/ManHinh/120hz")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                120hz
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo độ phân giải
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Màn hình 1080p"}>
                            <ListItemButton onClick={()=>navigate("/ManHinh/1080p")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                1080p
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Màn hình 2K"}>
                            <ListItemButton onClick={()=>navigate("/ManHinh/2K")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                2K
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const CaseCategory=()=>{
    const navigate=useNavigate();
    return(
        <Grid container spacing={1}>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Cấu trúc
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Case ATX"}>
                            <ListItemButton onClick={()=>navigate("/Case/ATX")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                ATX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Case Mini-ITX"}>
                            <ListItemButton onClick={()=>navigate("/Case/Mini-ITX")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Mini-ITX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Case Micro-ATX"}>
                            <ListItemButton onClick={()=>navigate("/Case/Micro-ATX")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Micro-ATX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Case Tower"}>
                            <ListItemButton onClick={()=>navigate("/Case/Tower")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Tower
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const PCAccessoryCategory=()=>{
    const navigate=useNavigate()
    return(
        <Grid container spacing={1}>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Chuột
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Chuột máy tính"}>
                            <ListItemButton onClick={()=>navigate("/PhuKien/Chuot")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Chuột
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Lót chuột máy tính"}>
                            <ListItemButton onClick={()=>navigate("/PhuKien/Lot_Chuot")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Lót chuột
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Bàn phím
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Bàn phím cơ"}>
                            <ListItemButton onClick={()=>navigate("/PhuKien/Ban_Phim_Co")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Phím cơ
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Bàn phím văn phòng"}>
                            <ListItemButton onClick={()=>navigate("/PhuKien/Ban_Phim_Van_Phong")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Phím văn phòng
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Hub,cáp
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Hub chuyển đổi"}>
                            <ListItemButton onClick={()=>navigate("/PhuKien/Hub")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Hub chuyển đổi
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Cáp"}>
                            <ListItemButton onClick={()=>navigate("/PhuKien/Cap")} sx={{cursor:"pointer",paddingLeft:"5px"}} >
                                Cáp
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}