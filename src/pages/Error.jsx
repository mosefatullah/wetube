import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"
import { Link } from 'react-router-dom';

function Error() {
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
       <h1 className="fw-bold">404 Error!</h1>
       <p>Page Not Found</p>
       <Link to="/"><button className="btn btn-dark btn-sm mt-4">Return Home</button></Link>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Error;
