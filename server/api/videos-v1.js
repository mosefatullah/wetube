const route = require("express").Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
 id: Number,
 title: String,
 thumbnail: String,
 videoUrl: String,
 channelName: String,
 channelThumbnail: String,
 description: String,
 publicationDate: String,
 duration: Number,
 views: Number,
 likes: Number,
 dislikes: Number,
 comments: Array,
});

const Video = mongoose.model("videos", VideoSchema);


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
