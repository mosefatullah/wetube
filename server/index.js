const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const { initializeApp } = require("@firebase/app");
const { firebase } = require("./firebase.config");

const PORT = process.env.PORT || 5000;
const mongoDB =
 "mongodb+srv://wetubeltd:WeTube2023@wetube.qjsci1l.mongodb.net/?retryWrites=true&w=majority";

const app = express();
app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/videos", require("./api/videos-v1"));
app.use("/api/v2/videos", require("./api/videos-v2"));

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 const db = async () => {
  try {
   await mongoose.connect(mongoDB, { useNewUrlParser: true });
   console.log("Connected to MongoDB");
  } catch (error) {
   console.log(error);
  }
 };
 db();

 const db2 = async () => {
  try {
   await initializeApp(firebase);
   console.log("Connected to Firebase");
  } catch (error) {
   console.log(error);
  }
 };
 db2();
});