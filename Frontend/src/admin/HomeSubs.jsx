/* eslint-disable react/prop-types */
// import Banners from "./admin_dash";
import AdminSubs from "./admin_dashSubs";
import Sidebar2 from "./sidebar2";

function HomeSubs() {
  return (
    <>
      <div className="w-screen h-screen flex gap-4 bg-[#d2d5d8]">
        <Sidebar2 />
        <AdminSubs />
      </div>
    </>
  );
}

export default HomeSubs;
