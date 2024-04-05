import React from "react";
import { RxCross2 } from "react-icons/rx";

function FormForUser({isFormVisible ,setIsFormVisible }) {
  return (
    <form
      action=""
      className={`${
        isFormVisible ? "visible" : "invisible"
      } w-[25%] absolute top-[20%] left-[40%] bg-[white] p-8 rounded-lg `}
    >
      <div className="text-right flex justify-end c">
        <div className="w-6 h-6 rounded-full bg-indigo-600  cursor-pointer flex  justify-center items-center   "
        onClick={()=> setIsFormVisible()} >
          <RxCross2 className="text-white font-bold text-[1rem] " />
        </div>
      </div>
      <div className="">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name Of User
          </label>
          <input
            type="text"
            name="user-name"
            className="h-8 mt-1 px-4 outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md 
            bg-[#f1eded]"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Of User
          </label>
          <input
            type="email"
            name="user-email"
            className="h-8 mt-1 outline-none px-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md 
            bg-[#e8e6e6]"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="avatar-url"
            className="block text-sm font-medium text-gray-700"
          >
            Image Url of user
          </label>
          <input
            type="text"
            name="user-img-url"
            id=""
            className="h-8 mt-1 outline-none px-4 bg-[#e8e6e6] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="create"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>
      </div>
    </form>
  );
}

export default FormForUser;
