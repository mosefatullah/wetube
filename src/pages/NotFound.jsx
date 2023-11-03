import { Container } from "@mui/material";
import React from "react";

function NotFound() {
 return (
  <Container
   sx={{
    padding: "2rem 0",
    textAlign: "center",
   }}
  >
   <h3>404</h3>
   <p>Page Not Found!</p>
  </Container>
 );
}

export default NotFound;
