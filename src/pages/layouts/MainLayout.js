import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    useTheme,
    useMediaQuery,
    Tabs,
    Tab,
} from '@mui/material';
import {
    Logout as LogoutIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Inventory as InventoryIcon,
    Assessment as AssessmentIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import AccountCircle from "@mui/icons-material/AccountCircle";
import mapmyclasses from '../../assets/img/MMC_Logo_colored.png';
import School_Logo from '../../assets/img/School_Logo.png';
import { Breadcrumbs, Link } from "@mui/material";
// import { useDispatch, useSelector } from 'react-redux';
// import { authLogout } from '../redux/features/AuthSlice';



const MainLayout = ({ onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    // const location = useLocation();
    const theme = useTheme();

    const menuItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        { label: 'Users', path: '/users', icon: <PeopleIcon /> },
        { label: 'Products', path: '/products', icon: <InventoryIcon /> },
        { label: 'Reports', path: '/reports', icon: <AssessmentIcon /> },
        { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
    ];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const dispatch = useDispatch();
    const handleLogout = () => {
        handleClose();
        // dispatch(authLogout());
        navigate('/login')
        // onLogout();
    };

    const handleTabChange = (event, newValue) => {
        const path = menuItems[newValue].path;
        navigate(path);
    };

    const getCurrentTabIndex = () => {
        return menuItems.findIndex(item => item.path === location.pathname);
    };
    const navItems = [
        { label: "DASHBOARD", path: "/dashboard" },
        { label: "MESSAGES", path: "/messages" },
        { label: "LMS", path: "/lms" },
        { label: "APPS", path: "/apps" },
        { label: "CHAT", path: "/chat" },
        { label: "MY PROFILE", path: "/my-profile" },
    ];
    const topLevelRoutes = ["/dashboard", "/messages", "/lms", "/apps", "/chat", "/my-profile"];
    const location = useLocation();
    const isTopLevel = topLevelRoutes.includes(location.pathname.toLowerCase());



    const [activeNav, setActiveNav] = useState("DASHBOARD");
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        const matched = navItems.find(
            (item) => item.path.toLowerCase() === location.pathname.toLowerCase()
        );
        setActiveNav(matched ? matched.label : "DASHBOARD");
        const updateHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight);
            }
        };
        updateHeight();

        // Update on resize (responsive)
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);

    }, [location.pathname]);


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
            <AppBar position="static" ref={headerRef} elevation={0} sx={{ position: 'fixed', top: 0, zIndex: 1000 }}>
                <div className="h-14 bg-white shadow flex items-center px-8">
                    <img src={mapmyclasses} alt="mapmyclasses" className="h-9" />
                    {/* if you want something on the right too */}
                    <div className="ml-auto flex items-center gap-4">
                        <SearchIcon className="cursor-pointer text-gray-600 hover:text-blue-600" />
                        <NotificationsIcon className="cursor-pointer text-gray-600 hover:text-blue-600" />
                        <Brightness4Icon className="cursor-pointer text-gray-600 hover:text-blue-600" />
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                            >
                                <AccountCircle className="cursor-pointer text-gray-600 hover:text-blue-600" />
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon sx={{ mr: 1 }} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                        {/* <AccountCircle className="cursor-pointer text-gray-600 hover:text-blue-600" /> */}
                        {/* Add right-side content here if needed */}
                    </div>
                </div>
                {/* Top Bar */}


                {/* Nav Bar */}
                <div className="flex justify-between bg-white shadow-sm px-8">
                    {isTopLevel ? (
                        <ul
                            className="flex gap-10 py-3 font-medium"
                            style={{ color: "#686F81", fontSize: "13px", fontWeight: "500" }}
                        >
                            {navItems.map((item) => (
                                <li
                                    key={item.label}
                                    onClick={() => {
                                        setActiveNav(item.label);
                                        navigate(item.path);
                                        console.log(item.path);
                                        console.log(location.pathname);
                                    }}
                                    className={`cursor-pointer relative pb-1 ${activeNav === item.label
                                        ? "text-orange-500 font-semibold"
                                        : "text-grey-400 font-semibold"
                                        }`}
                                >
                                    {item.label}
                                    {activeNav === item.label && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500"></span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div
                            className="flex gap-10 py-3 font-medium"
                            style={{ color: "#686F81", fontSize: "13px" }}
                        >

                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography underline="hover" color="inherit" href="/">
                                    Home
                                </Typography>
                                {location.pathname
                                    .split("/")
                                    .filter((x) => x)
                                    .map((value, index, arr) => {
                                        const to = "/" + arr.slice(0, index + 1).join("/");
                                        const isLast = index === arr.length - 1;
                                        return isLast ? (
                                            <Typography key={to} color="text.primary">
                                                {value.replace("-", " ")}
                                            </Typography>
                                        ) : (
                                            <Link key={to} underline="hover" color="inherit" href={to}>
                                                {value.replace("-", " ")}
                                            </Link>
                                        );
                                    })}
                            </Breadcrumbs>
                        </div>
                    )}

                    <img src={School_Logo} alt="Christ University" className="h-8" />

                </div>

            </AppBar>

            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    mt: `${headerHeight}px`, 
                    backgroundColor: '#FBFBFD',
                    overflowY: 'auto',
                    // overflowX: 'auto'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout; 