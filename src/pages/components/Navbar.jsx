import React, { useEffect } from "react";
import logo from "./../../logo.png";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Account from "../components/Account";
import Notification from "../components/Notification";
import Alert from "../components/Alert";

import { app } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, onValue, ref, set } from "@firebase/database";

function Navbar() {
 const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 const [isAccountCompoOpen, setIsAccountCompoOpen] = React.useState(false);
 const [isNotifCompoOpen, setIsNotifCompoOpen] = React.useState(false);
 const [profileImage, setProfileImage] = React.useState(null);
 const [alerting, setAlerting] = React.useState("");
 const [alertMode, setAlertMode] = React.useState("");

 useEffect(() => {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
   if (user) {
    setProfileImage(user.photoURL);
    // check how much notifications are there
    if (document.getElementById("notifNumber")) {
     const db = getDatabase(app);
     const notifRef = ref(db, `notifications/${user.uid}`);
     onValue(notifRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
       const notifNumber = Object.keys(data).length;
       if (document.getElementById("notifNumber")) {
        if (notifNumber > 0) {
         document.getElementById("notifNumber").innerHTML = notifNumber;
         document.getElementById("notifNumber").classList.remove("d-none");
        } else {
         document.getElementById("notifNumber").innerHTML = "";
         document.getElementById("notifNumber").classList.add("d-none");
        }
       } else {
        document.getElementById("notifNumber").innerHTML = "";
        document.getElementById("notifNumber").classList.add("d-none");
       }
      }
     });
    }
   } else {
    setProfileImage(null);
    document.getElementById("notifNumber").innerHTML = "";
    document.getElementById("notifNumber").classList.add("d-none");
   }
  });
 }, []);

 const handleDataFromChild = (isLoggedInOrOutNow) => {
  if (isLoggedInOrOutNow === true) {
   const auth = getAuth(app);
   const user = auth.currentUser;
   setIsAccountCompoOpen(false);
   if (user.metadata.creationTime === user.metadata.lastSignInTime) {
    setAlerting("Welcome to WeTube!");
   }
  }
 };

 const handleAlert = (b, a) => {
  if (b !== "" && b !== null && b !== undefined && b !== false && b) {
   setAlerting(b);
   if (a) setAlertMode(a);
  }
 };

 return (
  <>
   <div className="__navbar">
    <div className="loading-bar-container">
     <div className="loading-bar"></div>
    </div>
    <div className="navbar d-flex align-items-center">
     <div className="navbar-brand d-flex align-items-center">
      <button
       className="btn-round me-2"
       onClick={() => {
        setIsMenuOpen(!isMenuOpen);
        if (document.querySelectorAll(".__commonCss")[0]) {
         document
          .querySelectorAll(".__commonCss .row>div")[0]
          .classList.toggle("d-none");
         document
          .querySelectorAll(".__commonCss .row>div")[1]
          .classList.toggle("w-100");
        } else {
         document.querySelectorAll(".offcanvas")[0].classList.toggle("show");
        }
       }}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
       >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
       </svg>
      </button>
      <Link to="/" className="d-flex">
       <img src={logo} alt="Logo" />
       <h2>WeTube</h2>
      </Link>
     </div>
     <div className="d-flex col-8 justify-content-between">
      <div className="input-group">
       <input
        type="text"
        className="form-control rounded-start-5"
        placeholder="Search"
       />
       <button className="btn rounded-end-5 border">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 0 24 24"
         width="24px"
         fill="#000000"
        >
         <path d="M0 0h24v24H0V0z" fill="none" />
         <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
       </button>
       <button className="btn-round ms-3">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         enableBackground="new 0 0 24 24"
         height="18px"
         viewBox="0 0 24 24"
         width="18px"
         fill="#000000"
        >
         <g>
          <rect fill="none" height="24" width="24" x="0" />
         </g>
         <g>
          <g>
           <polygon points="20,7 20.94,4.94 23,4 20.94,3.06 20,1 19.06,3.06 17,4 19.06,4.94" />
           <polygon points="8.5,7 9.44,4.94 11.5,4 9.44,3.06 8.5,1 7.56,3.06 5.5,4 7.56,4.94" />
           <polygon points="20,12.5 19.06,14.56 17,15.5 19.06,16.44 20,18.5 20.94,16.44 23,15.5 20.94,14.56" />
           <path d="M17.71,9.12l-2.83-2.83C14.68,6.1,14.43,6,14.17,6c-0.26,0-0.51,0.1-0.71,0.29L2.29,17.46c-0.39,0.39-0.39,1.02,0,1.41 l2.83,2.83C5.32,21.9,5.57,22,5.83,22s0.51-0.1,0.71-0.29l11.17-11.17C18.1,10.15,18.1,9.51,17.71,9.12z M14.17,8.42l1.41,1.41 L14.41,11L13,9.59L14.17,8.42z M5.83,19.59l-1.41-1.41L11.59,11L13,12.41L5.83,19.59z" />
          </g>
         </g>
        </svg>
       </button>
      </div>
      <div className="menu d-flex gap-2">
       <button
        className={isNotifCompoOpen === true ? "btn-round active" : "btn-round"}
        onClick={() => {
         if (isAccountCompoOpen === false) {
          setIsNotifCompoOpen(!isNotifCompoOpen);
         } else {
          setIsAccountCompoOpen(!isAccountCompoOpen);
          setIsNotifCompoOpen(!isNotifCompoOpen);
         }
        }}
       >
        <svg
         xmlns="http://www.w3.org/2000/svg"
         height="24px"
         viewBox="0 0 24 24"
         width="24px"
         fill="#000000"
        >
         <path d="M0 0h24v24H0V0z" fill="none" />
         <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
        </svg>
       </button>
       <sup className="badge bg-danger text-light d-none" id="notifNumber">
        1
       </sup>
       <div className="position-relative">
        <button
         className={
          isAccountCompoOpen === true ? "btn-round active" : "btn-round"
         }
         id={profileImage !== null ? "profile-image" : ""}
         onClick={() => {
          if (isNotifCompoOpen === false) {
           setIsAccountCompoOpen(!isAccountCompoOpen);
          } else {
           setIsAccountCompoOpen(!isAccountCompoOpen);
           setIsNotifCompoOpen(!isNotifCompoOpen);
          }
         }}
        >
         {profileImage !== null ? (
          <img src={profileImage} alt="Profile" />
         ) : (
          <svg
           xmlns="http://www.w3.org/2000/svg"
           enableBackground="new 0 0 24 24"
           height="24px"
           viewBox="0 0 24 24"
           width="24px"
           fill="#000000"
          >
           <g>
            <rect fill="none" height="24" width="24" />
           </g>
           <g>
            <g>
             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38C16.45 15.8 14.32 15 12 15s-4.45.8-6.14 2.12C4.7 15.73 4 13.95 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z" />
             <path d="M12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
            </g>
           </g>
          </svg>
         )}
        </button>
        <div
         className={isAccountCompoOpen || isNotifCompoOpen ? "layer-blur" : ""}
        ></div>
        <div
         className={`__account-menu ${isAccountCompoOpen ? "visible" : ""}`}
        >
         <Account onDataSent={handleDataFromChild} onAlert={handleAlert} />
        </div>
        <div
         className={`__notification-menu ${isNotifCompoOpen ? "visible" : ""}`}
        >
         <Notification />
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>

   <div
    className="offcanvas offcanvas-start bg-black text-white"
    tabIndex="-1"
    id="menuCanvas"
   >
    <div className="offcanvas-header">
     <h5 className="offcanvas-title">Wetube</h5>
     <button
      className="btn btn-dark btn-sm"
      onClick={() => {
       setIsMenuOpen(!isMenuOpen);
       document.querySelectorAll(".offcanvas")[0].classList.toggle("show");
      }}
     >
      Close
     </button>
    </div>
    <div className="offcanvas-body">{<Sidebar />}</div>
   </div>
   {alerting === "" ? (
    ""
   ) : (
    <Alert bg={alertMode} onAlert={handleAlert}>
     {alerting}
    </Alert>
   )}
  </>
 );
}

export default Navbar;
