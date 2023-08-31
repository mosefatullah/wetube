import React from "react";
import Alert from "./Alert";

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

 handleAuthError = (error) => {
  switch (error.code) {
   case "auth/invalid-email":
    this.props.onAlert("Invalid Email!", "danger");
    break;
   case "auth/user-disabled":
    this.props.onAlert("User is disabled!", "danger");
    break;
   case "auth/user-not-found":
    this.props.onAlert("User not found!", "danger");
    break;
   case "auth/wrong-password":
    this.props.onAlert("Wrong Password!", "danger");
    break;
   case "auth/popup-closed-by-user":
    this.props.onAlert("Popup closed by user!", "danger");
    break;
   case "auth/account-exists-with-different-credential":
    this.props.onAlert("Account already exists with different one!", "danger");
    break;
   case "auth/operation-not-allowed":
    this.props.onAlert("Operation not allowed!", "danger");
    break;
   case "auth/credential-already-in-use":
    this.props.onAlert("Credential already in use!", "danger");
    break;
   case "auth/timeout":
    this.props.onAlert("Timeout!", "danger");
    break;
  }
 };

 storeAccountInfo = (user) => {
  const db = getDatabase(app);
  const data = {
   email: user.email,
   name: user.displayName,
   photo: user.photoURL,
   uid: user.uid,
   metadata: user.metadata,
  };
  if (user.displayName === null) {
   data.name = user.email.split("@")[0];
  }
  const refs = ref(db, "users/" + user.uid);
  onValue(refs, (snapshot) => {
   if (snapshot.exists() === false) {
    this.props.onAlert("Welcome to WeTube!", "dark");
    set(ref(db, "notifications/" + user.uid), {
     0: {
      title: "Welcome to WeTube!",
      content: "You are now a part of WeTube!",
     },
    }).catch((error) => {
     console.error("Error saving data: ", error);
    });
    set(ref(db, "history/" + user.uid), {}).catch((error) => {
     console.error("Error saving data: ", error);
    });
   }
   set(refs, data).catch((error) => {
    console.error("Error saving data: ", error);
   });
  });
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
       <div className="__body">
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
          this.props.onAlert("User is logged out!", "warning");
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
       </div>
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
     <div className="__body">
      <form onSubmit={this.state.signInWithEmail}>
       <input
        type="email"
        className="form-control"
        placeholder="Email"
        onChange={(e) => this.setState({ email: e.target.value })}
        required
       />
       <input
        type="password"
        className="form-control"
        placeholder="Password"
        onChange={(e) => this.setState({ password: e.target.value })}
        required
       />
       <button type="submit" className="btn btn-primary w-100">
        Login
       </button>
      </form>
      <hr />
      <button
       type="submit"
       className="btn btn-light w-100"
       onClick={this.state.signInWithGoogle}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="18px"
        height="18px"
        className="me-2"
       >
        <defs>
         <path
          id="a"
          d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
         />
        </defs>
        <clipPath id="b">
         <use xlinkHref="#a" overflow="visible" />
        </clipPath>
        <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
        <path
         clipPath="url(#b)"
         fill="#EA4335"
         d="M0 11l17 13 7-6.1L48 14V0H0z"
        />
        <path
         clipPath="url(#b)"
         fill="#34A853"
         d="M0 37l30-23 7.9 1L48 0v48H0z"
        />
        <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
       </svg>{" "}
       Login with Google
      </button>
      <button
       type="submit"
       className="btn btn-secondary w-100"
       onClick={this.state.signInWithGithub}
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="20px"
        height="20px"
        viewBox="0 0 50 50"
        className="me-2"
       >
        <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
       </svg>{" "}
       Login with Github
      </button>
     </div>
    </>
   ),
  });
 };

 componentDidMount() {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  this.setState({
   accountComponent: this.loadingBar,
  });
  onAuthStateChanged(auth, (user) => {
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
      this.props.onAlert(`Welcome back ${user.displayName}!`, "success");
     })
     .catch((error) => {
      this.loggedOutDataShowing();
      this.handleAuthError(error);
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
     this.props.onAlert(`Welcome back ${a.user.displayName}!`, "success");
    } catch (err) {
     this.loggedOutDataShowing();
     this.handleAuthError(err);
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
     this.props.onAlert(`Welcome back ${a.user.displayName}!`, "success");
    } catch (err) {
     this.loggedOutDataShowing();
     this.handleAuthError(err);
    }
   },
  });
 }

 render() {
  return (
   <>
    <div className="__account">{this.state.accountComponent}</div>
   </>
  );
 }
}
