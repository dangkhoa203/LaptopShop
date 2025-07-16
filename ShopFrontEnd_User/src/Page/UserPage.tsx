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
    Alert, Backdrop,
    ButtonGroup, CircularProgress, Divider, FormControl,
    InputBase,
    MenuItem, Select, Slide, Snackbar, ThemeProvider, useScrollTrigger
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useUserInfo} from "../State/User.ts";
import {useEffect, useState} from "react";
import LoginDialog from "./Account/LoginDialog.tsx";
import {Threedom} from "../Type/ThreedomPalette.ts";
import RegisterDialog from "./Account/RegisterDialog.tsx";
import ResetPasswordDialog from "./Account/ResetPasswordDialog.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Outlet, useNavigate} from 'react-router';
import {useAppError} from "../State/AppErrorState.ts";
import CategoryList from "./CategoryList.tsx";
import {UseSearch} from "../State/Search.ts";
import {SearchMode} from "../Type/SearchMode.ts";
import {useAppNotify} from "../State/AppGlobalNotifyState.ts";
import CartButton from "./Component/CartButton.tsx";
import {useCart} from "../State/Cart.ts";
import {Response} from "../Type/Respone.ts";

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
    const setUserInfo=useUserInfo((state)=> state.setUserInfo);
    const userInfo=useUserInfo((state)=> state.user);
    const clearUserInfo=useUserInfo(state=>state.clearUserInfo)
    const {data,isFetching,refetch}=useQuery({
        queryKey: ["user"],
        staleTime:0,
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            try {
                const response = await fetch('https://localhost:7075/api/Account', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method:"GET"
                });
                if (!response.ok) {
                    return({
                        userName: '',
                        userEmail: '',
                        userId: '',
                        isLogged: false,
                    })
                }
                const content = await response.json();
                return(content);
            } catch  {
                return({
                    userName: '',
                    userEmail: '',
                    userId: '',
                    isLogged: false,
                })
            }
        },
    })

    const cart=useCart();
    const CartData=useQuery({
        queryKey: ["cart"],
        refetchOnWindowFocus:false,
        queryFn:async ()=>{
            if(userInfo.isLogged){
                const response = await fetch('https://localhost:7075/api/Cart', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                    method: "GET"
                });
                return response.json();
            }else
                return []
        },
    })
    useEffect(() => {
        if(CartData.data){
            if(!userInfo.isLogged)
                cart.setCartItem(CartData.data,CartData.refetch)
            else
                cart.setCartItem(CartData.data.data,CartData.refetch)
        }
    }, [CartData.data]);
    useEffect(() => {
        CartData.refetch()
    }, [userInfo.isLogged]);
    const queryClient=useQueryClient()
    const LOGOUT=useMutation({
        mutationFn:async ()=>{
            try{
                const response = await fetch('https://localhost:7075/api/Account/LogOut', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                return await response.json()
            }catch{
                return null
            }
        },
        onSuccess:(data:Response)=>{
            if(data?.success){
                queryClient.resetQueries({ queryKey:["user"], exact: true })
                setAnchorElUser(null);
                clearUserInfo()
            }
        }
        }
    );

    const search=UseSearch()
    const handleGlobalSearchChange=(e:any) => {
        search.setQuery(e.currentTarget.value,search.mode)
    }

    const globalError=useAppError()
    const globalNotify=useAppNotify()

    useEffect(() => {
        if(data){
            setUserInfo(data,refetch)
        }
    }, [data]);
    console.log(userInfo)
    return (
        <div style={{display:"flex",minHeight:"100vh",flexDirection:"column"}}>
        <ThemeProvider theme={Threedom}>
            <HideOnScroll openUser={anchorElUser} open={anchorEl}>
                <AppBar sx={{ zIndex: 3}} position="fixed">
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
                                            sx={{maxHeight:"700px",overflowX:"auto"}}
                                            slotProps={{
                                                list: {
                                                    'aria-labelledby': 'basic-button',
                                                },
                                            }}
                                            disableScrollLock={true}
                                            elevation={20}
                                        >
                                            <CategoryList/>
                                        </Menu>
                                    </div>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search…"
                                            inputProps={{ 'aria-label': 'search' }}
                                            value={search.query}
                                            onChange={handleGlobalSearchChange}
                                            onKeyDown={(event)=>{
                                                if(event.key === 'Enter'){
                                                    if(search.query.length!==0){
                                                        navigate(`/Tim/${SearchMode[search.mode]}/${encodeURIComponent(search.query)}`)
                                                    }
                                                }
                                            }}
                                        />
                                        {search.query.length>0 && <Button color="inherit" onClick={()=>{
                                            navigate(`/Tim/${SearchMode[search.mode]}/${encodeURIComponent(search.query)}`)
                                        }}

                                        >Tìm</Button>}

                                    </Search>
                                    <FormControl sx={{width:"120px"}} size="small">

                                        <Select
                                            value={search.mode}
                                            onChange={(e)=>{
                                                if(e.target.value===1) {
                                                    navigate("/Tim/CauHinh")
                                                }else {
                                                    search.setQuery(search.query, e.target.value)
                                                }
                                            }}
                                            sx={{
                                                '.MuiSvgIcon-root': {
                                                    fill: "white !important",
                                                },
                                            }}
                                            input={<BootstrapInput />}
                                        >
                                            <MenuItem color="white" value={0}>Tên</MenuItem>
                                            <MenuItem color="white" value={2}>Hãng</MenuItem>
                                            <MenuItem color="white" value={1}>Cấu hinh</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Box>
                                <Box sx={{ flexGrow: 0,display:"flex",gap:2 }}>
                                    {userInfo.isLogged ?
                                        <>
                                            <CartButton/>
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
                                                disableScrollLock={true}
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
                                                <MenuItem onClick={()=>navigate("/Review")} disabled={LOGOUT.isPending}>
                                                    Review
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
                                <LoginDialog open={openLogin} handleClose={handleCloseLogin} openRegister={handleClickOpenRegister} openReset={handleClickOpenResetPassword}  isLoggedIn={userInfo.isLogged}/>
                                <RegisterDialog open={openRegister} handleClose={handleCloseRegister}  openLogin={handleClickOpenLogin} isLoggedIn={userInfo.isLogged}/>
                                <ResetPasswordDialog open={openResetPassword} handleClose={handleCloseResetPassword} openLogin={handleClickOpenLogin} isLoggedIn={userInfo.isLogged}/>
                            </>
                        }

                </AppBar>
            </HideOnScroll>
            <div style={{paddingTop:"74px",paddingBottom:"20px"}}>
                {isFetching &&
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={isFetching}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
                <Outlet/>
                <Snackbar open={globalError.message.length!==0} autoHideDuration={3000} onClose={()=>globalError.setError("")}>
                    <Alert
                        onClose={()=>globalError.setError("")}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {globalError.message}
                    </Alert>
                </Snackbar>
                <Snackbar open={globalNotify.message.length!==0} autoHideDuration={4000} onClose={()=>globalNotify.setNotify("")}>
                    <Alert
                        onClose={()=>globalNotify.setNotify("")}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {globalNotify.message}
                    </Alert>
                </Snackbar>
            </div>
            <div style={{width:"100%",color:"white",marginTop:"auto",backgroundColor:"rgb(200,141,67)"}} >
                <Typography sx={{marginLeft:"5px"}}>
                    @2025 DKWebSoft
                </Typography>
            </div>
        </ThemeProvider>
        </div>
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


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    children?: React.ReactElement<unknown>;
    open:any
    openUser:any
}

function HideOnScroll(props: Props) {
    const { children } = props;

    const trigger = useScrollTrigger();
    return (
        <Slide appear={false} direction="down" in={props.openUser!==null||props.open!==null || !trigger}>
            {children ?? <div />}
        </Slide>
    );
}
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },

        position: 'relative',
        fontSize: 14,
        color: theme.palette.common.white,

        padding: '7px 26px 7px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
    },
}));
