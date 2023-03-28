import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Styles from "./Navbar.module.scss";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ArrowDown from "../../assets/images/arrowDown.svg";
import ArrowLeft from "../../assets/images/arrowLeft.svg";
import { ReactSVG } from "react-svg";
import { navRoutes } from "../../mock/navRoutes";
import { useHistory, useLocation } from "react-router-dom";
import { changeNewNavbar } from "../../redux/actions/navbarNew/navbarNewActions";
import useLocalStorage from "../../helpers/useLocalStorage";
import { ReactComponent as ActiveStateImg } from '../../assets/images/activeState.svg'
import NavBar from './NavBar';
import Header from './Header';
import { makeStyles } from '@material-ui/core';

const drawerWidth = 241;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children?: React.ReactNode,
    title: string

}

export default function Navigation(props: Props) {
    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const matches = useMediaQuery("(max-width:600px)");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const drawer = (
        <div style={{ height: "100vh" }}>

            <NavBar />



        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', background: "#EFF3F8", height: "100vh" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    // ml: { sm: `${drawerWidth}px` },
                    // background: "#EFF3F8",
                    // background: "red"

                }}
                elevation={0}
            >
                <Toolbar sx={{ background: "#EFF3F8" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none !important' }, }}
                        disableRipple

                    >
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Header title={props.title} />
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth, flexShrink: { md: 0 } } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'flex', sm: "flex", md: "none" },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth, background: "#041926",

                        },


                    }}

                >
                    {drawer}
                </Drawer>
                <Drawer

                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "none", md: "block" },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: "#041926" },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` }, }}
            >
                <Toolbar />
                <Box sx={{ paddingInline: { xs: "20px", md: "38px" }, background: "#EFF3F8", }}>
                    {children}
                </Box>
            </Box>
        </Box >
    );
}