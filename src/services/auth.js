import { app } from "./firebase";
import {
 getAuth,
 signInWithPopup,
 GoogleAuthProvider,
 signInWithEmailAndPassword,
 signOut,
 onAuthStateChanged,
} from "@firebase/auth";

export default function auth(instruct, onLoad, onError) {
 try {
  const auth = getAuth(app);
  if (instruct[0] == "email" && instruct[1] && instruct[2]) {
   const email = instruct[1];
   const password = instruct[2];
   signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     if (onLoad) onLoad(userCredential.user);
    })
    .catch((error) => {
     if (onError) onError(error.message, error.code);
    });
  } else if (instruct == "google" || instruct[0] == "google") {
   const provider = new GoogleAuthProvider();
   signInWithPopup(auth, provider)
    .then((result) => {
     const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     const user = result.user;
     if (onLoad) onLoad(user, token);
    })
    .catch((error) => {
     if (onError) onError(error.message, error.code);
    });
  } else if (instruct == "logout") {
   signOut(auth)
    .then(() => {
     if (onLoad) onLoad();
    })
    .catch((error) => {
     if (onError) onError(error.message, error.code);
    });
  } else if (instruct == "auth") {
   auth.onAuthStateChanged((user) => {
    if (onLoad) onLoad(user);
   });
  }
 } catch (error) {
  if (onError) onError("Network error occurred.");
 }
}
