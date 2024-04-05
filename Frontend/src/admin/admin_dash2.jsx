import React from "react";
import { FaUser } from "react-icons/fa";
// import c1 from "../assets/Images/avt.webp";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsFooterVisible, setIsNavBarVisible } from "../AppStore/AppSlicer";
import { useDispatch } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import User from "./user";
import FormForUser from "./formForUser";
import { useState } from "react";
function Admin() {
  let user = [
    { name: "John", email: "test@example.com", profile: "testurl" },
    { name: "John", email: "test@example.com", profile: "testurl" },
    { name: "John", email: "test@example.com", profile: "testurl" },
  ];
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsFooterVisible(false));
    dispatch(setIsNavBarVisible(false));
  }, []);
  let [isFormVisible, setIsFormVisible] = useState(false);
  const handleOnClick = () => {
    setIsFormVisible((prev) => !prev);
  };
  // let [formSubmitBtnText,setFormSubmitBtnText] = useState(create);
  return (
    <>
      <div className="flex flex-col">
        <div className="w-[84vw] mt-2 pr-4">
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
          <h1 className="text-xl">Users</h1>
          <div>
            <button
              className="py-2 px-4 bg-[#3b6ee5] inline-block  text-white rounded-3xl
            "
              onClick={handleOnClick}
            >
              create new +{" "}
            </button>
          </div>
        </div>

        <div className="userData flex flex-col gap-4 bg-[#fefdff] px-4 rounded py-8 mr-4 mt-8 ">
          {user.map((item) => (
            <User
              name={item.name}
              profile={item.profile}
              email={item.email}
              key={item.id}
              id={item.id}
              setIsFormVisible={handleOnClick}
            />
          ))}
        </div>
        <FormForUser
          isFormVisible={isFormVisible}
          setIsFormVisible={handleOnClick}
        />
      </div>
    </>
  );
}

export default Admin;
