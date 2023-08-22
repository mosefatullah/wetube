import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Video from "./components/Video";
import NetError from "./NetError";
import jsonData from "./data.json";
import blank from "./blank.jpg";

function Home() {
 const [videos, setVideos] = useState([]);
 const [error, setError] = useState(false);

 useEffect(() => {
  const fetchData =async () => {
   try {
    const response = await fetch("playgroup.json");
    const json = await response.json();
    if (response.ok) {
    ///let json = jsonData;
    ///setVideos(json);
    console.log(json);
     setVideos(json);
    } else {
     console.log(await response);
     setError();
    }
   } catch (error) {
    setError("Network error occurred.");
   }
  };

  fetchData();
 }, []);

 //https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Faymansadiq.jpg?alt=media

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
            name={x.title || "Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit"}
            thumb={x.thumbnail || blank}
            pub={x.publicationDate || "0"}
            channelName={x.channelName || "Channel Name"}
            channelThumb={x.channelThumbnail || blank}
            duration={x.duration || "00:00"}
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
