import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import JobDetails from "./components/Job/JobDetails";
import Jobs from "./components/Job/Jobs";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Footer from "./components/Layout/Footer";
import Navbar from "./components/Layout/Navbar";
import NotFound from "./components/NotFound/NotFound";
import { Context } from "./main";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser,user } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://job-seeking-backend-yu44.onrender.com/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);
 

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;