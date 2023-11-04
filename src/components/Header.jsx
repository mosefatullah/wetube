import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Theme } from "../services/theme";
import { Avatar, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import auth from "../services/auth";
import AccountModal from "./AccountModal";

function Header() {
 const [openAccountModal, setOpenAccountModal] = React.useState(false);
 const [profilePicture, setProfilePicture] = React.useState(null);

 React.useEffect(() => {
  auth("auth", (user) => {
   if(user)setProfilePicture(user.photoURL);
   else setProfilePicture(null);
  });
 }, []);

 return (
  <>
   <AccountModal
    willOpen={openAccountModal}
    onClose={() => {
     setOpenAccountModal(false);
    }}
   />
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
      <Link
       to="/"
       style={{ display: "flex", alignItems: "center", marginRight: "0.5rem" }}
      >
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
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
       <IconButton size="large" aria-label="Notifications" color="inherit">
        <Badge badgeContent={17} color="error">
         <NotificationsIcon
          style={{
           width: "22px",
           height: "22px",
          }}
         />
        </Badge>
       </IconButton>
       <IconButton
        size={profilePicture ? "medium" : "large"}
        edge="end"
        aria-label="Account"
        aria-haspopup="true"
        color="inherit"
        onClick={() => {
         setOpenAccountModal(true);
        }}
       >
        {!profilePicture && <AccountCircle />}
        {profilePicture && (
         <Avatar
          src={profilePicture}
          style={{
           width: "32px",
           height: "32px",
          }}
         ></Avatar>
        )}
       </IconButton>
      </Box>
     </Toolbar>
    </AppBar>
   </Box>
  </>
 );
}

export default Header;
