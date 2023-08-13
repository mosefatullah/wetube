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
   setChannelSrc("https://yt3.ggpht.com/NHF6hPNCAXWMOMpJr06_rCwN5JCf2dFg4MGQRMG3eQU4-s95FyDPMmYn580rJ7rW0h2WzLUsri8=s68-c-k-c0x00ffffff-no-rj");
  };

  fetchData();
 }, [v]);

 return (
  <>
   <Navbar />
   <div className="__watch">
    <div className="container-fluid">
     <div className="row">
      <div className="col-lg-9">
       <Videobox src={thumbnailUrl} title={title} channelSrc={channelSrc} />
      </div>
      <div className="col-lg-3">
       <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid tenetur
        doloribus veniam sequi quaerat reiciendis similique, adipisci saepe
        deleniti necessitatibus corporis architecto. Numquam ratione voluptatum
        assumenda est ex. Iusto, quo?
       </p>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Watch;
