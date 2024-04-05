/* eslint-disable react/prop-types */
import SearchPageMovieCard from "../components/searchPageMovieCard";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../custumHooks/useFetch";
function MovieGridForMoviePlayback({ endPoint, label }) {
  const { url, rand } = useSelector((state) => state.AppSlice);
  const [data, setData] = useState(null);
  const { heroImg } = useFetch(`${endPoint}?page=${rand}`);
  useEffect(() => {
    setData(heroImg);
  }, [heroImg]);
  return (
    <>
      <h1 className="text-[white] mt-[6rem]  text-xl ml-[20px] ">{label}</h1>

      <div className=" grid sm:grid-cols-3 lg:grid-cols-7 gap-6 mt-4 pl-[30px]  px-[20px]  ">
        {data?.results?.map((item, index) => {
          if (index < 9)
            return (
              <SearchPageMovieCard
                key={index}
                styel={""}
                img={url.poster + item.poster_path}
                img2={url.poster + item.backdrop_path}
                about={item.overview}
                date={item.release_date}
              />
            );
        })}
      </div>
    </>
  );
}

export default MovieGridForMoviePlayback;
