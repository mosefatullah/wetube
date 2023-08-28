import { initializeApp } from "@firebase/app";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8Rfda4JnEP8AKIA1UbVOtTBvfCz0optI",
  authDomain: "wetube-dev.firebaseapp.com",
  databaseURL: "https://wetube-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wetube-dev",
  storageBucket: "wetube-dev.appspot.com",
  messagingSenderId: "166351004323",
  appId: "1:166351004323:web:6e885517a7451661f59516",
  measurementId: "G-5KVHE2PCJD"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);