import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Menu, MenuItem, Tooltip} from "@mui/material";
import {useState} from "react";
import { AccountCircle } from '@mui/icons-material';
import {matchPath, Navigate, Outlet, useLocation, useNavigate} from 'react-router'
import {useUserInfo} from "../State/User.ts";
import {useMutation} from "@tanstack/react-query";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DiscountIcon from '@mui/icons-material/Discount';
import ComputerIcon from '@mui/icons-material/Computer';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(0)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function AdminPage() {
    const path = useLocation();
    const navigate=useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const reFetch=useUserInfo((state)=> state.reFetch);
    const { isPending, mutate }=useMutation({mutationFn:async ()=>{
            try{
                await fetch('https://localhost:7075/api/Account/Admin/LogOut', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                await reFetch()
            }catch{
                console.log("Error")
            }
        }});

    const userInfo=useUserInfo((state)=> state.user);

    if(!userInfo.isLogged && userInfo.userName!=="default"){
        return <Navigate to="/Login" />
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                            },
                            open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box   sx={{width:"100%",justifyContent: 'end',marginRight:0,padding:0,display: 'flex'}} >
                        <div>
                            <span style={{color:"white"}}>{userInfo.userName}</span>
                            <Tooltip title="Cài đặt">
                                <IconButton
                                    size="large"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"

                                >
                                    <AccountCircle   style={{color:"white",fontSize:"1.3em"}} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                disableScrollLock={true}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem disabled={isPending} onClick={async ()=>{
                                    handleClose();
                                    mutate();
                                }}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem  disablePadding sx={{ backgroundColor:matchPath("TaiKhoan/*", path.pathname)?"rgba(0,0,0,0.10)":"rgba(0,0,0,0)", display: 'block' }}>
                        <ListItemButton
                            color="primary"
                            onClick={()=>navigate("/TaiKhoan")}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                color="primary"
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <ManageAccountsIcon color={matchPath("TaiKhoan/*", path.pathname) ? "primary":"inherit"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Tài khoản"}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding sx={{ backgroundColor:matchPath("MaGiamGia/*", path.pathname)?"rgba(0,0,0,0.10)":"rgba(0,0,0,0)", display: 'block' }}>
                        <ListItemButton
                            color="primary"
                            onClick={()=>navigate("/MaGiamGia")}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                color="primary"
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <DiscountIcon color={matchPath("MaGiamGia/*", path.pathname) ? "primary":"inherit"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Mã giảm giá"}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding sx={{ backgroundColor:matchPath("SanPham/*", path.pathname)?"rgba(0,0,0,0.10)":"rgba(0,0,0,0)", display: 'block' }}>
                        <ListItemButton
                            color="primary"
                            onClick={()=>navigate("/SanPham")}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                color="primary"
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <ComputerIcon color={matchPath("SanPham/*", path.pathname) ? "primary":"inherit"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Sản phẩm"}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding sx={{ backgroundColor:matchPath("HangSanXuat/*", path.pathname)?"rgba(0,0,0,0.10)":"rgba(0,0,0,0)", display: 'block' }}>
                        <ListItemButton
                            color="primary"
                            onClick={()=>navigate("/HangSanXuat")}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                color="primary"
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <PrecisionManufacturingIcon color={matchPath("HangSanXuat/*", path.pathname) ? "primary":"inherit"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Tài khoản"}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding sx={{ backgroundColor:matchPath("ThongSo/*", path.pathname)?"rgba(0,0,0,0.10)":"rgba(0,0,0,0)", display: 'block' }}>
                        <ListItemButton
                            color="primary"
                            onClick={()=>navigate("/ThongSo")}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                color="primary"
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <DisplaySettingsIcon color={matchPath("ThongSo/*", path.pathname) ? "primary":"inherit"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Thông số"}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding sx={{ backgroundColor:matchPath("DonHang/*", path.pathname)?"rgba(0,0,0,0.10)":"rgba(0,0,0,0)", display: 'block' }}>
                        <ListItemButton
                            color="primary"
                            onClick={()=>navigate("/DonHang")}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                color="primary"
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <ReceiptIcon color={matchPath("DonHang/*", path.pathname) ? "primary":"inherit"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Đơn hàng"}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem  disablePadding sx={{ backgroundColor:matchPath("ThanhToan/*", path.pathname)?"rgba(0,0,0,0.10)":"rgba(0,0,0,0)", display: 'block' }}>
                        <ListItemButton
                            color="primary"
                            onClick={()=>navigate("/ThanhToan")}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                color="primary"
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                <PaidIcon color={matchPath("ThanhToan/*", path.pathname) ? "primary":"inherit"} />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Thanh toán"}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" style={{minHeight:"100vh",padding:"0",paddingTop:"70px"}} sx={{ flexGrow: 1, p: 3 }}>
                <Outlet/>
            </Box>
        </Box>
    );
}