import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./services/theme";
import { CssBaseline } from "@mui/material";

import Header from "./components/Header";
import Home from "./pages/Home";
import Channel from "./pages/Channel";
import Watch from "./pages/Watch";
import NotFound from "./pages/NotFound";

function App() {
 return (
  <ThemeProvider theme={Theme}>
   <CssBaseline />
   <div className="App">
    <main>
     <BrowserRouter basename="/wetube">
      <Header />
      <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/channel" element={<Channel />} />
       <Route path="/watch" element={<Watch />} />
       <Route path="/*" element={<NotFound />} />
      </Routes>
     </BrowserRouter>
    </main>
   </div>
  </ThemeProvider>
 );
}

export default App;
