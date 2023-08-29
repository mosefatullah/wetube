import React from "react";

import { app } from "../../utils/firebase";
import {
 getAuth,
 signInWithEmailAndPassword,
 onAuthStateChanged,
} from "@firebase/auth";

export default class Account extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   email: "",
   password: "",
   onLogin: null,
  };
 }
 componentDidMount() {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
   if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("uid : " + uid);
    document.querySelector(".__account").innerHTML = `
        <h5>Account</h5>
        <p>Logged in as ${user.email}</p>
        <button class="btn btn-danger" id="logout">Logout</button>
        `;
    if (document.querySelector("#logout")) {
     document.querySelector("#logout").addEventListener("click", () => {
      auth.signOut();
     });
    }
   } else {
    // User is signed out
    console.log("user is logged out");
   }
  });
  this.setState({
   onLogin: (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
     .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert(user);
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " : " + errorMessage);
     });
   },
  });
 }
 render() {
  return (
   <div className="__account">
    <h5>Account</h5>
    <form onSubmit={this.state.onLogin}>
     <input
      type="email"
      className="form-control"
      placeholder="Email"
      onChange={(e) => this.setState({ email: e.target.value })}
     />
     <input
      type="password"
      className="form-control"
      placeholder="Password"
      onChange={(e) => this.setState({ password: e.target.value })}
     />
     <button type="submit" className="btn btn-primary">
      Login
     </button>
    </form>
   </div>
  );
 }
}
