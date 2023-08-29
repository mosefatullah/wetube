import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Videobox from "./components/Videobox";
import Video from "./components/Video";
import Category from "./components/Category";
import blank from "./blank.jpg";
//import Linkify from "./components/Linkify";

import { app } from "../utils/firebase";
import { getDatabase, onValue, ref } from "@firebase/database";

function Watch() {
 const v = new URLSearchParams(window.location.search).get("v");
 const [video, setVideo] = useState([]);
 const [videos, setVideos] = useState([]);

 const [channelName, setChannelName] = useState("Error Occured");
 const [channelThumb, setChannelThumb] = useState("./blank.jpg");
 const [title, setTitle] = useState("Please Wait or Refresh the Page!");
 const [thumb, setThumb] = useState("./blank.jpg");
 const [pub, setPub] = useState("No Date");
 //const [description, setDescription] = useState("No Description");

 const [showDescription, setShowDescription] = useState(false);
 const [btnDescription, setBtnDescription] = useState("More");

 const [error, setError] = useState(false);

 const fetchFiredb = () => {
  try {
   const db = getDatabase(app);
   const query = ref(db, "videos");
   return onValue(query, (snapshot) => {
    const data = snapshot.val();
    if (snapshot.exists()) {
     setVideos(data);
     if (data[v].publicationDate === undefined) {
      setError("Current video is unavailable!");
      return;
     }
     const inputDateString = data[v].publicationDate;
     const parsedDate = new Date(inputDateString);
     const options = { year: "numeric", month: "long", day: "numeric" };
     const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      parsedDate
     );
     setVideo(
      "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/videos%2F" +
       data[v].videoUrl +
       "?alt=media"
     );
     setChannelName(data[v].channelName);
     setChannelThumb(
      "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fprofile%2F" +
       data[v].channelThumbnail +
       "?alt=media"
     );
     setTitle(data[v].title);
     setThumb(
      "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fvideo%2F" +
       data[v].thumbnail +
       "?alt=media"
     );
     setPub(formattedDate);
     //setDescription(data[v].description);
    } else {
     setError("Current video is unavailable!");
    }
   });
  } catch (error) {
   setError("Network error occurred.");
  }
 };
 useEffect(() => {
  window.scrollTo({
   top: 0,
   behavior: "smooth",
  });
  fetchFiredb();
 }, [v]);

 if (error !== false) {
  return (
   <>
    <Navbar />
    <div className="__watch">
     <div className="container-fluid">
      <div className="row row-gap-4">
       <div className="container text-center">
        <img
         alt="Error"
         className="mt-5 pt-5"
         src="https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png"
         width="100px"
        />
        <h5 className="mt-4 mb-3 fw-bold text-capitalize">{error}</h5>
        <p>
         This video is not loaded because of server-issue,
         <br />
         the video may be deleted or connection error!
        </p>
       </div>
      </div>
     </div>
    </div>
   </>
  );
 }
 return (
  <>
   <Navbar />
   <div className="__watch">
    <div className="container-fluid">
     <div className="row row-gap-4">
      <div className="col-lg-4">
       <div className="card card-body bg-dark">
        <h2>{title}</h2>
        <h3>0 views - {pub}</h3>
        <hr />
        <p>
         Description
         {/* <Linkify */}
         {/* text={description.split("\n").map((item, index) => { */}
         {/* return index === 0 ? item : [<br key={index} />, item]; */}
         {/* })} */}
         {/* /> */}
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
       <div className="__category-container mt-5">
        <Category />
       </div>
       <div className="__other-videos">
        {videos.map((x, i) => {
         if (x) {
          return (
           <Video
            id={i}
            name={x.title || "Please Wait or Refresh the Page!"}
            thumb={
             "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fvideo%2F" +
              x.thumbnail +
              "?alt=media" || blank
            }
            pub={x.publicationDate || "0"}
            channelName={x.channelName || "Error Occured"}
            channelThumb={
             "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fprofile%2F" +
              x.channelThumbnail +
              "?alt=media" || blank
            }
            duration={x.duration || "00:00"}
            views={x.views || "0"}
            onClick={fetchFiredb}
           />
          );
         }
        })}
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
