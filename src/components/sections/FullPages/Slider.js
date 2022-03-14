import React from "react";
import QrCodeScan from "../QrCodeScan/QrCodeScan";

import * as classes from "./Slider.module.css";

const Slider = ({ images }) => {
  return (
    <>
      {images?.map((item, index) => (
        <>
          <div
            key={index}
            className={"slide " + classes.slider}
            style={{ backgroundImage: "url(" + item.image + ")" }}
          ></div>
        </>
      ))}
    </>
  );
};
export default Slider;
