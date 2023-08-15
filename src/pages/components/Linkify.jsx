import React from "react";
import L from "linkify-react";

const Linkify = ({ text }) => {
 const options = {
  target: "_blank",
  validate: {
   url: true,
  },
  format: (value, type) =>{
    if (type === "url" || type === "email") {
      return value.length > 50 ? value.slice(0, 50) + "..." : value;
    }
    if (type === "hashtag") {
      return value.slice(0, 50);
    }
    if (type === "mention") {
      return value.slice(0, 5);
    }
    return value;
  }
 };

 return (
  <L as="p" options={options}>
    {text}
  </L>
);
};

export default Linkify;
