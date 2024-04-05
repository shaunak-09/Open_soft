/* eslint-disable react/prop-types */
import Img from "../../lazyLoading/Img";
import DetailOnHoverForTopRated from "./DetailOnHoverForTopRated";
import { motion } from "framer-motion";
function TopRatedMovieCard({ img, about, date, title,media_type,id }) {
  return (
    <motion.div
      whileHover={{ scale: 1.094, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-40  tpr-cont  cursor-pointer rounded relative   h-fit scrollbar-hidden `}
    >
      {img ? (
        <Img src={img} className="tpr w-full h-full scrollbar-hidden rounded" />
      ) : (
        <div className=" w-40 h-[20rem] blinker bg-white"></div>
      )}
    
      <DetailOnHoverForTopRated
        img={img}
        about={about}
        title={title}
        date={date}
        media_type={media_type}
        id={id}
      ></DetailOnHoverForTopRated>
    </motion.div>
  );
}

export default TopRatedMovieCard;
