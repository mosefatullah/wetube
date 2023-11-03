import { app } from "./firebase";
import { getDatabase, onValue, ref } from "@firebase/database";

export default function getvideos(onLoad, onError) {
 try {
  const db = getDatabase(app);
  const query = ref(db, "videos/");
  onValue(query, (snapshot) => {
   const data = snapshot.val();
   if (snapshot.exists()) {
    onLoad(data);
    console.log(data);
   } else {
    onError("No video available!");
   }
  });
 } catch (error) {
  onError("Network error occurred.");
 }
}
