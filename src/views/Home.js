import React, { useState } from "react";
//CSS STYLES
import * as classes from "./Home.module.css";
// APP COMONENTS  
import Dashboard from "../components/sections/Dashboard/Dashboard";
import Footer from "../components/layout/Footer";

const Home = () => { // arrow function components 
  return (
    <>
      <div
        key={"2"}
        className={
          classes.sectionContainer + " " + classes.bgLight
        }
      >
        ilojomlkl
        <Dashboard />
      </div>

      <div
        align="center"
        key={"3"}
        className={classes.sectionContainer}
      >
        <br></br>
        <h1>hello</h1>
      </div>
      <div
        align="center"
        key={"4"}
        className={classes.sectionContainer}
      >
        <Footer />
      </div>
    </>
  );
};

export default Home;
