import React from "react";
import { Link } from "react-router-dom";

function Video(props) {
 const inputDateString = props.pub;
 // How long ago was the video published?
 const actualDateAgo = new Date(inputDateString);
 const today = new Date();
 const diffTime = Math.abs(today - actualDateAgo);
 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
 const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
 const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
 let ago = "";
 if (diffDays < 7) {
  ago = diffDays + " days ago";
 } else if (diffWeeks < 4) {
  ago = diffWeeks + " weeks ago";
 } else if (diffMonths < 12) {
  ago = diffMonths + " months ago";
 } else {
  ago = diffYears + " years ago";
 }

 return (
  <div className="__video col-sm-6 col-md-5 col-lg-4 col-xxl-3">
   <Link to={"/watch?v=" + props.id}>
    <div className="video">
     <div className="thumbnail">
      <img src={props.thumb} alt={props.name} />
      <span>{props.duration}</span>
     </div>
     <div className="info d-flex">
      <img
       src={props.channelThumb}
       alt={props.channelName}
      />
      <div>
       <p>{props.name}</p>
       <div className="details">
        <span>{props.channelName}</span>
        <br />
        <span>{ago}</span>
       </div>
      </div>
     </div>
    </div>
   </Link>
  </div>
 );
}

export default Video;
