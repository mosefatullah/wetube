import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Subscriptions() {
 return (
  <>
   <Navbar />
   <div className="__commonCss row">
    <div className="col-md-2">
     <Sidebar />
    </div>
    <div className="col-md-9">
     <div>Subscriptions</div>
    </div>
   </div>
  </>
 );
}

export default Subscriptions;
