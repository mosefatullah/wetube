import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import History from "./pages/History";
import Subscriptions from "./pages/Subscriptions";
import WatchLater from "./pages/WatchLater";
import Watch from "./pages/Watch";
import Error from './pages/Error';

function App() {
 return (
  <div className="App">
   <BrowserRouter basename="/wetube">
    <Routes>
     <Route path="/" element={<Home />}></Route>
     <Route path="/library" element={<Library />}></Route>
     <Route path="/history" element={<History />}></Route>
     <Route path="/subscriptions" element={<Subscriptions />}></Route>
     <Route path="/watchLater" element={<WatchLater />}></Route>
     <Route path="/watch" element={<Watch />}></Route>
     <Route path="/*" element={<Error />}></Route>
    </Routes>
   </BrowserRouter>
  </div>
 );
}

export default App;
