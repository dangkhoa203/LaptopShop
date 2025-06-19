import {Divider, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";

export default function CategoryList(){
    const [categoryContent, setCategoryContent] = React.useState(1);
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Asus" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="MSI" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Acer" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Dell" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Văn phòng" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Gaming" />
                    </ListItem>
                </List>
            </Grid>
            <Grid size={4}>
                <List
                    sx={{ width: '100%', maxWidth: 360 }}
                >
                    <ListItem>
                        <Typography sx={{fontSize:"1.3em"}} color="primary"  >
                            Theo hãng
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Asus" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Drafts" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Zenbook" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Vivobook" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Modern" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Prestige" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Swift" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Aspire" />
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
                            Laptop Lenovo
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Thinkpad" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Thinkbook" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Ideapad" />
                    </ListItem>
                </List>
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="ROG" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="TUF" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Zephyrus" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Thin" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Raider" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Katana" />
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
                            Gaming Lenovo
                        </Typography>
                    </ListItem>
                    <ListItem >
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Legion" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="LOQ" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Nitro" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Predator" />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const PCCategory=()=>{
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Asus" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="MSI" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Acer" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Dell" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Văn phòng" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Gaming" />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const PCComponentCategory=()=>{
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Intel" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="AMD" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="ATX" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Micro-ATX" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Mini-ITX" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Intel" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="AMD" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Nvidea" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="AMD" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Intel" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="DDR4" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="DDR5" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="4GB" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="8GB" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="16GB" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="SSD" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="HDD" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="100W - 300W" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="300W - 500W" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="500W - 600W" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="600W - 800W" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="800W trờ lên" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Quạt" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Kem tản nhiệt" />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const MonitorCategory=()=>{
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="60hz" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="120hz" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="1080p" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="2k" />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const CaseCategory=()=>{
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="ATX" />
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Mini-ITX" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Micro-ATX" />
                    </ListItem>
                    <ListItem>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Tower" />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}
const PCAccessoryCategory=()=>{
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Chuột" />
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Lót chuột" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Phím cơ" />
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Phím văn phòng" />
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
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Hub chuyển đổi" />
                    </ListItem>
                    <ListItem sx={{paddingTop:0}}>
                        <ListItemText sx={{paddingLeft:"5px"}} primary="Cáp" />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    )
}