import { set } from "@firebase/database";
import React, { useEffect } from "react";

function Alert(props) {
 useEffect(() => {
  document.getElementById("alert").classList.add("show");
  setTimeout(() => {
   document.getElementById("alert").classList.remove("show");
  }, 5000);
 }, [props.children]);

 return (
  <div
   className={`alert ${
    props.bg ? "alert-" + props.bg : "alert-dark"
   } alert-dismissible fade show position-fixed bottom-0 start-0`}
   style={{
    zIndex: 1000000,
    fontSize: "0.8rem",
    padding: "0.4rem 2rem",
    margin: "1.5rem",
    borderRadius: "0rem",
    userSelect: "none",
   }}
   id="alert"
   role="alert"
   onChange={(e) => {
    e.target.classList.add("show");
   }}
   onClick={(e) => {
    e.target.classList.remove("show");
   }}
  >
   {props.children}
  </div>
 );
}

export default Alert;
