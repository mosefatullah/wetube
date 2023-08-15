import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Video from "./components/Video";
import NetError from "./NetError";
import jsonData from "./data.json";

function Home() {
 const [videos, setVideos] = useState([]);
 const [error, setError] = useState(false);

 useEffect(() => {
  const fetchData = () => {
   try {
    //const response = await fetch("data.json");
    //const json = await response.json();
    //if (response.ok) {
    let json = jsonData;
    setVideos(json);
    //} else {
    // console.log(await response);
    // setError();
    //}
   } catch (error) {
    setError("Network error occurred.");
   }
  };

  fetchData();
 }, []);

 if (error !== false) {
  return <NetError msg={error} />;
 }
 return (
  <>
   <Navbar />
   <div className="__home __commonCss">
    <div className="row">
     <div className="col-md-2">
      <Sidebar />
     </div>
     <div className="col-md-10">
      <div className="__video-container">
       <div className="row row-gap-4">
        {videos.map((x, i) => {
         if (x) {
          if (i > 200) return;
          return (
           <Video
            id={i}
            name={x.title}
            thumb={x.thumbnail}
            pub={x.pubDate}
            channelName={x.author}
            channelThumb={x.thumbnail}
           />
          );
         }
        })}
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Home;
