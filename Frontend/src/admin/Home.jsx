/* eslint-disable react/prop-types */
// import Banners from "./admin_dash";
import Admin from "./admin_dash2";
import Sidebar2 from "./sidebar2";

function Home() {
  return (
    <>
      <div className="w-screen h-screen flex gap-4 bg-[#d2d5d8]   ">
        <Sidebar2 />
        <Admin/>
      </div>
    </>
  );
}

export default Home;
