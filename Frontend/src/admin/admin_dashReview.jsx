import React from "react";
import { FaUser } from "react-icons/fa";
// import c1 from "../assets/Images/avt.webp";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsFooterVisible, setIsNavBarVisible } from "../AppStore/AppSlicer";
import { useDispatch } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
function AdminRev() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsFooterVisible(false));
    dispatch(setIsNavBarVisible(false));
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="w-[84vw]">
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
        <div>review</div>
      </div>
    </>
  );
}

export default AdminRev;
