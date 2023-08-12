import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Library() {
 return (
  <>
   <Navbar />
   <div className="row">
    <div className="col-md-2">
     <Sidebar />
    </div>
    <div className="col-md-9">
     <div>Library</div>
    </div>
   </div>
  </>
 );
}

export default Library;
