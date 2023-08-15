import React from "react";
import { Link } from "react-router-dom";

function Video(props) {
 return (
  <div className="__video col-sm-6 col-md-5 col-lg-4 col-xxl-3">
   <Link to={"/watch?v=" + props.id}>
    <div className="video">
     <div className="thumbnail">
      <img src={props.thumb} alt={props.name} />
      <span>4:00</span>
     </div>
     <div className="info d-flex">
      <img
       className="align-self-center"
       src={props.channelThumb}
       alt={props.channelName}
      />
      <p>{props.name}</p>
     </div>
    </div>
   </Link>
  </div>
 );
}

export default Video;
