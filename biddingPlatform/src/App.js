import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NavBar from "./component/NavBar";
import Auctions from "./pages/Auctions";
import Bidding from "./pages/Bidding";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyAuction from "./pages/MyAuction";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
      
      <Route path="/" element={<Auctions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/bidding" element={<Bidding />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/myAuctions" element={<MyAuction/>}/>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
