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
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',gap:0 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo hãng
                        </Typography>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Laptop Asus"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Asus")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Asus
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop MSI"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/MSI")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                MSI
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Acer"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Acer")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Acer
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Lenovo"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Lenovo")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Lenovo
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Dell"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Dell")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Dell
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop HP"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/HP")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Van_Phong")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Văn phòng
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Laptop Gaming"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Gaming")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Zenbook")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Zenbook
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Asus Vivobook"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Vivobook")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Modern")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Modern
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"MSI Prestige"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Prestige")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Swift")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Swift
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Acer Aspire"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Aspire")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Thinkpad")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Thinkpad
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Lenovo Thinkbook"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Thinkbook")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Thinkbook
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Lenovo Ideapad"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Ideapad")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Ideapad
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
                            Laptop Dell
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Dell Inspriron"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Inspriron")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Inspriron
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Dell Latitude"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Latitude")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Latitude
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Dell Vostro"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Vostro")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Vostro
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Dell XPS"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/XPS")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                XPS
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
                            Laptop HP
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"HP Elitebook"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Elitebook")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Elitebook
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"HP Envy"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Envy")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Envy
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"HP Pavilion"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Pavilion")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Pavilion
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
                            <ListItemButton onClick={()=>navigate("/Laptop/ROG")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                ROG
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Asus TUF"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/TUF")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                TUF
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Asus Zephyrus"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Zephyrus")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Thin")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Thin
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"MSI Raider"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Raider")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Raider
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"MSI Katana"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Katana")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Legion")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Legion
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Lenovo LOQ"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/LOQ")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Laptop/Nitro")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Nitro
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Acer Predator"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Predator")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Predator
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
                            Gaming Dell
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"Dell G Series"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/G_Series")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                G Series
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Dell Alienware"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Alienware")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Alienware
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
                            Gaming HP
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <Tooltip placement="bottom-start" title={"HP Victus"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Victus")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Victus
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"HP Omen"}>
                            <ListItemButton onClick={()=>navigate("/Laptop/Omen")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Omen
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
                            <ListItemButton onClick={()=>navigate("/PC/Asus")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Asus
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC MSI"}>
                            <ListItemButton onClick={()=>navigate("/PC/MSI")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                MSI
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC Lenovo"}>
                            <ListItemButton onClick={()=>navigate("/PC/Lenovo")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Lenovo
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC Dell"}>
                            <ListItemButton onClick={()=>navigate("/PC/Dell")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/PC/Van_Phong")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Văn phòng
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"PC Gaming"}>
                            <ListItemButton onClick={()=>navigate("/PC/Gaming")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Bo_Mach/Intel")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Intel
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích CPU AMD"}>
                            <ListItemButton onClick={()=>navigate("/Bo_Mach/AMD")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}  >
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
                            <ListItemButton onClick={()=>navigate("/Bo_Mach/ATX")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}  >
                                ATX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích case Micro-ATX"}>
                            <ListItemButton onClick={()=>navigate("/Bo_Mach/Micro-ATX")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Micro-ATX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Motherboard tương thích case Micro-ITX"}>
                            <ListItemButton onClick={()=>navigate("/Bo_Mach/Mini-ITX")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Mini-ITX
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
                            <ListItemButton onClick={()=>navigate("/CPU/Intel")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Intel
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"CPU AMD"}>
                            <ListItemButton onClick={()=>navigate("/CPU/AMD")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                        <Tooltip placement="bottom-start" title={"GPU Nvidia"}>
                            <ListItemButton onClick={()=>navigate("/GPU/Nvidia")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                Nvidia
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"GPU AMD"}>
                            <ListItemButton onClick={()=>navigate("/GPU/AMD")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                AMD
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"GPU Intel"}>
                            <ListItemButton onClick={()=>navigate("/GPU/Intel")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
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
                            <ListItemButton onClick={()=>navigate("/RAM/DDR4")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                DDR4
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"RAM DDR5"}>
                            <ListItemButton onClick={()=>navigate("/RAM/DDR5")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/RAM/4GB")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                4GB
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"RAM 8GB"}>
                            <ListItemButton onClick={()=>navigate("/RAM/8GB")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                8GB
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"RAM 16GB"}>
                            <ListItemButton onClick={()=>navigate("/RAM/16GB")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
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
                            <ListItemButton onClick={()=>navigate("/Memory/SSD")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}   >
                                SSD
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Ổ cứng HDD"}>
                            <ListItemButton onClick={()=>navigate("/Memory/HDD")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}  >
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
                            <ListItemButton onClick={()=>navigate("/PSU/100W")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                100W - 300W
                            </ListItemButton>
                        </Tooltip>

                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 300W đến 500W"}>
                            <ListItemButton onClick={()=>navigate("/PSU/300W")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                300W - 500W
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 500W đến 800W"}>
                            <ListItemButton onClick={()=>navigate("/PSU/500W")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                500W - 800W
                            </ListItemButton>
                        </Tooltip>

                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Nguồn từ 800W trở lên"}>
                            <ListItemButton onClick={()=>navigate("/PSU/800W")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Tan_Nhiet/Quat")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Quạt
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Kem tản nhiệt máy tính"}>
                            <ListItemButton onClick={()=>navigate("/Tan_Nhiet/Kem")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
            <Grid size={6}>
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
                            <ListItemButton onClick={()=>navigate("/Man_Hinh/60hz")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                60hz
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Màn hình 144hz"}>
                            <ListItemButton onClick={()=>navigate("/Man_Hinh/144hz")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                144hz
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Màn hình 240hz"}>
                            <ListItemButton onClick={()=>navigate("/Man_Hinh/240hz")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                240hz
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
            <Grid size={6}>
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
                            <ListItemButton onClick={()=>navigate("/Man_Hinh/1080p")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                1080p
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Màn hình 2K"}>
                            <ListItemButton onClick={()=>navigate("/Man_Hinh/2K")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                2K
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Màn hình 4K"}>
                            <ListItemButton onClick={()=>navigate("/Man_Hinh/4K")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                4K
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
                            <ListItemButton onClick={()=>navigate("/Case/ATX")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                ATX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Case Mini-ITX"}>
                            <ListItemButton onClick={()=>navigate("/Case/Mini-ITX")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Mini-ITX
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem>
                        <Tooltip placement="bottom-start" title={"Case Micro-ATX"}>
                            <ListItemButton onClick={()=>navigate("/Case/Micro-ATX")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Micro-ATX
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
                            <ListItemButton onClick={()=>navigate("/Phu_Kien/Chuot")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Chuột
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Lót chuột máy tính"}>
                            <ListItemButton onClick={()=>navigate("/Phu_Kien/Lot_Chuot")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Phu_Kien/Ban_Phim_Co")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Phím cơ
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Bàn phím văn phòng"}>
                            <ListItemButton onClick={()=>navigate("/Phu_Kien/Ban_Phim_Van_Phong")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
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
                            <ListItemButton onClick={()=>navigate("/Phu_Kien/Hub")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Hub chuyển đổi
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <Tooltip placement="bottom-start" title={"Cáp"}>
                            <ListItemButton onClick={()=>navigate("/Phu_Kien/Cap")} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                Cáp
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}