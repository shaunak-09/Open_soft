/* eslint-disable react/prop-types */
import useFetch from "../../custumHooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import PlansInfiniteScroolerMovieBox from  "../PlansComponents/plansInfiniteScroolerMovieBox";

function InfiniteScroll({page}) {

  const [data, setData] = useState(null);
  const { heroImg } = useFetch(`/trending/all/day?page=${page}`);

  useEffect(() => {
    setData(heroImg);
  }, [heroImg]);

  return (
    <div className="scrooler-con sc1 flex gap-4">
      {data?.results?.map((item) => {
        return (
          <PlansInfiniteScroolerMovieBox
            img={"https://image.tmdb.org/t/p/original" + item?.backdrop_path}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

export default InfiniteScroll;
