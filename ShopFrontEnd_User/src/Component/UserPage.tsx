import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LaptopIcon from '@mui/icons-material/Laptop';
import { styled, alpha } from '@mui/material/styles';
import {
    Badge, ButtonGroup, Divider,
    Grid, InputBase,
    List, ListItemButton,
    ListItemText, MenuItem, ThemeProvider
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import {useUserInfo} from "../State/User.ts";
import {useState} from "react";
import LoginDialog from "./Account/LoginDialog.tsx";
import {Threedom} from "../Type/ThreedomPalette.ts";
import RegisterDialog from "./Account/RegisterDialog.tsx";
import ResetPasswordDialog from "./Account/ResetPasswordDialog.tsx";
import {useMutation} from "@tanstack/react-query";
import {Outlet, useNavigate} from 'react-router';
import {useCart} from "../State/Cart.ts";

export default function UserPage() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [categoryContent, setCategoryContent] = React.useState(1);
    const handleCategory=(num:number)=>{
        setCategoryContent(num);
    }
    const userInfo=useUserInfo((state)=> state.user);
    const refetch=useUserInfo((state)=> state.reFetch);
    const [openLogin, setOpenLogin] = useState(false);
    const handleClickOpenLogin =() => {
        setOpenLogin(true);
    };

    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const [openRegister, setOpenRegister] = useState(false);
    const handleClickOpenRegister =() => {
        setOpenRegister(true);
    };

    const handleCloseRegister = () => {
        setOpenRegister(false);
    };

    const [openResetPassword, setOpenResetPassword] = useState(false);
    const handleClickOpenResetPassword =() => {
        setOpenResetPassword(true);
    };

    const handleCloseResetPassword = () => {
        setOpenResetPassword(false);
    };

    const LOGOUT=useMutation({mutationFn:async ()=>{
            try{
                await fetch('https://localhost:7075/api/Account/LogOut', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                await refetch()
            }catch{
                console.log("Error")
            }
        }});
    const cartCount=useCart((state)=>state.count())
    return (
        <>
            <AppBar position="static">
                <ThemeProvider theme={Threedom}>
                    <Container sx={{bgcolor:"#e17f04"}} maxWidth="xl">
                        <Toolbar disableGutters>
                            <LaptopIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                onClick={()=>navigate('/')}
                                sx={{
                                    cursor:"pointer",
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                DKSHOP
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{ display: { xs: 'block', md: 'none' } }}
                                >

                                </Menu>
                            </Box>
                            <LaptopIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                onClick={()=>navigate('/')}
                                sx={{
                                    cursor: 'pointer',
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                DKSHOP
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <div>
                                    <Button
                                        // @ts-expect-error
                                        color="white"
                                        id="basic-button"
                                        onClick={handleClick}
                                        sx={{height:"100%"}}
                                        startIcon={<MenuIcon />}
                                    >
                                        Danh mục
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        slotProps={{
                                            list: {
                                                'aria-labelledby': 'basic-button',
                                            },
                                        }}
                                        disableScrollLock={true}
                                    >
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
                                                    <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                                                        <ListItemText primary="Card đồ họa" />
                                                    </ListItemButton>
                                                    <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                                                        <ListItemText primary="PC" />
                                                    </ListItemButton>
                                                    <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                                                        <ListItemText primary="PC" />
                                                    </ListItemButton>
                                                    <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                                                        <ListItemText primary="PC" />
                                                    </ListItemButton>
                                                    <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                                                        <ListItemText primary="PC" />
                                                    </ListItemButton>
                                                    <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                                                        <ListItemText primary="PC" />
                                                    </ListItemButton>
                                                    <ListItemButton onMouseEnter={()=>handleCategory(2)}>
                                                        <ListItemText primary="PC" />
                                                    </ListItemButton>
                                                </List>

                                            </Grid>
                                            <Grid size={9}>
                                                {categoryContent===1 && 1}
                                                {categoryContent===2 && 2}
                                            </Grid>
                                        </Grid>
                                    </Menu>
                                </div>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </Box>
                            <Box sx={{ flexGrow: 0,display:"flex",gap:2 }}>
                                {userInfo.isLogged ?
                                    <>
                                        <IconButton onClick={()=>navigate("/GioHang")} color="inherit" size="large">
                                            <Badge badgeContent={cartCount} color="error">
                                                <ShoppingBasketOutlinedIcon color="inherit" />
                                            </Badge>
                                        </IconButton>
                                        <div style={{display:"flex"}}>
                                            <Typography sx={{margin:"auto",textAlign:"center",verticalAlign:"center"}}>
                                                {userInfo.userName}
                                            </Typography>
                                            <Tooltip title="Open settings">
                                                <IconButton color="inherit" onClick={handleOpenUserMenu} >
                                                    <AccountCircleIcon sx={{fontSize:"1.5em"}}/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>

                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            <MenuItem onClick={()=>LOGOUT.mutate()} disabled={LOGOUT.isPending}>
                                                Đăng xuất
                                            </MenuItem>
                                            <Divider/>
                                            <MenuItem onClick={()=>navigate("/TaiKhoan")} disabled={LOGOUT.isPending}>
                                                Tài khoản
                                            </MenuItem>
                                            <MenuItem onClick={()=>navigate("/DonHang")} disabled={LOGOUT.isPending}>
                                                Đơn hàng
                                            </MenuItem>
                                        </Menu>
                                    </>
                                    :
                                    // @ts-expect-error
                                    <ButtonGroup color="white" aria-label="Basic button group">
                                        <Button onClick={handleClickOpenRegister}>Đăng ký </Button>
                                        <Button onClick={handleClickOpenLogin} sx={{color:"black"}} variant="contained">Đăng nhập</Button>
                                    </ButtonGroup>
                                }
                            </Box>
                        </Toolbar>
                    </Container>
                    {!userInfo.isLogged &&
                        <>
                            <LoginDialog open={openLogin} handleClose={handleCloseLogin} openRegister={handleClickOpenRegister} openReset={handleClickOpenResetPassword} reFetch={refetch} isLoggedIn={userInfo.isLogged}/>
                            <RegisterDialog open={openRegister} handleClose={handleCloseRegister}  openLogin={handleClickOpenLogin} isLoggedIn={userInfo.isLogged}/>
                            <ResetPasswordDialog open={openResetPassword} handleClose={handleCloseResetPassword} openLogin={handleClickOpenLogin} isLoggedIn={userInfo.isLogged}/>
                        </>
                    }

                </ThemeProvider>
            </AppBar>
            <div style={{paddingTop:"10px"}}>
                <Outlet/>
            </div>

        </>
    );
}
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));