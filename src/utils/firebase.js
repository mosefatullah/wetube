import { initializeApp } from "@firebase/app";

/*const firebaseConfig = {
 apiKey: "AIzaSyA8Rfda4JnEP8AKIA1UbVOtTBvfCz0optI",
 authDomain: "wetube-dev.firebaseapp.com",
 databaseURL:
  "https://wetube-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
 projectId: "wetube-dev",
 storageBucket: "wetube-dev.appspot.com",
 messagingSenderId: "166351004323",
 appId: "1:166351004323:web:6e885517a7451661f59516",
 measurementId: "G-5KVHE2PCJD",
};*/

const firebaseConfig = {
 apiKey: "AIzaSyBg4Aa1VFA52OEbLACBEBtS6IOn6WsUFUU",
 authDomain: "wetube-realtime.firebaseapp.com",
 databaseURL:
  "https://wetube-realtime-default-rtdb.asia-southeast1.firebasedatabase.app",
 projectId: "wetube-realtime",
 storageBucket: "wetube-realtime.appspot.com",
 messagingSenderId: "899735764121",
 appId: "1:899735764121:web:7d5878e781233dfcc78c08",
};

export const app = initializeApp(firebaseConfig);
