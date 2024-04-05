/* eslint-disable react/prop-types */
// import Banners from "./admin_dash";
// import Admin from "./admin_dash2";
import AdminMovie from "./admin_dashMovie";
import Sidebar2 from "./sidebar2";

function HomeMovie() {
  return (
    <>
      <div className="w-screen h-screen flex gap-4 bg-[#d2d5d8]">
        <Sidebar2 />
        <AdminMovie />
      </div>
    </>
  );
}

export default HomeMovie;
