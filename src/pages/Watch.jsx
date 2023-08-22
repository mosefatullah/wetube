import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Videobox from "./components/Videobox";
import jsonData from "./data.json";
import Linkify from "./components/Linkify";

function Watch() {
 const v = new URLSearchParams(window.location.search).get("v");
 const [video, setVideo] = useState("");

 const [channelName, setChannelName] = useState("Channel Name");
 const [channelThumb, setChannelThumb] = useState("./blank.jpg");
 const [title, setTitle] = useState("Title");
 const [thumb, setThumb] = useState("./blank.jpg");
 const [pub, setPub] = useState("No Date");
 const [description, setDescription] = useState("No Description");

 const [showDescription, setShowDescription] = useState(false);
 const [btnDescription, setBtnDescription] = useState("More");

 useEffect(() => {
  const fetchData = () => {
   try {
    const data = jsonData[v];
    console.log(data);

    const inputDateString = data.publicationDate;
    const parsedDate = new Date(inputDateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
     parsedDate
    );

    setVideo(data.videoUrl);
    setChannelName(data.channelName);
    setChannelThumb(data.channelThumbnail);
    setTitle(data.title);
    setThumb(data.thumbnail);
    setPub(formattedDate);
    setDescription(data.description);
   } catch (error) {
    console.error("Network error occurred.");
   }
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
      <div className="col-lg-4">
       <div className="card card-body bg-dark">
        <h2>{title}</h2>
        <h3>
         0 views - {pub}
        </h3>
        <hr />
        <p>
         <Linkify
          text={description.split("\n").map((item, index) => {
           return index === 0 ? item : [<br key={index} />, item];
          })}
         />
        </p>
        <button
         className="btn btn-toggle-description"
         onClick={() => {
          setShowDescription(!showDescription);
          if (showDescription === false) {
           document.querySelector(".__watch .card-body").style.height = "unset";
           setBtnDescription("Less");
          } else {
           document.querySelector(".__watch .card-body").style.height = "200px";
           setBtnDescription("More");
          }
         }}
        >
         Show {btnDescription}
        </button>
       </div>
      </div>
      <div className="col-lg-8">
       <Videobox
        id={v}
        name={title}
        thumb={thumb}
        channelName={channelName}
        channelThumb={channelThumb}
        video={video}
       />
       <div className="__comments">
        <div className="d-flex">
         <p className="heading">
          <svg
           xmlns="http://www.w3.org/2000/svg"
           height="18"
           viewBox="0 -960 960 960"
           width="18"
          >
           <path d="M880-80 720-240H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v740ZM140-300v-520 520Zm606 0 74 80v-600H140v520h606Z" />
          </svg>
          Comments
         </p>
         <div className="d-flex ms-auto">
          <p className="count">0 Comments</p>
          <button>Show all comments</button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Watch;
