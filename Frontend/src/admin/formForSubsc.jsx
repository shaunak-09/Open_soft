import React from "react";
import { RxCross2 } from "react-icons/rx";

function FormForSubsc({ isFormVisible,setIsFormVisible }) {
  return (
    //     <form
    //     action="
    //   "
    //     className={`${isFormVisible ? "visible" : "invisible"}`}
    //   >
    //     <div>
    //       <div>
    //         <label htmlFor="title-of-movie" name="email-of-user">
    //           userEmail
    //         </label>
    //         <input type="email" />
    //       </div>
    //       <div>
    //         <label htmlFor="plot-of-movie" name="plot-of-movie">
    //           subscription tier
    //         </label>
    //         <input type="text" />
    //     </div>
    //     <div>
    //         <input type="submit" value="submit" />
    //     </div>
    //     </div>
    //   </form>
    <form
      action=""
      className={`${
        isFormVisible ? "visible" : "invisible"
      } w-[20%] absolute top-[15%] right-[20%] bg-white p-4 rounded-lg `}
    >
    <div className="text-right flex justify-end c">
        <div className="w-6 h-6 rounded-full bg-indigo-600  cursor-pointer flex  justify-center items-center   "
        onClick={()=> setIsFormVisible()} >
          <RxCross2 className="text-white font-bold text-[1rem] " />
        </div>
      </div>

      <div className="mt-4">
        <div>
          <label
            htmlFor="user-email"
            className="block text-sm font-medium text-gray-700"
          >
            User Email
          </label>
          <input
            id="user-email"
            name="user-email"
            type="email"
            className="mt-1 outline-none px-4 h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md   bg-[#e8e6e6]"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="subscription-tier"
            className="block text-sm font-medium text-gray-700"
          >
            Subscription Tier
          </label>
          <input
            id="subscription-tier"
            name="subscription-tier"
            type="text"
            className="mt-1 outline-none px-4 h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-[#e8e6e6]"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormForSubsc;
