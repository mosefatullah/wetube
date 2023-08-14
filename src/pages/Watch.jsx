import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Videobox from "./components/Videobox";

function Watch() {
 const v = new URLSearchParams(window.location.search).get("v");
 const [thumbnailUrl, setThumbnailUrl] = useState("");
 const [title, setTitle] = useState("");
 const [channelSrc, setChannelSrc] = useState("");

 const getData = async (id) => {
  try {
   const response = await fetch(
    "https://jsonplaceholder.typicode.com/photos/" + id
   );
   const data = await response.json();
   return data;
  } catch (error) {
   return console.error("Error fetching thumbnail:", error);
  }
 };

 useEffect(() => {
  const fetchData = async () => {
   const url = await getData(v);
   setThumbnailUrl(url.thumbnailUrl);
   setTitle(url.title);
   setChannelSrc(
    "https://yt3.ggpht.com/NHF6hPNCAXWMOMpJr06_rCwN5JCf2dFg4MGQRMG3eQU4-s95FyDPMmYn580rJ7rW0h2WzLUsri8=s68-c-k-c0x00ffffff-no-rj"
   );
  };

  fetchData();

  window.scrollTo({
   top: 0,
   behavior: "smooth",
  });
 }, [v]);

 return (
  <>
   <Navbar />
   <div className="__watch">
    <div className="container-fluid">
     <div className="row row-gap-4">
      <div className="col-lg-8">
       <Videobox src={thumbnailUrl} title={title} channelSrc={channelSrc} />
      </div>
      <div className="col-lg-4">
       <div className="card card-body bg-dark">
        <h2>{title}</h2>
        <h3>8,007,680 views  -  19 Oct 2022</h3>
        <hr />
        <p>
         Learn the basics of computer science from Harvard University. This is
         CS50, an introduction to the intellectual enterprises of computer
         science and the art of programming.
         <br />
         💻 Slides, source code, and more at https://cs50.harvard.edu/x.
         <br />
         ⭐️ Course Contents ⭐️ ⌨️ (00:00:00) Lecture 0 - Scratch <br />
         ⌨️ (01:45:08) Lecture 1 - C <br />
         ⌨️ (04:13:23) Lecture 2 - Arrays <br />
         ⌨️ (06:20:43) Lecture 3 - Algorithms <br />
         ⌨️ (08:37:55) Lecture 4 - Memory <br />
         ⌨️ (11:03:17) Lecture 5 - Data Structures <br />
         ⌨️ (13:15:36) Lecture 6 - Python <br />
         ⌨️ (15:39:25) Lecture 7 - SQL <br />
         ⌨️ (18:00:55) Lecture 8 - HTML, CSS, JavaScript <br />
         ⌨️ (20:23:38) Lecture 9 - Flask <br />
         ⌨️ (22:39:01) Lecture 10 - Emoji <br />
         ⌨️ (24:02:50) Cybersecurity <br />
         <br />
         Recorded in 2021.
         <br />
         ---
         <br />
         HOW TO JOIN CS50 COMMUNITIES
         <br />
         Discord: https://discord.gg/cs50 <br />
         Ed: https://cs50.harvard.edu/x/ed <br />
         Facebook Group: https://www.facebook.com/groups/cs50/ <br />
         Faceboook Page: https://www.facebook.com/cs50/ <br />
         GitHub: https://github.com/cs50 <br />
         Gitter: https://gitter.im/cs50/x <br />
         Instagram: https://instagram.com/cs50 <br />
         LinkedIn Group: https://www.linkedin.com/groups/7437240/ <br />
         LinkedIn Page: https://www.linkedin.com/school/cs50/ <br />
         Medium: https://cs50.medium.com/ <br />
         Quora: https://www.quora.com/topic/CS50 <br />
         Reddit: https://www.reddit.com/r/cs50/ <br />
         Slack: https://cs50.edx.org/slack <br />
         Snapchat: https://www.snapchat.com/add/cs50 <br />
         SoundCloud: https://soundcloud.com/cs50 <br />
         Stack Exchange: https://cs50.stackexchange.com/ <br />
         TikTok: https://www.tiktok.com/@cs50 <br />
         Twitter: https://twitter.com/cs50 <br />
         YouTube:
         <br />
         / cs50
         <br />
         HOW TO FOLLOW DAVID J. MALAN
         <br />
         Facebook: https://www.facebook.com/dmalan <br />
         GitHub: https://github.com/dmalan <br />
         Instagram: https://www.instagram.com/davidjmalan/ <br />
         LinkedIn: https://www.linkedin.com/in/malan/ <br />
         TikTok: https://www.tiktok.com/@davidjmalan <br />
         Twitter: https://twitter.com/davidjmalan <br />
         <br />
         LICENSE
         <br />
         CC BY-NC-SA 4.0 Creative Commons Attribution-NonCommercial-ShareAlike
         4.0 International Public License <br />
         https://creativecommons.org/licenses/...
         <br />
         🎉 Thanks to our Champion and Sponsor supporters: <br />
         👾 Raymond Odero <br />
         👾 Agustín Kussrow <br />
         👾 aldo ferretti <br />
         👾 Otis Morgan <br />
         👾 DeezMaster <br />
         <br />
         --
         <br />
         Learn to code for free and get a developer job:
         https://www.freecodecamp.org
         <br />
         Read hundreds of articles on programming: https://freecodecamp.org/news
        </p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </>
 );
}

export default Watch;
