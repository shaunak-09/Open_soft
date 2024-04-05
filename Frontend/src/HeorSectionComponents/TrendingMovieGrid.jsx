/* eslint-disable react/prop-types */
import { useRef } from "react";
import TrendingMovieCard from "./TrendingMovieCard";
import { useEffect } from "react";
import { useState } from "react";
import t1 from "../assets/t1.webp";
import t2 from "../assets/t2.webp";
import t3 from "../assets/t3.webp";
import t4 from "../assets/t4.webp";
import t5 from "../assets/t5.webp";
import t6 from "../assets/t6.webp";
import t7 from "../assets/t7.webp";
import t8 from "../assets/t8.webp";

import axios from "axios";
import { config} from "../utils/config";

function TrendingMovieGrid({ label }) {
  const myRef = useRef(null);
  const navigation = (dir) => {
    const container = myRef.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const [data, setData] = useState(null);
  // const { heroImg, isLoading, error } = useFetch(`/trending/${type}/day`);

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/movies/gethits`);
        // console.log(res);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getdata();
  }, []);

  let itTrending = 0;
  const trendingAray = [t1, t2, t3, t4, t5, t6, t7, t8];
  return (
    <div className="w-screen flex flex-col pl-8 mt-14 mb-2  overflow-x-hidden trending-movie-grid  overflow-y-hidden  ">
      <h1 className="text-white text-xl text-opacity-55">{label}</h1>
      <div className=" absolute  placeholder: w-[10%] h-[60%]  z-[6000] right-[-4%] text-white  group ">
        <i
          className="ri-arrow-right-circle-fill text-white relative top-[50%]  text-3xl  invisible group-hover:visible opacity-65 hover:opacity-100"
          onClick={() => navigation("right")}
        ></i>
      </div>
      <div className="   absolute w-[10%] h-[60%]  z-[6000]    text-white group">
        <i
          className="ri-arrow-left-circle-fill text-white relative top-[50%] left-0 text-3xl invisible group-hover:visible opacity-65 hover:opacity-100"
          onClick={() => navigation("left")}
        ></i>
      </div>
      {data ? (
        <div className="trending-movie-grid flex gap-10 overflow-y-hidden overflow-x-hidden py-4 pl-8"
        ref={myRef}>
          {data?.map((item) => {
            return (
              <TrendingMovieCard
                key={item._id}
                img={item.poster}
                trendingCount={++itTrending}
                img2={item.poster}
                about={item.plot}
                date={item.released}
                genres={item.genres}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div className="  justify-between flex trending-movie-grid mt-4">
          {trendingAray.map((_,index) => (
            <div key={index} className="w-[13rem] h-[11rem] blinker ml-4 rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrendingMovieGrid;
