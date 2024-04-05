/* eslint-disable react/prop-types */
// import Banners from "./admin_dash";
 import AdminRev from "./admin_dashReview";
import Sidebar2 from "./sidebar2";

function HomeRev() {
  return (
    <>
      <div className="w-screen h-screen flex gap-4 bg-[#d2d5d8]">
        <Sidebar2 />
        <AdminRev />
      </div>
    </>
  );
}

export default HomeRev;
