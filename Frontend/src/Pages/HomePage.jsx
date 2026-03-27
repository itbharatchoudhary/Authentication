import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import MessageCard from "../Components/MessageCard";
import Main from "../Components/Main";

const HomePage = ({ toggleTheme, dark }) => {
  return (
    <div>
      <Navbar toggleTheme={toggleTheme} dark={dark} />
      <Main />
      <Footer />
    </div>
  );
};

export default HomePage;
