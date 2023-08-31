import React, { useState, useRef, useEffect } from "react";

function Videobox({
 id,
 name,
 thumb,
 channelName,
 channelThumb,
 video,
 onLike,
 isLiked,
}) {
 const [isLoading, setIsLoading] = useState(true);
 const [isPlaying, setIsPlaying] = useState(true);
 const videoRef = useRef(null);

 useEffect(() => {
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

 const playIcon = (
  <svg
   xmlns="http://www.w3.org/2000/svg"
   height="22"
   viewBox="0 -960 960 960"
   width="22"
  >
   <path d="M525-200v-560h235v560H525Zm-325 0v-560h235v560H200Zm385-60h115v-440H585v440Zm-325 0h115v-440H260v440Zm0-440v440-440Zm325 0v440-440Z" />
  </svg>
 );
 const pauseIcon = (
  <svg
   xmlns="http://www.w3.org/2000/svg"
   height="22"
   viewBox="0 -960 960 960"
   width="22"
  >
   <path d="M320-203v-560l440 280-440 280Zm60-280Zm0 171 269-171-269-171v342Z" />
  </svg>
 );

 return (
  <>
   <div className="videobox">
    <div
     className="video"
     style={{
      backgroundColor: "rgba(33, 37, 41,0.5)",
      backgroundImage: `url(${thumb})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "multiply",
     }}
    >
     {isLoading === true && (
      <div
       className="spinner spinner-border text-primary"
       style={{ width: "8rem", height: "8rem", borderWidth: "0.5rem" }}
      ></div>
     )}
     <video
      src={video}
      ref={videoRef}
      controls
      autoPlay
      muted=""
      poster={thumb}
      width="100%"
      onPlay={handlePlay}
      onPause={handlePause}
      style={{ visibility: isLoading === true ? "hidden" : "visible" }}
     >
      Your browser does not support video.
     </video>
    </div>
    <div className="row row-gap-4">
     <div className="col-12 col-md-6">
      <img className="profilePicture" src={channelThumb} alt={channelName} />
      <div className="profile">
       <p>{channelName}</p>
       <span>0 Subscribers</span>
      </div>
      <button className="btn rounded-5 subscribe-btn">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        height="18"
        viewBox="0 -960 960 960"
        width="18"
       >
        <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
       </svg>
       Subscribe
      </button>
     </div>
     <div className="col-12 col-md-6">
      <div className="all">
       <div className="btn-group">
        <button
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
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
           />
          </svg>
         )}
         <span>
            {isLiked == false ? "Like" : "Liked"}
         </span>
        </button>
        <button className="btn unlike">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
         >
          <path d="M242-840h444v512L408-40l-39-31q-6-5-9-14t-3-22v-10l45-211H103q-24 0-42-18t-18-42v-81.839Q43-477 41.5-484.5T43-499l126-290q8.878-21.25 29.595-36.125Q219.311-840 242-840Zm384 60H229L103-481v93h373l-53 249 203-214v-427Zm0 427v-427 427Zm60 25v-60h133v-392H686v-60h193v512H686Z" />
         </svg>
         <span>0</span>
        </button>
       </div>
       <button className="btn share ms-2">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         height="18"
         viewBox="0 -960 960 960"
         width="18"
        >
         <path d="M220-40q-24 0-42-18t-18-42v-509q0-24 18-42t42-18h169v60H220v509h520v-509H569v-60h171q24 0 42 18t18 42v509q0 24-18 42t-42 18H220Zm229-307v-457l-88 88-43-43 161-161 161 161-43 43-88-88v457h-60Z" />
        </svg>
        <span>Share</span>
       </button>
      </div>
     </div>
    </div>
   </div>
   <div className="__watch-bottom-control">
    <div
     className={`play-pause-button ${isPlaying === true ? "" : "bg-secondary"}`}
     onClick={handleTogglePlay}
    >
     {isPlaying === true ? playIcon : pauseIcon}
    </div>
   </div>
  </>
 );
}

export default Videobox;
