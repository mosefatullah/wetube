import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Theme } from "../services/theme";
import { Button } from "@mui/material";
import { alpha } from "@mui/material/styles";

function Header() {
 const [anchorEl, setAnchorEl] = React.useState(null);
 const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

 const isMenuOpen = Boolean(anchorEl);
 const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

 const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
 };

 const handleMobileMenuClose = () => {
  setMobileMoreAnchorEl(null);
 };

 const handleMenuClose = () => {
  setAnchorEl(null);
  handleMobileMenuClose();
 };

 const handleMobileMenuOpen = (event) => {
  setMobileMoreAnchorEl(event.currentTarget);
 };

 const menuId = "primary-search-account-menu";
 const renderMenu = (
  <Menu
   anchorEl={anchorEl}
   anchorOrigin={{
    vertical: "top",
    horizontal: "right",
   }}
   id={menuId}
   keepMounted
   transformOrigin={{
    vertical: "top",
    horizontal: "right",
   }}
   open={isMenuOpen}
   onClose={handleMenuClose}
  >
   <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
   <MenuItem onClick={handleMenuClose}>My account</MenuItem>
  </Menu>
 );

 return (
  <Box sx={{ flexGrow: 1 }} position="sticky" top="0" left="0" zIndex="1000">
   <AppBar
    position="sticky"
    style={{
     background: Theme.palette.background.default,
     boxShadow: "none",
     height: "65px",
    }}
   >
    <Toolbar>
     <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{ mr: 1 }}
     >
      <MenuIcon />
     </IconButton>
     <Link to="/" style={{ display: "flex", alignItems: "center", marginRight: "0.5rem" }}>
      <img
       src={logo}
       alt="Logo"
       style={{
        width: "35px",
        height: "35px",
        marginRight: "5px",
       }}
      />
      <h3>WeTube</h3>
     </Link>
     <Box sx={{ flexGrow: 1 }} />
     <input
      type="text"
      placeholder="Search"
      style={{
       width: "100%",
       maxWidth: "400px",
       height: "35px",
       borderRadius: "100rem",
       borderTopRightRadius: "0",
       borderBottomRightRadius: "0",
       border: "1px solid " + alpha(Theme.palette.text.secondary, 0.2),
       outline: "none",
       padding: "1.1rem 1rem",
       fontSize: Theme.typography.fontSize,
       backgroundColor: alpha(Theme.palette.background.paper, 0.5),
       color: Theme.palette.text.primary,
      }}
      onFocus={(e) => {
       e.target.style.borderColor = Theme.palette.primary.main;
      }}
      onBlur={(e) => {
       e.target.style.borderColor = alpha(Theme.palette.text.secondary, 0.2);
      }}
     />
     <Button
      variant="contained"
      style={{
       height: "35px",
       padding: "1.1rem 0",
       borderRadius: "1rem",
       borderTopLeftRadius: "0",
       borderBottomLeftRadius: "0",
       border: "1px solid " + alpha(Theme.palette.text.secondary, 0.2),
       borderLeft: "none",
       background: Theme.palette.background.paper,
       color: Theme.palette.text.primary,
      }}
     >
      <SearchIcon
       sx={{
        padding: "0.1rem !important",
       }}
      />
     </Button>
     <Box sx={{ flexGrow: 1 }} />
     <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
       <Badge badgeContent={4} color="error">
        <MailIcon />
       </Badge>
      </IconButton>
      <IconButton
       size="large"
       aria-label="show 17 new notifications"
       color="inherit"
      >
       <Badge badgeContent={17} color="error">
        <NotificationsIcon />
       </Badge>
      </IconButton>
      <IconButton
       size="large"
       edge="end"
       aria-label="account of current user"
       aria-controls={menuId}
       aria-haspopup="true"
       onClick={handleProfileMenuOpen}
       color="inherit"
      >
       <AccountCircle />
      </IconButton>
     </Box>
    </Toolbar>
   </AppBar>
   {renderMenu}
  </Box>
 );
}

export default Header;
