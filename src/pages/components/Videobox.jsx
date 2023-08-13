import React from "react";

function Videobox({ src, title, channelSrc }) {
 return (
  <>
   <div className="videobox">
    <img src={src} alt={title} />
    <h3>{title}</h3>
    <div className="row">
        <div className="col-md-6">
            <img className="profilePicture" src={channelSrc} alt="Channel Picture" />
            <div className="profile">
                <p>Stack Over</p>
                <span>209k Connectors</span>
            </div>
            <button className="btn rounded-5">Connect</button>
        </div>
        <div className="col-md-6"></div>
    </div>
   </div>
  </>
 );
}

export default Videobox;
