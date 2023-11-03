import React from "react";
import { Paper, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import {
 Home as HomeIcon,
 AccessTimeFilled,
 FeaturedPlayList,
 Subscriptions,
} from "@mui/icons-material";

function Sidebar({active}) {
 return (
  <Paper
   className="__sidemenu"
   sx={{
    minHeight: "90vh",
    display: {
     xs: "none",
     lg: "block",
    },
    background: "transparent",
   }}
  >
   <Link to="/" className={active == 0 && "active"}>
    <Button>
     <span>
      <HomeIcon />
     </span>
     Home
    </Button>
   </Link>
   <Divider
    style={{
     margin: "1rem 0",
    }}
   />
   <Link to="/account?tab=subscriptions" className={active == 1 && "active"}>
    <Button>
     <span>
      <Subscriptions />
     </span>
     Subscriptions
    </Button>
   </Link>
   <Link to="/account?tab=history" className={active == 2 && "active"}>
    <Button>
     <span>
      <AccessTimeFilled />
     </span>
     History
    </Button>
   </Link>
   <Link to="/account?tab=playlists" className={active == 3 && "active"}>
    <Button>
     <span>
      <FeaturedPlayList />
     </span>
     Playlists
    </Button>
   </Link>
  </Paper>
 );
}

export default Sidebar;
