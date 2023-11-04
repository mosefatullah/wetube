import React from "react";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";

import auth from "../services/auth";
import { Button, Container, DialogContent } from "@mui/material";

export default function AccountModal({ onClose, willOpen }) {
 const [email, setEmail] = React.useState(null);
 const [profilePicture, setProfilePicture] = React.useState(null);
 const handleClose = () => {
  onClose();
 };

 React.useEffect(() => {
  auth("auth", (user) => {
   setEmail(user.email);
   setProfilePicture(user.photoURL);
  });
 }, []);

 return (
  <Dialog onClose={handleClose} open={willOpen}>
   <DialogTitle
    style={{
     minWidth: "300px",
    }}
   >
    Account
   </DialogTitle>
   {email && (
    <>
     <List sx={{ pt: 0 }}>
      <ListItem disableGutters key={email}>
       <ListItemButton onClick={() => {}}>
        <ListItemAvatar>
         <Avatar
          sx={{ bgcolor: blue[100], color: blue[600] }}
          src={profilePicture}
         >
          <PersonIcon />
         </Avatar>
        </ListItemAvatar>
        <ListItemText primary={email} />
       </ListItemButton>
      </ListItem>
     </List>
     <DialogContent>
      <Button
       fullWidth
       variant="outlined"
       color="error"
       onClick={() => {
        auth(
         "logout",
         () => {
          setEmail(null);
          setProfilePicture(null);
          handleClose();
         },
         (e) => {
          alert(e);
         }
        );
       }}
      >
       Logout
      </Button>
     </DialogContent>
    </>
   )}
   {email == null && (
    <List sx={{ pt: 0 }}>
     <ListItem disableGutters>
      <ListItemButton
       onClick={() => {
        auth("google", (user) => {
         setEmail(user.email);
         setProfilePicture(user.photoURL);
        });
       }}
      >
       <ListItemAvatar>
        <Avatar>
         <AddIcon htmlColor="#fff" />
        </Avatar>
       </ListItemAvatar>
       <ListItemText primary="Add account" />
      </ListItemButton>
     </ListItem>
    </List>
   )}
  </Dialog>
 );
}
