import React from "react";
import { RxCross2 } from "react-icons/rx";

function Movie({ isFormVisible, setIsFormVisible }) {
  return (
    <form
      action=""
      className={`${
        isFormVisible ? "visible" : " invisible"
      } w-[30%] absolute top-[10%] left-[40%] bg-white p-4  rounded-lg`}
    >
      <div className="text-right flex justify-end c">
        <div
          className="w-6 h-6 rounded-full bg-indigo-600  cursor-pointer flex  justify-center items-center   "
          onClick={() => setIsFormVisible()}
        >
          <RxCross2 className="text-white font-bold text-[1rem] " />
        </div>
      </div>

      <div className="">
        <div>
          <label
            htmlFor="title-of-movie"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title-of-movie"
            name="title-of-movie"
            type="text"
            className="h-8 mt-1 px-4 outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-[#e8e6e6]"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="plot-of-movie"
            className="block text-sm  outline-none font-medium text-gray-700"
          >
            Plot
          </label>
          <input
            id="plot-of-movie"
            name="plot-of-movie"
            type="text"
            className="h-8 mt-1 px-4 outline-none bg-[#e8e6e6] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="genres-of-movie"
            className="block text-sm font-medium text-gray-700"
          >
            Genres
          </label>
          <input
            id="genres-of-movie"
            name="genres-of-movie"
            type="text"
            className="h-8 mt-1 px-4 outline-none bg-[#e8e6e6] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700"
            >
              Language
            </label>
            <input
              id="language"
              name="language"
              type="text"
              className="h-8 mt-1  px-4 outline-none bg-[#e8e6e6] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <input
              id="year"
              name="year"
              type="text"
              className="h-8 mt-1 px-4 outline-none bg-[#e8e6e6] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mt-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <select
            id="price"
            name="price"
            className="h-8 mt-1 bg-[#e8e6e6] focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="paid">Rental</option>
          </select>
        </div>
        <div className="mt-4">
          <label
            htmlFor="poster-of-movie"
            className="block text-sm font-medium text-gray-700"
          >
            Poster
          </label>
          <input
            id="poster-of-movie"
            name="poster-of-movie"
            type="text"
            className="mt-1 focus:ring-indigo-500 h-8 bg-[#e8e6e6] focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <input
            type="submit"
            value="create"
            className="w-full bg-indigo-600  text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>
      </div>
    </form>
  );
}

export default Movie;
