import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Videobox from "./components/Videobox";

function Watch() {
 const v = new URLSearchParams(window.location.search).get("v");
 const [thumbnailUrl, setThumbnailUrl] = useState("");
 const [title, setTitle] = useState("");
 const [channelSrc, setChannelSrc] = useState("");

 const getData = async (id) => {
  try {
   const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos/" + id
   );
   const data = await response.json();
   return data;
  } catch (error) {
   return console.error("Error fetching thumbnail:", error);
  }
 };

 useEffect(() => {
  const fetchData = async () => {
   const url = await getData(v);
   setThumbnailUrl(url.thumbnailUrl);
   setTitle(url.title);
   setChannelSrc(
    "https://yt3.ggpht.com/NHF6hPNCAXWMOMpJr06_rCwN5JCf2dFg4MGQRMG3eQU4-s95FyDPMmYn580rJ7rW0h2WzLUsri8=s68-c-k-c0x00ffffff-no-rj"
   );
  };

  fetchData();

  window.scrollTo({
   top: 0,
   behavior: "smooth",
  });
 }, [v]);

 return (
  <>
   <Navbar />
   <div className="__watch">
    <div className="container-fluid">
     <div className="row row-gap-4">
      <div className="col-lg-8">
       <Videobox src={thumbnailUrl} title={title} channelSrc={channelSrc} />
      </div>
      <div className="col-lg-4">
       <div className="card card-body text-black">
        <h3>Description</h3>
        <hr />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, pariatur amet sit sed impedit nulla eos dicta ducimus eligendi cupiditate quod voluptatem sequi beatae incidunt esse maiores porro repellat et.</p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Watch;
