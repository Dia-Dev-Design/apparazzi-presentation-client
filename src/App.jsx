import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/auth.context";
import "./App.css";

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Tags from "./pages/Tags";
import AllPhotos from "./pages/AllPhotos";
import PhotoDetails from "./pages/PhotoDetails";
import EditProfile from "./pages/EditProfile";
import SubmitPhoto from "./pages/SubmitPhoto";
import TagDetails from "./pages/TagDetails";
import DeleteProfile from "./pages/DeleteProfile";
import Contributor from "./pages/Contributor";
import Navbar from "./components/Navbar";


function App() {
  
  const { authenticateUser} = useContext(AuthContext)


  let token = localStorage.getItem("authToken");

  useEffect(() => {
    authenticateUser()
  }, [])


  return (
    <div>

      <Navbar />


      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {/* <Route path="/tags" element={<Tags />}></Route> */}
        <Route path="/allPhotos" element={<AllPhotos />}></Route>
        <Route path="/:id/details" element={<PhotoDetails />}></Route>
        <Route path="/:id/tag" element={<TagDetails />}></Route>
        <Route path="/edit-profile" element={<EditProfile />}></Route>
        <Route path="/delete-profile" element={<DeleteProfile />}></Route>
        <Route path="/submit-photo" element={<SubmitPhoto />}></Route>
        <Route path="/:id/contributor" element={<Contributor />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
