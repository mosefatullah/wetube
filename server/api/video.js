const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
 id: Number,
 title: String,
 thumbnail: String,
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

module.exports = Video;
