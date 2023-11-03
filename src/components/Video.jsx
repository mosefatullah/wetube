import React from "react";
import { Link } from "react-router-dom";
import blank from "../assets/images/blank.jpg";
import { Paper, ButtonBase } from "@mui/material";

function Video(props) {
 const Placeholder = () => (
  <Paper
   sx={{
    height: "1rem",
    width: "100%",
    minWidth: "4rem",
    backgroundColor: "rgba(0,0,0,0.1)",
   }}
  ></Paper>
 );
 const inputDateString = props.pub;
 let ago = "";
 if (props.pub) {
  const actualDateAgo = new Date(inputDateString);
  const today = new Date();
  const diffTime = Math.abs(today - actualDateAgo);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
  if (diffDays < 7) {
   ago = diffDays + " days ago";
  } else if (diffWeeks < 4) {
   ago = diffWeeks + " weeks ago";
  } else if (diffMonths < 12) {
   ago = diffMonths + " months ago";
  } else {
   ago = diffYears + " years ago";
  }
 }
 return (
  <div className="__video">
   <Link to={props.id && "/watch?v=" + props.id}>
   <div className="video" onClick={props.onClick || null}>
    <div className="thumbnail">
     <img src={props.thumb || blank} />
     <span>{props.duration}</span>
    </div>
     <div className="info">
      <p>{props.name || <Placeholder />}</p>
      <div style={{ display: "flex" }}>
       <img src={props.channelThumb || blank} />
       <div className="details">
        <span>{props.channelName || ""}</span>
        <br />
        <span>{ago || ""}</span>
       </div>
       <p
        className="vws"
        style={{ marginLeft: "auto", paddingRight: "0.5rem" }}
       >
        {props.views || <Placeholder />}
        {props.views && " Views"}
       </p>
      </div>
     </div>
   </div>
   </Link>
  </div>
 );
}

export default Video;
