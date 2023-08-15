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
       src="https://yt3.ggpht.com/NHF6hPNCAXWMOMpJr06_rCwN5JCf2dFg4MGQRMG3eQU4-s95FyDPMmYn580rJ7rW0h2WzLUsri8=s68-c-k-c0x00ffffff-no-rj"
       alt="Channel Picture"
      />
      <p>{props.name}</p>
     </div>
    </div>
   </Link>
  </div>
 );
}

export default Video;
