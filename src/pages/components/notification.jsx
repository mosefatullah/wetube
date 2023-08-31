import React from "react";

import { app } from "../../utils/firebase";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { getDatabase, onValue, ref, set } from "@firebase/database";

export default class Notification extends React.Component {
 loadingBar = (
  <div className="text-center">
   <div className="spinner spinner-border"></div>
  </div>
 );
 constructor(props) {
  super(props);
  this.state = {
   notifLists: [],
  };
 }

 revealNotifData = (user) => {
  const db = getDatabase(app);
  const notifRef = ref(db, `notifications/${user.uid}`);
  onValue(notifRef, (snapshot) => {
   const data = snapshot.val();
   if (data) {
    let notifLists = [];
    for (const key in data) {
     const notif = data[key];
     const notifList = (
      <li className="list-group-item  bg-transparent text-white" key={key}>
       <h6>{notif.title || "Error Occured!"}</h6>
       <p>
        {notif.content || "Please refresh the page or Wait for some moment."}
       </p>
      </li>
     );
     notifLists.push(notifList);
    }
    this.setState({
     notifLists: notifLists,
    });
   } else {
    this.setState({
     notifLists: [],
    });
   }
  });
 };

 componentDidMount() {
  const auth = getAuth(app);
  this.setState({
   notifLists: this.loadingBar,
  });
  onAuthStateChanged(auth, (user) => {
   if (user) {
    this.revealNotifData(user);
   } else {
    this.setState({
     notifLists: <p className="text-center pt-4">No Notifications</p>,
    });
   }
  });
 }

 render() {
  return (
   <div className="__notification">
    <h5>Notifications</h5>
    <div className="__body">
     <ul className="list-group">
      {typeof this.state.notifLists === "array" && this.state.notifLists !== []
       ? this.state.notifLists.map((e) => e)
       : this.state.notifLists}
     </ul>
    </div>
   </div>
  );
 }
}
