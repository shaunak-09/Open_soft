import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../DataUtils/fetchData2";

const useFetch = (url) => {
  const [heroImg, setHeroImg] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading("loading...");
    setHeroImg(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setError(false);
        setIsLoading(false);
        setHeroImg(res);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
        console.log(err);
      });
  }, [url]);

  return { heroImg, isLoading, error };
};

export default useFetch;
