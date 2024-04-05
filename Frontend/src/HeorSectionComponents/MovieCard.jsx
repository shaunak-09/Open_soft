/* eslint-disable react/prop-types */
 
import DetailOnHover from "../components/detailOnHovering";
 import { IoIosStar } from "react-icons/io";
function MovieCard({ img, about, date, genres, item }) {
  
  return (
    <div className="mt-4 rounded-3xl relative h-96  w-fit">
      <div className="  rounded overflow-hidden border-black movie-box-movie-grid    relative  detailOnHover   ">
      {
        item.premium && 
        (<div className="absolute top-0 right-0 bg-blue-600 p-2 rounded-md  z-[1000]"><IoIosStar /></div>)
      }
        <img
          src={img}
          className="w-full h-full object-cover box-shadow rounded-sm absolute movie-card-o3jiue"
           
        />
        <p className="absolute text-white w-full text-wrap     ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod,
          laboriosam exercitationem expedita reiciendis iusto cupiditate placeat
          nisi fugit odit facere.
        </p>
      </div>
      <DetailOnHover
        img={img}
        about={about}
        date={date}
        style={"top-[3%] "}
        genres={genres}
        item={item}
      />
    </div>
  );
}

export default MovieCard;
