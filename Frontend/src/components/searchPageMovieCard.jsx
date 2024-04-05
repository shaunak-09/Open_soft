/* eslint-disable react/prop-types */
 
import Img from "../lazyLoading/Img";
import DetailOnHover from "./detailOnHovering";
import { IoIosStar } from "react-icons/io";

function SearchPageMovieCard({ img, img2, about,date,style,item}) {
 
  // console.log(img2);

  return (
    <div
      className={`rounded searchPgec giveMeTrans group relative  `}
     
    >
{
        item.premium && 
        (<div className="absolute top-0 right-0 bg-blue-600 p-2 rounded-md  z-[1000]"><IoIosStar /></div>)
      }      {img ? <Img src={img} alt="" className={`w-full h-full  ${style}`}  /> : img2? <Img src={img2} alt="" className={`w-full h-full  ${style}`} />:""}
      <DetailOnHover img={img?img:img2?img2:""}  about={about} date={date} item={item}/>
    </div>
  );
}

export default SearchPageMovieCard;
