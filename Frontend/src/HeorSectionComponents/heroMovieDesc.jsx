import { useContext, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import BackgroundImage from "../LandingPageBackgroundImageContext/context";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import useFetch from "../custumHooks/useFetch";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

 
function HeroMovieDesc() {
  const { genres, rand } = useSelector((state) => state.AppSlice);
  const [data, setData] = useState(null);
  const { heroImg } = useFetch(`/movie/upcoming?`);
  useEffect(() => {
    setData(heroImg);
  }, [heroImg]);

  const truncted = (str) => {
    if (str?.length > 140) {
      str = str.slice(0, 140) + ".....";
    }
    return str;
  };
  let [overview] = useAutoAnimate();
  let { bgImage, bgImageDescription } = useContext(BackgroundImage);

  const mycont = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleOnchange = () => {
    setIsAnimated(true);
    setTimeout(() => {
      setIsAnimated(false);
    }, 1000);
  };

  useEffect(() => {
    handleOnchange();
  }, [bgImage]);

  return (
     
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        ref={mycont}
        className={`description lg:w-5/12  absolute right-0 md:right-[-18%] lg:right-[-8%] z-40 flex flex-col lg:gap-5 md:gap-2 con ${
          isAnimated ? "" : ""
        }`}
      >
        <div className="title mc2 lg:mt-44 md:mt-10">
          {data ? (
            <h4 className="lg:text-4xl md:text-[1.8rem] text-wrap tracking-wide capitalize mt-20 text-white text-opacity-80 w-3/4">
              {bgImageDescription.title || data?.results[rand]?.title}
            </h4>
          ) : (
            <div className="w-[20rem] h-[3rem]  blinker mt-20 rounded"></div>
          )}
        </div>
        <div className="info-home-page flex  items-center">
          {data ? (
            <p className="text-white text-opacity-75 md:text-sm">
              {dayjs(
                bgImageDescription.releaseDate ||
                  data?.results[rand]?.release_date
              ).format("MMM D, YYYY")}
            </p>
          ) : (
            <div className="w-[6rem] h-6 blinker rounded"></div>
          )}
          <div className="mx-3 flex justify-center items-center ">
            <p className={`points ${data ? " " : ""}`}></p>
          </div>

          {data ? (
            <p className="text-white text-opacity-75">
              language{" "}
              {bgImageDescription.ogl || data?.results[rand]?.original_language}
            </p>
          ) : (
            <div className="w-[6rem] h-[1.5rem] blinker rounded"></div>
          )}

          <div className="mx-3 flex justify-center items-center ">
            <p className="points"></p>
          </div>
          {data ? (
            <p className="text-white text-opacity-70 rated-home-hero rounded-2xl px-4">
              U/A 16+
            </p>
          ) : (
            <div className="w-[4rem] h-[1.5rem] blinker rounded"></div>
          )}
        </div>
        <div className="aboutMovie" ref={overview}>
          {data ? (
            <p className="text-white text-sm text-wrap lg:w-3/4 md:w-[60%] tracking-wide text-opacity-60">
              {truncted(
                bgImageDescription.overview || data?.results[2]?.overview
              )}
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="w-1/2 h-[1rem] blinker"></p>
              <p className="w-1/2 h-[1rem] blinker"></p>
              <p className="w-1/4 h-[1rem] blinker"></p>
            </div>
          )}
        </div>
        {data ? (
          <div className="genres flex gap-3">
            {bgImageDescription?.genre_ids?.map((item, index) => (
              <p key={index} className="text-white">
                {genres[item].name}
              </p>
            ))}
          </div>
        ) : (
          <div className="w-1/2 flex gap-2">
            <p className="w-1/4 h-[1rem] blinker"></p>
            <p className="w-1/4  h-[1rem] blinker"></p>
            <p className="w-1/4  h-[1rem] blinker"></p>
          </div>
        )}
        {data ? (
          <div className="buttonToWatch flex gap-9 mt-4">
            <Link
              to="/video"
              className="bg-[#dfddddd5] py-4 px-12 rounded hover:scale-[1.07] transition-all"
            >
              <i className="ri-play-fill font-bold text-xl text-black"></i>
              <span className="text-[#000000] font-bold capitalize">
                watch now
              </span>
            </Link>

            <button className=" py-2 px-8 flex justify-center items-center rounded-sm text-sm  cmn-call-2  tracking-tighter">
              +
            </button>
          </div>
        ) : (
          <div className="flex ">
            <div className="w-[35%] h-[3rem] blinker rounded-lg"></div>
            <div className="ml-[10%] w-[3rem] h-[3rem] blinker rounded-lg">
              {" "}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}

export default HeroMovieDesc;
