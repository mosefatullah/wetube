import React from "react";
import Sidebar from "../components/Sidebar";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

function Channel() {
 const [tab, setTab] = React.useState(null);

 let { search } = useLocation();
 const query = new URLSearchParams(search);

 React.useEffect(() => {
  switch (query.get("tab")) {
   case "subscriptions":
    setTab(1);
    break;
   case "history":
    setTab(2);
    break;
   case "playlists":
    setTab(3);
    break;
  }
 }, [query]);
 return (
  <Grid container spacing={3}>
   <Grid
    item
    lg={2}
    style={{
     maxWidth: "250px",
    }}
   >
    <Sidebar active={tab} />
   </Grid>
   <Grid item xs={12} lg={10}></Grid>
  </Grid>
 );
}

export default Channel;
