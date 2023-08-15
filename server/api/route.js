const route = require("express").Router();
const Video = require("./video");

route.get("/", (req, res) => {
 Video.find()
  .then((videos) => {
   res.status(200).json(videos);
  })
  .catch((err) => {
   console.log(e);
   res.status(500).send("Error Occured");
  });
});

route.post("/", (req, res) => {
 let video = new Video(req.body);
 video
  .save()
  .then(() => Video.find())
  .then((videos) => {
   res.status(200).json(videos);
  })
  .catch((err) => {
   console.log(e);
   res.status(500).send("Error Occured");
  });
});

module.exports = route;
