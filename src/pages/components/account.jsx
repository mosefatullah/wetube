import React from "react";

import { app } from "../../utils/firebase";
import {
 getAuth,
 signInWithEmailAndPassword,
 signInWithPopup,
 browserPopupRedirectResolver,
 GoogleAuthProvider,
 GithubAuthProvider,
 onAuthStateChanged,
 signOut,
} from "@firebase/auth";
import { getDatabase, onValue, ref, set } from "@firebase/database";

export default class Account extends React.Component {
 loadingBar = (
  <div className="text-center">
   <div className="spinner spinner-border"></div>
  </div>
 );
 constructor(props) {
  super(props);
  this.state = {
   email: "",
   password: "",
   signInWithEmail: null,
   signInWithGoogle: null,
   signInWithGithub: null,
   accountComponent: <></>,
   isLoggedInOrOutNow: props.onDataSent,
  };
 }

 storeAccountInfo = (user) => {
  const db = getDatabase(app);
  const data = {
   email: user.email,
   name: user.displayName,
   photo: user.photoURL,
   uid: user.uid,
   metadata: user.metadata,
  };
  const refs = ref(db, "users/" + user.uid);
  onValue(refs, (snapshot) => {
   set(refs, data).catch((error) => {
    console.error("Error saving data: ", error);
   });
  });
  console.log(user.metadata);
 };

 userDataShowing = (user) => {
  const db = getDatabase(app);
  const refs = ref(db, "users/" + user.uid);
  onValue(refs, (snapshot) => {
   if (snapshot.exists() === true) {
    const data = snapshot.val();
    const { email, name, uid } = data;
    this.setState({
     accountComponent: (
      <>
       <h5>Account</h5>
       <p>
        Logged in as <small>{email}</small>
       </p>
       <p>
        Name: <small>{name}</small>
       </p>
       <p>
        UID: <small>{uid}</small>
       </p>
       <button
        className="btn btn-danger"
        onClick={() => {
         const auth = getAuth(app);
         this.setState({
          accountComponent: this.loadingBar,
         });
         signOut(auth)
          .then(() => {
           this.state.isLoggedInOrOutNow(true);
           this.loggedOutDataShowing();
          })
          .catch((error) => {
           console.log(error);
          });
        }}
       >
        Logout
       </button>
      </>
     ),
    });
   }
  });
 };

 loggedOutDataShowing = () => {
  this.setState({
   accountComponent: (
    <>
     <h5>Account</h5>
     <form onSubmit={this.state.signInWithEmail}>
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
     <button
      type="submit"
      className="btn btn-secondary"
      onClick={this.state.signInWithGoogle}
     >
      Login with Google
     </button>
     <button
      type="submit"
      className="btn btn-secondary"
      onClick={this.state.signInWithGithub}
     >
      Login with Github
     </button>
    </>
   ),
  });
 };

 componentDidMount() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  onAuthStateChanged(auth, (user) => {
   this.setState({
    accountComponent: this.loadingBar,
   });
   if (user) {
    this.storeAccountInfo(user);
    this.userDataShowing(user);
   } else {
    this.loggedOutDataShowing();
   }
  });

  this.setState({
   signInWithEmail: (e) => {
    e.preventDefault();
    this.setState({
     accountComponent: this.loadingBar,
    });
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
     .then((userCredential) => {
      const user = userCredential.user;
      this.state.isLoggedInOrOutNow(true);
      this.storeAccountInfo(user);
      this.userDataShowing(user);
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " : " + errorMessage);
     });
   },
   signInWithGoogle: async () => {
    try {
     this.setState({
      accountComponent: this.loadingBar,
     });
     const a = await signInWithPopup(
      auth,
      googleProvider,
      browserPopupRedirectResolver
     );
     this.state.isLoggedInOrOutNow(true);
     this.storeAccountInfo(a.user);
     this.userDataShowing(a.user);
    } catch (err) {
     console.error(err);
    }
   },
   signInWithGithub: async () => {
    try {
     this.setState({
      accountComponent: this.loadingBar,
     });
     const a = await signInWithPopup(
      auth,
      githubProvider,
      browserPopupRedirectResolver
     );
     this.state.isLoggedInOrOutNow(true);
     this.storeAccountInfo(a.user);
     this.userDataShowing(a.user);
    } catch (err) {
     console.error(err);
    }
   },
  });
 }

 render() {
  return <div className="__account">{this.state.accountComponent}</div>;
 }
}
