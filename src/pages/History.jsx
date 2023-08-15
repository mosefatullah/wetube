import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function History() {
 return (
  <>
   <Navbar />
   <div className="__commonCss">
    <div className="row">
     <div className="col-md-2">
      <Sidebar />
     </div>
     <div className="col-md-9">
      <div>History</div>
     </div>
    </div>
   </div>
  </>
 );
}

export default History;
