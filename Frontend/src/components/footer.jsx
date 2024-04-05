import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../../public/logo.png";

// import { setIsFooterVisible } from "../AppStore/AppSlicer";
function Footer() {
  let { isFooterVisible } = useSelector((state) => state.AppSlice);

  return (
    <div
      className={`  flex    w-screen capitalize justify-between ${
        isFooterVisible ? "block" : "hidden"
      } `}
      style={{ backgroundColor: "#000", color: "white" }}
    >
      <div className="flex w-6/12 justify-between py-10 px-10">
        <div>
          <h1>comany</h1>
          <div>
            <p>investor relation</p>
            <p>privacy </p>
            <p>terms</p>
            <p>speed test </p>
          </div>
        </div>
        <div>
          <h1>comany</h1>
          <div>
            <p>investor relation</p>
            <p>privacy </p>
            <p>terms</p>
            <p>speed test </p>
          </div>
        </div>
        <div>
          <h1>comany</h1>
          <div>
            <p>investor relation</p>
            <p>privacy </p>
            <p>terms</p>
            <p>speed test </p>
          </div>
        </div>
      </div>
      <div className="socialLink mr-8 flex gap-5 text-xl">
        <div>
          <img
            src={logo}
            alt=""
            className="w-20 h-20 mt-10 relative top-[2%] left-[200%] "
          />
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center "
          style={{ borderRadius: "50%", border: "solid 2px 	#df0707" }}
        >
          {" "}
          <a href="https://www.facebook.com/">
            <i className="ri-facebook-fill"></i>
          </a>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center"
          style={{ borderRadius: "50%", border: "solid 2px     #df0707" }}
        >
          {" "}
          <a href="https://www.instagram.com/">
            <i className="ri-instagram-fill"></i>
          </a>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center"
          style={{ borderRadius: "50%", border: "solid 2px     #df0707" }}
        >
          {" "}
          <a href="https://www.youtube.com/">
            <i className="ri-youtube-fill"></i>
          </a>
        </div>
        <div
          className="h-7 w-7 flex justify-center items-center"
          style={{ borderRadius: "50%", border: "solid 2px     #df0707" }}
        >
          {" "}
          <a href="https://www.linkedin.com/">
            <i className="ri-twitter-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
