import React, { useState } from "react";
//CSS STYLES
import * as classes from "./Home.module.css";
// APP COMONENTS
import Dashboard from "../components/sections/Dashboard/Dashboard";
import Footer from "../components/layout/Footer";


//view Home
const Home = () => {
  // arrow function components
  return (
    <>
      <div
        key={"2"}
        className={classes.sectionContainer + " " + classes.bgLight}
      >
        <br />
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
