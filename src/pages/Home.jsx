import React from "react";

import { Grid } from "@mui/material";
import Video from "../components/Video";
import Sidebar from "./../components/Sidebar";
import Category from "../components/Category";
import getVideo from "../services/getvideo";

function Home() {
 const [videos, setVideos] = React.useState([]);
 React.useEffect(() => {
  getVideo(
   "all",
   (data) => {
    setVideos(data);
   },
   (err) => {
    alert(err);
   }
  );
 }, []);
 return (
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
     <Category />
    </div>
    <div className="__videos-container">
     <Grid
      container
      spacing={2}
      sx={{
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
 );
}

export default Home;
