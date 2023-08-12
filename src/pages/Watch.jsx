import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Watch() {
 const v = new URLSearchParams(window.location.search).get("v");
 const [thumbnailUrl, setThumbnailUrl] = useState("");

 const getThumb = async (id) => {
  try {
   const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos/" + id
   );
   const data = await response.json();
   return data.thumbnailUrl;
  } catch (error) {
   console.error("Error fetching thumbnail:", error);
   return "";
  }
 };

 useEffect(() => {
  const fetchData = async () => {
   const url = await getThumb(v);
   setThumbnailUrl(url);
  };

  fetchData();
 }, [v]);

 return (
  <>
   <Navbar />
   <div className="row">
    <div className="col-md-2">
     <Sidebar />
    </div>
    <div className="col-md-9">
     <div className="__watch-video">
      <img src={thumbnailUrl} alt="" />
      <p>{thumbnailUrl}</p>
     </div>
    </div>
   </div>
  </>
 );
}

export default Watch;
