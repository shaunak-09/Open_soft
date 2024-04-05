/* eslint-disable react/prop-types */
import { useContext } from "react";
import BackgroundImage from "../LandingPageBackgroundImageContext/context";
import Img from "../lazyLoading/Img";
import { useRef } from "react";

function ContinueToWatchMovieCard({
  img,
  title,
  overview,
  releasedate,
  boxId,
  ogl,
  genre_ids,
  media_type,
}) {
  
  const cont = useRef(null);
  let { setBgImage, setBgImageDescription, bgImage } =
    useContext(BackgroundImage);

  let handleOnClick = () => {
    setBgImage({ img, id: boxId });


    setTimeout(() => {
      setBgImageDescription({
        title: title,
        releaseDate: releasedate,
        overview: overview,
        ogl: ogl,
        boxId:boxId,
        genre_ids: genre_ids,
        media_type:media_type
        
      });
    }, 100);
  };

  
  return (
    <div
      onClick={handleOnClick}
      id={boxId}
      ref={cont}
      className="relative z-[500]"
    >
      <div
        className={`cont-movie-card rounded-lg overflow-hidden lg:hover:scale-[1.08] cursor-pointer  h-full ${
          bgImage.img == img ? "borderOnClicking" : ""
        }`}
      >
        <div className="rtx30 w-full h-full rounded  ">
          <Img src={img} className="w-full  h-full img-cont " />
        </div>
      </div>
    </div>
  );
}

export default ContinueToWatchMovieCard;
