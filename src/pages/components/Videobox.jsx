import React from "react";

function Videobox({ id, name, thumb, channelName, channelThumb, video }) {
 return (
  <>
   <div className="videobox">
    <img src={thumb} alt={name} />
    <div className="row row-gap-4">
     <div className="col-12 col-md-6">
      <img className="profilePicture" src={channelThumb} alt={channelName} />
      <div className="profile">
       <p>{channelName}</p>
       <span>0 Connectors</span>
      </div>
      <button className="btn rounded-5 connect">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        height="18"
        viewBox="0 -960 960 960"
        width="18"
       >
        <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
       </svg>
       Connect
      </button>
     </div>
     <div className="col-12 col-md-6">
      <div className="all">
       <div className="btn-group">
        <button className="btn like">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 -960 960 960"
          width="18"
         >
          <path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z" />
         </svg>
         <span>0</span>
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
  </>
 );
}

export default Videobox;
