import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function Home() {
 return (
  <>
   <Navbar />
   <div className="row">
    <div className="col-md-2">
     <Sidebar />
    </div>
    <div className="col-md-9">
     <div>Home</div>
     <p className="text-danger">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati soluta
      aspernatur ipsa ex tempore laborum vero deserunt voluptates, placeat
      pariatur excepturi animi eos consectetur asperiores. Unde optio nam iusto
      repellat?
     </p>
    </div>
   </div>
  </>
 );
}

export default Home;
