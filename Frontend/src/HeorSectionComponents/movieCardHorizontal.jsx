import avtar from "../assets/t9.webp";

function MovieCardHorizontal() {
  return (
    <div className="mt-4 " style={{}}>
      <div className=" h-36 overflow-hidden border-black" style={{borderRadius:'12px', width:'16rem'}}>
        <img src={avtar} alt="" className="w-full h-full object-cover" />
      </div>
      
    </div>
  );
}

export default MovieCardHorizontal;
