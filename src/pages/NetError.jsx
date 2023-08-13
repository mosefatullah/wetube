import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function NetError({msg}) {
 function refreshPage() {
  window.location.reload(false);
 }
 return (
  <>
   <Navbar />
   <div className="__home">
    <div className="row">
     <div className="col-md-2">
      <Sidebar />
     </div>
     <div className="col-md-10">
      <div className="text-center py-5 my-5">
       <h2 className="fw-bold">An Error Occured!</h2>
       <p>{msg !== undefined ? msg : `Please refresh the page or wait for some moment.`}</p>
       <button className="btn btn-dark btn-sm mt-4" onClick={refreshPage}>Refresh the Page</button>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default NetError;
