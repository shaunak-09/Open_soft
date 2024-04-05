/* eslint-disable react/prop-types */
import MovieCardHorizontal from "./movieCardHorizontal";
import m2 from "../assets/m2.webp";

function MovieGridHorizontal({ label}) {
  return (
    <div style={{paddingLeft:'1vw', maxWidth:'96vw', overflow:'hidden',paddingTop:'0vh', paddingBottom:'2vh', marginTop:'2vh'}}>
      <h1 className="text-slate-300 ml-4 capitalize mt-4" style={{fontSize:'1.5rem'}}>{label}</h1>
      <div className="flex  w-[95vw] movie-grid scrool-smooth" style={{gap:'1.5rem'}}>
        <MovieCardHorizontal img={m2} />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />
        <MovieCardHorizontal />

      </div>
    </div>
  );
}

export default MovieGridHorizontal;
