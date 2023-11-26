import React from "react";
import { Link } from "react-router-dom";
import blank from "../assets/images/blank.jpg";
import { Paper } from "@mui/material";
import { Theme } from "../services/theme";

function Video(props) {
 let ago = "";
 const inputDateString = props.publicationDate;
 const Placeholder = () => (
  <Paper
   elevation={0}
   sx={{
    height: "1rem",
    width: "100%",
    minWidth: "4rem",
    backgroundColor: Theme.palette.background.default,
   }}
  ></Paper>
 );
 if (inputDateString) {
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
   <a href={props.id && window.location.href+"/watch?i=" + props.id}>
    <div className="video">
     <div className="thumbnail">
      <img
       src={
        props.thumbnail ? "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fvideo%2F" +
         props.thumbnail +
         "?alt=media" : blank
       }
      />
      <span>{props.duration}</span>
     </div>
     <div className="info">
      <p>{props.title || <Placeholder />}</p>
      <div style={{ display: "flex" }}>
       <img
        src={
         props.channelThumbnail
          ? "https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/photos%2Fprofile%2F" +
            props.channelThumbnail +
            "?alt=media"
          : blank
        }
       />
       <div className="details">
        <span>{ago || ""}</span>
        <br />
        <span>{props.channelName || ""}</span>
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
   </a>
  </div>
 );
}

export default Video;
