/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";


function DetailOnHover({ img, about, date, style, item }) {
  const navigate = useNavigate();
  const trunct = (str) => {
    if (str?.length < 120) {
      return str;
    } else {
      return str?.slice(0, 140) + "...";
    }
  };
  return (
    <motion.div
      whileHover={{ scale: 1.094, opacity: 1, translate: "translateX(-10%)" }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className={`w-[18rem]  detonh absolute  dpnone giveMeTrans overflow-hidden top-[-8%] rounded-lg  pb-2 scale-[1]overflow-hidden z-[3000]    translate-x-[-10%] bg-black left-[-18%] ${style}`}
    >
      <div className="w-[100%] h-[20vh] relative">
      {
        item.premium && 
        (<div className="absolute top-0 right-0 bg-blue-600 p-2 rounded-md  z-[1000]"><IoIosStar /></div>)
      }
        <img src={img} alt="" className="w-full h-full rounded object-cover" />
      </div>
      <div className="overlay-detalis  w-full top-[36%] h-12 absolute "></div>
      <div className="relative z-[200]">
        <div className="w-full  flex justify-between mt-4 pl-2 pr-2">
          <button
            className="text-black-2 px-8  ml-1 text-[1rem] capitalize bg-[#fbfbfbb4] smt hover:bg-[#cccccc] rounded-xl"
            onClick={() => {
              navigate(`/${item?._id}`);
            }}
          >
            {" "}
            <i className="ri-play-fill"></i>watch now{" "}
          </button>{" "}
          <span className="text-black opacity-[0.7] bg-[#898989] hover:bg-[#e0e0e0] text-[2rem] smt  px-5 rounded-lg">
            +
          </span>
        </div>
      </div>
      <div className="text-[#cbcaca] flex gap-3 mt-2 ml-2 text-[12px] pl-2 items-center absolute z-[200]">
        <span className="text-[12px]">
          {" "}
          {dayjs(date).format("MMM D, YYYY")}
        </span>
        <div className="point-detail w-2 h-2 rounded-full bg-white"></div>
        <span>U/A +{item?.imdb?.rating}</span>
        <div className="point-detail w-2 h-2 rounded-full bg-white"></div>
        {/* {genres?.map((item, index) => {
          if (index == 0) {
            return <span key={index}>{item}</span>;
          }
        })} */}
      </div>
      <div className="movie-detail-overview text-[#e1dfdf] pl-3 mt-10 text-sm w-full">
        <p className="w-full text-[#a4a3a3] text-sm">{trunct(about)}</p>
      </div>
    </motion.div>
  );
}

export default DetailOnHover;
