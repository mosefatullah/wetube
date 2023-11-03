import React from "react";
import { Button } from "@mui/material";

function Category() {
 return (
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
   <Button className="category">Browse Accounts</Button>
  </div>
 );
}

export default Category;
