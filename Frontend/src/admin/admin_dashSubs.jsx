import React from "react";
import { FaUser } from "react-icons/fa";
// import c1 from "../assets/Images/avt.webp";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsFooterVisible, setIsNavBarVisible } from "../AppStore/AppSlicer";
import { useDispatch } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import FormForSubsc from "./formForSubsc";
import { useState } from "react";
import { MdReviews } from "react-icons/md";
import Subscription from "./subscription";
function AdminSubs() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsFooterVisible(false));
    dispatch(setIsNavBarVisible(false));
  }, []);
  let [isFormVisible, setIsFormVisible] = useState(false);
  const handleOnClick = () => {
    setIsFormVisible((prev) => !prev);
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="w-[84vw]  pr-4 mt-2">
          <div className="px-2 py-4  rounded-xl flex justify-between items-center bg-[#f4f3f3] h-[] ">
            <h2 className="text-[#61216b] capitalize text-[1rem] ">
              dashboard
            </h2>

            <div className="flex text-[#61216b] gap-4 text-[1.4rem] ">
              <div>
                <FaUser className="" />
              </div>
              <div>
                <IoIosNotifications />
              </div>
              <div>
                <IoIosSettings />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 px-8">
          <h1 className="text-xl">movie</h1>
          <div>
            <button
              className="py-2 px-4 bg-[#3b6ee5] inline-block  text-white rounded-3xl"
              onClick={handleOnClick}
            >
              create new +{" "}
            </button>
          </div>
        </div>
        <div>
          <Subscription />
        </div>
        <FormForSubsc isFormVisible={isFormVisible} setIsFormVisible={handleOnClick}/>
      </div>
    </>
  );
}

export default AdminSubs;
