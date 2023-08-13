import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Video from "./components/Video";
import NetError from "./NetError";

function Home() {
 const [videos, setVideos] = useState([]);
 const [error, setError] = useState(false);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await fetch(
     "https://jsonplaceholder.typicode.com/photos"
    );
    const json = await response.json();
    if (response.ok) {
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

 if (error!==false) {
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
          return <Video name={x.title} thumb={x.thumbnailUrl} id={x.id} />;
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
