import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemButton
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {useNavigate} from "react-router";
import Tooltip from "@mui/material/Tooltip";
export default function MobileCategoryList(props:{setOpenDrawer: (open: boolean) => void}) {
    return(
        <>
            <LaptopCategory setOpenDrawer={props.setOpenDrawer}/>
            <PCCategory setOpenDrawer={props.setOpenDrawer}/>
            <PCComponentCategory setOpenDrawer={props.setOpenDrawer}/>
            <MonitorCategory setOpenDrawer={props.setOpenDrawer}/>
            <CaseCategory setOpenDrawer={props.setOpenDrawer}/>
            <PCAccessoryCategory setOpenDrawer={props.setOpenDrawer}/>
        </>
    )
}
const LaptopCategory=(props:{setOpenDrawer: (open: boolean) => void})=>{
    const navigate = useNavigate();
    return(
        <Accordion elevation={4}>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
            >
                <Typography sx={{fontFamily:"Quicksand",letterSpacing:"2px",textTransform:"uppercase"}} fontSize={18} component="span">Laptop</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid  container spacing={1}>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Asus")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Asus
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Laptop MSI"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/MSI")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        MSI
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Laptop Acer"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Acer")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Acer
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Laptop Lenovo"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Lenovo")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Lenovo
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Laptop Dell"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Dell")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Dell
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Laptop HP"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/HP")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        HP
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
                                    Theo nhu cầu
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Laptop Văn phòng"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Van_Phong")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Văn phòng
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Laptop Gaming"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Gaming")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Gaming
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={12}>
                        <Divider/>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Zenbook")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Zenbook
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Asus Vivobook"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Vivobook")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Vivobook
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Modern")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Modern
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"MSI Prestige"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Prestige")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Prestige
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Swift")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Swift
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Acer Aspire"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Aspire")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Aspire
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Thinkpad")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Thinkpad
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Lenovo Thinkbook"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Thinkbook")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Thinkbook
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Lenovo Ideapad"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Ideapad")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Ideapad
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Inspriron")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Inspriron
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem >
                                <Tooltip placement="bottom-start" title={"Dell Latitude"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Latitude")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Latitude
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem >
                                <Tooltip placement="bottom-start" title={"Dell Vostro"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Vostro")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Vostro
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem >
                                <Tooltip placement="bottom-start" title={"Dell XPS"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/XPS")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        XPS
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Elitebook")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Elitebook
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem >
                                <Tooltip placement="bottom-start" title={"HP Envy"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Envy")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Envy
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem >
                                <Tooltip placement="bottom-start" title={"HP Pavilion"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Pavilion")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Pavilion
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={12}>
                        <Divider/>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/ROG")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        ROG
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Asus TUF"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/TUF")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        TUF
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Asus Zephyrus"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Zephyrus")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Zephyrus
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Thin")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Thin
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"MSI Raider"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Raider")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Raider
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"MSI Katana"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Katana")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Katana
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Legion")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Legion
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Lenovo LOQ"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/LOQ")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        LOQ
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Nitro")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Nitro
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Acer Predator"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Predator")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Predator
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/G_Series")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        G Series
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Dell Alienware"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Alienware")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Alienware
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Victus")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Victus
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"HP Omen"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Laptop/Omen")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Omen
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
        
    )
}
const PCCategory=(props:{setOpenDrawer: (open: boolean) => void})=>{
    const navigate=useNavigate();
    return(
        <Accordion elevation={4}>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
            >
                <Typography sx={{fontFamily:"Quicksand",letterSpacing:"2px",textTransform:"uppercase"}} fontSize={18} component="span">PC</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/PC/Asus")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Asus
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"PC MSI"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PC/MSI")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        MSI
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"PC Lenovo"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PC/Lenovo")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Lenovo
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"PC Dell"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PC/Dell")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Dell
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
                                    Theo nhu cầu
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"PC Văn phòng"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PC/Van_Phong")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Văn phòng
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"PC Gaming"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PC/Gaming")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Gaming
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}
const PCComponentCategory=(props:{setOpenDrawer: (open: boolean) => void})=>{
    const navigate=useNavigate();
    return(
        <Accordion elevation={4}>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
            >
                <Typography sx={{fontFamily:"Quicksand",letterSpacing:"2px",textTransform:"uppercase"}} fontSize={18} component="span">Linh kiện máy tính</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Bo_Mach/Intel")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Intel
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Motherboard tương thích CPU AMD"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Bo_Mach/AMD")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}  >
                                        AMD
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
                                    Motherboard theo Case
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Motherboard tương thích case ATX"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Bo_Mach/ATX")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}  >
                                        ATX
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Motherboard tương thích case Micro-ATX"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Bo_Mach/Micro-ATX")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Micro-ATX
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Motherboard tương thích case Micro-ITX"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Bo_Mach/Mini-ITX")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Mini-ITX
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
                                    CPU
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"CPU Intel"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/CPU/Intel")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Intel
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"CPU AMD"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/CPU/AMD")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        AMD
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={12}>
                        <Divider/>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/GPU/Nvidia")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                        Nvidia
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"GPU AMD"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/GPU/AMD")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        AMD
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"GPU Intel"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/GPU/Intel")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                        Intel
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
                                    RAM theo thế hệ
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"RAM DDR4"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/RAM/DDR4")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                        DDR4
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"RAM DDR5"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/RAM/DDR5")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        DDR5
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
                                    RAM theo dung lượng
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"RAM 4GB"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/RAM/4GB")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        4GB
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"RAM 8GB"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/RAM/8GB")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        8GB
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"RAM 16GB"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/RAM/16GB")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                        16GB
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={12}>
                        <Divider/>
                    </Grid>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Memory/SSD")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}   >
                                        SSD
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Ổ cứng HDD"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Memory/HDD")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}  >
                                        HDD
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
                                    Nguồn
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Nguồn từ 100W đến 300W"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PSU/100W")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        100W - 300W
                                    </ListItemButton>
                                </Tooltip>

                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Nguồn từ 300W đến 500W"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PSU/300W")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}}>
                                        300W - 500W
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Nguồn từ 500W đến 800W"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PSU/500W")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        500W - 800W
                                    </ListItemButton>
                                </Tooltip>

                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Nguồn từ 800W trở lên"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/PSU/800W")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        800W trờ lên
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
                                    Tản nhiệt
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Quạt máy tính"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Tan_Nhiet/Quat")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Quạt
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Kem tản nhiệt máy tính"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Tan_Nhiet/Kem")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Kem tản nhiệt
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}
const MonitorCategory=(props:{setOpenDrawer: (open: boolean) => void})=>{
    const navigate=useNavigate();
    return(
        <Accordion elevation={4}>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
            >
                <Typography sx={{fontFamily:"Quicksand",letterSpacing:"2px",textTransform:"uppercase"}} fontSize={18} component="span">Màn hình</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Man_Hinh/60hz")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        60hz
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Màn hình 144hz"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Man_Hinh/144hz")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        144hz
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                        <ListItem>
                            <Tooltip placement="bottom-start" title={"Màn hình 240hz"}>
                                <ListItemButton onClick={()=> {
                                    navigate("/Man_Hinh/240hz")
                                    props.setOpenDrawer(false);
                                }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                    240hz
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Man_Hinh/1080p")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        1080p
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Màn hình 2K"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Man_Hinh/2K")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        2K
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Màn hình 4K"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Man_Hinh/4K")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        4K
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}
const CaseCategory=(props:{setOpenDrawer: (open: boolean) => void})=>{
    const navigate=useNavigate();
    return(
        <Accordion elevation={4}>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
            >
                <Typography sx={{fontFamily:"Quicksand",letterSpacing:"2px",textTransform:"uppercase"}} fontSize={18} component="span">Case</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Case/ATX")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        ATX
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Case Mini-ITX"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Case/Mini-ITX")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Mini-ITX
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem>
                                <Tooltip placement="bottom-start" title={"Case Micro-ATX"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Case/Micro-ATX")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Micro-ATX
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}
const PCAccessoryCategory=(props:{setOpenDrawer: (open: boolean) => void})=>{
    const navigate=useNavigate()
    return(
        <Accordion elevation={4}>
            <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
            >
                <Typography sx={{fontFamily:"Quicksand",letterSpacing:"2px",textTransform:"uppercase"}} fontSize={18} component="span">Phụ kiện</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container spacing={1}>
                    <Grid size={6}>
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
                                    <ListItemButton onClick={()=> {
                                        navigate("/Phu_Kien/Chuot")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Chuột
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Lót chuột máy tính"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Phu_Kien/Lot_Chuot")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Lót chuột
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
                                    Bàn phím
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Bàn phím cơ"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Phu_Kien/Ban_Phim_Co")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Phím cơ
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Bàn phím văn phòng"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Phu_Kien/Ban_Phim_Van_Phong")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Phím văn phòng
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
                                    Hub,cáp
                                </Typography>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Hub chuyển đổi"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Phu_Kien/Hub")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Hub chuyển đổi
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem sx={{paddingTop:0}}>
                                <Tooltip placement="bottom-start" title={"Cáp"}>
                                    <ListItemButton onClick={()=> {
                                        navigate("/Phu_Kien/Cap")
                                        props.setOpenDrawer(false);
                                    }} sx={{cursor:"pointer",paddingLeft:"5px",fontFamily:"Manrope"}} >
                                        Cáp
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>

    )
}