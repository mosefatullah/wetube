import { app } from "./firebase";
import {
 getDatabase,
 onValue,
 ref,
 orderByChild,
 query,
 equalTo,
} from "@firebase/database";

export default function getVideo(instruct, onLoad, onError) {
 try {
  const db = getDatabase(app);
  if (instruct == "all" || instruct[0] == "all") {
   const query = ref(db, "videos/");
   onValue(query, (snapshot) => {
    const data = snapshot.val();
    if (snapshot.exists()) {
        if(onLoad)onLoad(data);
    } else {
        if(onError) onError("No video available!");
    }
   });
  } else if (instruct[0] == "by_id" && instruct[1] != null) {
   onValue(
    query(
     ref(getDatabase(app), "videos"),
     orderByChild("id"),
     equalTo(instruct[1])
    ),
    (snapshot) => {
     const data = snapshot.val();
     let d = {};
     if (snapshot.exists()) {
      for (const i in data) {
       if (data[i].id == instruct[1]) {
        d = data[i];
       }
      }
      if(onLoad)onLoad(d);
     }
    }
   );
  }
 } catch (error) {
    if(onError)onError("Network error occurred.");
 }
}
