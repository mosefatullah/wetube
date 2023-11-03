import React from "react";

import { Grid, Button } from "@mui/material";
import Video from "../components/Video";
import Sidebar from "./../components/Sidebar";

import getvideos from "../services/getvideos";

function Home() {
 const [videos, setVideos] = React.useState([]);
 React.useEffect(() => {
  getvideos(
   (data) => {
    setVideos(data);
   },
   (err) => {
    alert(err);
   }
  );
 }, []);
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
     <Sidebar active="0" />
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
       {videos.map((v) => {
        return (
         <Grid item xs={11} sm={6} md={4} xl={3} maxWidth="500px">
          <Video {...v} />
         </Grid>
        );
       })}
      </Grid>
     </div>
    </Grid>
   </Grid>
  </>
 );
}

export default Home;
