import React from "react";

import { Grid, Paper, Divider, Button } from "@mui/material";
import { Theme } from "../services/theme";
import { alpha } from "@mui/material/styles";
import {
 Home as HomeIcon,
 AccessTimeFilled,
 FeaturedPlayList,
 Subscriptions,
} from "@mui/icons-material";

import Video from "../components/Video";
import { Link } from "react-router-dom";

function Home() {
 return (
  <>
   <Grid container spacing={3}>
    <Grid
     item
     lg={2}
     style={{
      maxWidth: "250px",
     }}
    >
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
      <Link to="/" className="active">
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
      <Link to="/account?tab=subscriptions">
       <Button>
        <span>
         <Subscriptions />
        </span>
        Subscriptions
       </Button>
      </Link>
      <Link to="/account?tab=history">
       <Button>
        <span>
         <AccessTimeFilled />
        </span>
        History
       </Button>
      </Link>
      <Link to="/account?playlists">
       <Button>
        <span>
         <FeaturedPlayList />
        </span>
        Playlists
       </Button>
      </Link>
     </Paper>
    </Grid>
    <Grid item xs={12} lg={10}>
     <div className="__category-container">
      <div style={{ display: "flex", overflow: "hidden", overflowX: "scroll" }}>
       <Button className="category active">All</Button>
       <Button className="category">Music</Button>
       <Button className="category">Gaming</Button>
       <Button className="category">Movies</Button>
       <Button className="category">News</Button>
       <Button className="category">Live</Button>
       <Button className="category">Fashion & Beauty</Button>
       <Button className="category">Learning</Button>
       <Button className="category">Sports</Button>
       <Button className="category">360° Video</Button>
       <Button className="category">Browse Channels</Button>
      </div>
     </div>
     <div className="__videos-container">
      <Grid
       container
       spacing={2}
       sx={{
        display: "flex",
        justifyContent: {
         xs: "center",
         sm: "flex-start",
        },
       }}
      >
       <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
        <Video />
       </Grid>
       <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
        <Video />
       </Grid>
       <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
        <Video />
       </Grid>
       <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
        <Video />
       </Grid>
       <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
        <Video />
       </Grid>
       <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
        <Video />
       </Grid>
       <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
        <Video />
       </Grid>
      </Grid>
     </div>
    </Grid>
   </Grid>
  </>
 );
}

export default Home;
