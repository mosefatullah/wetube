import React from "react";
import Category from "../components/Category";
import getVideo from "../services/getvideo";
import { Button, Chip, Divider, Grid, Paper, Skeleton } from "@mui/material";
import { Message, PauseCircle, PlayCircle } from "@mui/icons-material";
import blank from "../assets/images/blank.jpg";

import { app } from "../services/firebase";
import { onAuthStateChanged, getAuth } from "@firebase/auth";
import { getDatabase, onValue, ref, set } from "@firebase/database";
import { useLocation } from "react-router-dom";

function Watch() {
 const v = new URLSearchParams(
  useLocation().search || window.location.search
 ).get("i");
 const videoRef = React.useRef(null);
 const [video, setVideo] = React.useState({});
 const [isLoading, setIsLoading] = React.useState(true);
 const [isPlaying, setIsPlaying] = React.useState(true);
 const [views, setViews] = React.useState(0);
 const [isLiked, setIsLiked] = React.useState(false);
 const [showDescription, setShowDescription] = React.useState(false);
 const [btnDescription, setBtnDescription] = React.useState("More");
 const [displayPlayPause, setDisplayPlayPause] = React.useState("none");

 const handleTogglePlay = () => {
  const videoElement = videoRef.current;
  if (videoElement) {
   if (isPlaying) {
    videoElement.pause();
   } else {
    videoElement.play();
   }
   setIsPlaying(!isPlaying);
  }
 };
 const handlePlay = () => {
  setIsPlaying(true);
 };
 const handlePause = () => {
  setIsPlaying(false);
 };
 const handleLoadedMetadata = () => {
  setIsLoading(false);
 };
 const viewCount = () => {
  const db = getDatabase(app);
  if (getAuth(app).currentUser && v) {
   const uid = getAuth(app).currentUser.uid;
   onValue(ref(db, `videos/${v}`), (snapshot) => {
    if (snapshot.exists()) {
     setViews(snapshot.val().views || 0);
    }
   });
   onValue(ref(db, `likes/${uid}/${v}`), (snapshot) => {
    if (snapshot.exists()) {
     setIsLiked(snapshot.val() || false);
    }
   });
   onValue(ref(db, `videos/${v}`), (snapshot) => {
    if (snapshot.exists()) {
     setViews(snapshot.val().views || 0);
    }
   });
  }
 };
 const setHistory = () => {
  onAuthStateChanged(getAuth(app), (user) => {
   if (user && v) {
    const db = getDatabase(app);
    set(ref(db, "history/" + user.uid + "/" + v), true);
   }
  });
 };
 const onLike = () => {
  setIsLiked(!isLiked);
  if (getAuth(app).currentUser && v) {
   const uid = getAuth(app).currentUser.uid;
   const db = getDatabase(app);
   (async () => {
    await set(ref(db, `likes/${uid}/${v}`), !isLiked);
   })();
  }
 };
 const Placeholder = () => (
  <Paper
   elevation={0}
   sx={{
    height: "1rem",
    width: "100%",
    minWidth: "4rem",
    backgroundColor: "#444",
   }}
  ></Paper>
 );

 React.useEffect(() => {
  window.scrollTo(0, 0);
  getVideo(["by_id", v], (data) => {
   setVideo(data);
  });
  setHistory();
  return () => {
   setVideo({});
   setDisplayPlayPause("none");
  };
 }, [v]);

 React.useEffect(() => {
  viewCount();
  setDisplayPlayPause("none");
  return () => {
   setViews(0);
  };
 }, [video]);

 React.useEffect(() => {
  const videoElement = videoRef.current;
  if (videoElement) {
   videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
   if (videoElement.paused) {
    setIsPlaying(false);
   } else {
    setIsPlaying(true);
   }
   return () => {
    videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
   };
  }
 }, []);

 return (
  <div className="__watch">
   <div className="container-fluid">
    <Grid container spacing={3}>
     <Grid item xs={12} lg={8}>
      <div className="__video">
       <div className="videobox">
        <div
         className="video"
         style={{
          position: "relative",
          backgroundColor: "rgba(33, 37, 41,0.5)",
          backgroundImage: `${
           video.thumbnail
            ? `url(https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fvideo%2F${video.thumbnail}?alt=media)`
            : "none"
          }`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
         }}
        >
         {isLoading === true && (
          <div
           style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
           }}
          >
           <Skeleton
            width="100%"
            height="100%"
            animation="wave"
            variant="rectangular"
            style={{
             borderTopLeftRadius: "10px",
             borderTopRightRadius: "10px",
            }}
           />
          </div>
         )}
         <video
          src={
           video.videoUrl &&
           "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/videos%2F" +
            video.videoUrl +
            "?alt=media"
          }
          ref={videoRef}
          controls
          autoPlay
          muted=""
          poster={
           video.thumbnail &&
           "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fvideo%2F" +
            video.thumbnail +
            "?alt=media"
          }
          width="100%"
          onPlay={handlePlay}
          onPause={handlePause}
          style={{ visibility: isLoading === true ? "hidden" : "visible" }}
         >
          Your browser does not support video.
         </video>
        </div>
        <Grid
         container
         spacing={2}
         className="row"
         sx={{
          rowGap: "1rem",
         }}
        >
         <Grid item xs={12} md={6}>
          <img
           className="profilePicture"
           src={
            video.channelThumbnail
             ? "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fprofile%2F" +
               video.channelThumbnail +
               "?alt=media"
             : blank
           }
           alt={video.channelName}
          />
          <div className="profile">
           <p>{video.channelName || <Placeholder />}</p>
           <span>0 Subscribers</span>
          </div>
          <Button className="btn rounded-5 subscribe-btn">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 -960 960 960"
            width="18"
           >
            <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
           </svg>
           Subscribe
          </Button>
         </Grid>
         <Grid item xs={12} md={6}>
          <div
           className="all"
           style={{
            display: "flex",
           }}
          >
           <div
            style={{
             display: "flex",
             marginRight: "0.5rem",
            }}
           >
            <Button
             className={`btn like ${isLiked == true && "active"}`}
             onClick={onLike}
            >
             {isLiked == false ? (
              <svg
               xmlns="http://www.w3.org/2000/svg"
               height="18"
               viewBox="0 -960 960 960"
               width="18"
              >
               <path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z" />
              </svg>
             ) : (
              <svg
               xmlns="http://www.w3.org/2000/svg"
               width="18"
               height="18"
               className="active"
               viewBox="0 0 16 16"
              >
               <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
               />
              </svg>
             )}
             <span>{isLiked == false ? "Like" : "Liked"}</span>
            </Button>
            <Button className="btn unlike">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 -960 960 960"
              width="18"
             >
              <path d="M242-840h444v512L408-40l-39-31q-6-5-9-14t-3-22v-10l45-211H103q-24 0-42-18t-18-42v-81.839Q43-477 41.5-484.5T43-499l126-290q8.878-21.25 29.595-36.125Q219.311-840 242-840Zm384 60H229L103-481v93h373l-53 249 203-214v-427Zm0 427v-427 427Zm60 25v-60h133v-392H686v-60h193v512H686Z" />
             </svg>
             <span>0</span>
            </Button>
           </div>
           <Button className="btn share ms-2">
            <svg
             xmlns="http://www.w3.org/2000/svg"
             height="18"
             viewBox="0 -960 960 960"
             width="18"
            >
             <path d="M220-40q-24 0-42-18t-18-42v-509q0-24 18-42t42-18h169v60H220v509h520v-509H569v-60h171q24 0 42 18t18 42v509q0 24-18 42t-42 18H220Zm229-307v-457l-88 88-43-43 161-161 161 161-43 43-88-88v457h-60Z" />
            </svg>
            <span>Share</span>
           </Button>
          </div>
         </Grid>
        </Grid>
       </div>
       <div
        className="__watch-bottom-control"
        style={{
         display: displayPlayPause,
        }}
       >
        <Button
         variant="contained"
         className="play-pause-button"
         style={{
          background: isPlaying && "#fff",
         }}
         onClick={handleTogglePlay}
        >
         {isPlaying === true ? (
          <PauseCircle sx={{ color: "#333" }} />
         ) : (
          <PlayCircle sx={{ color: "#fff" }} />
         )}
        </Button>
       </div>
      </div>
      <div className="__comments">
       <div style={{ display: "flex", alignItems: "center" }}>
        <p
         className="heading"
         style={{ display: "flex", alignItems: "center" }}
        >
         <Message fontSize="small" /> Comments
        </p>
        <div style={{ display: "flex", marginLeft: "auto" }}>
         <p className="count">0 Comments</p>
         <Button>Show all comments</Button>
        </div>
       </div>
      </div>
     </Grid>
     <Grid item xs={12} lg={4}>
      <Paper className="card card-body">
       <h2>{video?.title || ""}</h2>
       <h3>
        <Chip
         size="small"
         label={`${views || video?.views || 0} views`}
         style={{ marginRight: "0.5rem" }}
        />
        <Chip
         size="small"
         label={
          video?.publicationDate
           ? new Date(video?.publicationDate).toLocaleDateString()
           : "No date"
         }
        />
       </h3>
       <Divider style={{ margin: "1rem 0" }} />
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
      </Paper>
      <div className="__category-container" style={{ marginTop: "3rem" }}>
       <Category />
      </div>
      <div className="__other-videos">
       {/*{videos.map((x, i) => {
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
         } else {
          return false;
         }
        })}*/}
      </div>
     </Grid>
    </Grid>
   </div>
  </div>
 );
}

export default Watch;
