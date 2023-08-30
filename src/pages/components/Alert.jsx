import React from "react";

function Alert(props) {
 return (
  <div
   className={`alert ${props.bg ? "alert-" + props.bg : "alert-light"} alert-dismissible fade show position-fixed bottom-0 end-0`}
   style={{ zIndex: 1000000 }}
   id="alert"
   role="alert"
  >
   {props.children}
   <button type="button" className="btn-close" onClick={
    () => {
     document.getElementById("alert").classList.add("d-none");
    }
   }></button>
  </div>
 );
}

export default Alert;
