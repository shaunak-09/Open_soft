import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineWork } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiMovieFill } from "react-icons/ri";
import { AiFillDollarCircle } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { MdReviews } from "react-icons/md";

function Sidebar2() {
  return (
    <div className="w-[16%] bg-[#121621]  h-[100vh] pt-4">
      <div className="flex ml-4 gap-4 pb-4">
        <div className="img-of-admin w-10 h-10  rounded-full overflow-hidden">
          <img
            src={
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            }
            className="w-full h-full "
            alt=""
          />
        </div>
        <div>
          <div className="admin-name">
            <h1 className="text-[#ffffff] font-bold">Renfier masachu</h1>
          </div>
          <div className="flex gap-2  text-[#b2b2b2] ">
            <a href="">linkedin</a>
          </div>
        </div>
      </div>
      <div className="w-full h-[0.09px] bg-[#3a3a3a]"></div>
      <div className="mt-10 px-4">
        <h1 className="w-full bg-[#635BFF] px-4 py-2 flex  gap-3 items-center text-white rounded-lg">
          <MdOutlineWork />
          Work Space
        </h1>
        <ul className="flex flex-col w-full mt-10 gap-2 capitalize">
          <li>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `    ${
                  isActive ? "bg-[#635BFF]" : "bg-[#9c9c9c39] "
                } text-white rounded-lg  py-2 px-4 flex  gap-4 items-center    w-full    `
              }
            >
              <FaUser />
              user
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adminMovie"
              className={({ isActive }) =>
                `    ${
                  isActive ? "bg-[#635BFF]" : "bg-[#9c9c9c39] "
                } text-white rounded-lg  py-2 px-4 flex  gap-4 items-center    w-full    `
              }
            >
              <RiMovieFill />
              movie
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/adminSubscription"
              className={({ isActive }) =>
                `    ${
                  isActive ? "bg-[#635BFF]" : "bg-[#9c9c9c39] "
                } text-white rounded-lg  py-2 px-4 flex  gap-4 items-center    w-full    `
              }
            >
              <AiFillDollarCircle />
              subscription
            </NavLink>
          </li>
          {/* <li className="">
            <NavLink
              to="/adminreview"
              className={({ isActive }) =>
                `    ${
                  isActive ? "bg-[#635BFF]" : "bg-[#9c9c9c39] "
                } text-white rounded-lg  py-2 px-4 flex  gap-4 items-center    w-full    `
              }
            >
              <MdReviews />
              Review
            </NavLink>
          </li> */}
        </ul>
      </div>

      <div
        className="flex items-center text-white absolute top-[90%]
      left-[2%] gap-2 cursor-pointer"
      >
        <IoLogOut className="text-3xl" />
        LogOUT
      </div>
    </div>
  );
}

export default Sidebar2;
