import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Video from "./components/Video";

function Home() {
 const [videos, setVideos] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
   const response = await fetch("https://jsonplaceholder.typicode.com/photos");
   const json = await response.json();
   setVideos(json);
  };

  fetchData();
 }, []);

 return (
  <>
   <Navbar />
   <div className="row">
    <div className="col-md-2">
     <Sidebar />
    </div>
    <div className="col-md-10">
     <div>Home</div>
     <p className="text-danger">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati soluta
      aspernatur ipsa ex tempore laborum vero deserunt voluptates, placeat
      pariatur excepturi animi eos consectetur asperiores. Unde optio nam iusto
      repellat?
     </p>
     <div className="__video-container">
      <div className="row row-gap-4">
       {videos.map((x, i) => {
        if (i > 30) return;
        return <Video name={x.title} thumb={x.thumbnailUrl} id={x.id} />;
       })}
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Home;
