const route = require("express").Router();
const { initializeApp } = require("@firebase/app");
const { firebase } = require("./../firebase.config");
const { getStorage, ref, listAll } = require("@firebase/storage");

route.get("/", (req, res) => {
 const Firebase = async () => {
  try {
   const fire = await initializeApp(firebase);
   const storage = getStorage(fire);
   const videosRef = ref(storage, "videos/");

   listAll(videosRef)
    .then((r) => {
     let videoArr = [];
     r.items.forEach((itemRef) => {
      videoArr.push("https://firebasestorage.googleapis.com/v0/b/wetube-dev.appspot.com/o/"+itemRef._location.path_.replace("videos/","videos%2F")+"?alt=media&token=a6b12951-62af-48ef-a32f-f8f54c254c3d");
      console.log("Video URL:", itemRef);
     });
     res.status(200).json(videoArr);
    })
    .catch((error) => {
     res.status(500).send("Error Occured");
     console.log(error);
    });
  } catch (error) {
   console.log(error);
  }
 };
 Firebase();
});

module.exports = route;
