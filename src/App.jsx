import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "./services/theme";
import { CssBaseline } from "@mui/material";

import Header from "./components/Header";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Watch from "./pages/Watch";
import NotFound from "./pages/NotFound";

function App() {
 return (
  <div className="App">
   <BrowserRouter basename="/wetube">
    <ThemeProvider theme={Theme}>
     <CssBaseline />
     <Header />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account />} />
      <Route path="/watch" element={<Watch />} />
      <Route path="/*" element={<NotFound />} />
     </Routes>
    </ThemeProvider>
   </BrowserRouter>
  </div>
 );
}

export default App;
