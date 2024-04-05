import { useEffect } from "react";
import ContinueToWatchMovieCard from "./ContinueToWatchMovieCard";

import useFetch from "../custumHooks/useFetch";
import { useSelector } from "react-redux";
import { useState } from "react";
import ContinueToWatchMovieSkelton from "../loadingSkelton/contLoadSk";

function ContinueToWatch() {

  const { url, rand } = useSelector((state) => state.AppSlice);

  const [data, setData] = useState(null);
  const { heroImg } = useFetch(
    `/movie/upcoming?page=${rand}`
  );


  useEffect(() => {
    setData(heroImg);
  }, [heroImg]);

  return (
    <div className="w-screen pl-10 mt-8 relative ">
      
      <div className="flex gap-4 pt-4 overflow-auto overflow-y-hidden contToWatch scroll-smooth pb-4 h-full justify-between">
        {!data ? (
          <ContinueToWatchMovieSkelton></ContinueToWatchMovieSkelton>
        ) : (
          data.results.map((item, index) => {
            if (index > 6) return;

            return (
              <ContinueToWatchMovieCard
                key={item.backdrop_path}
                img={url?.poster + item.backdrop_path}
                title={item.title}
                overview={item.overview}
                releasedate={item.release_date}
                boxId={item.id}
                ogl={item.original_language}
                genre_ids={item.genre_ids}
                media_type={"movie"}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default ContinueToWatch;
