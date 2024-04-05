import { motion } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import BackgroundColor from "../../LandingPageBackgroundImageContext/context2";
function Subs() {
  let {
    backgroundColor1,
    backgroundColor2,
    backgroundColor3,
  } = useContext(BackgroundColor);
  return (
    <motion.div
      initial={{ opacity: "0.3", right: "0%" }}
      animate={{ opacity: "1", right: "7%" }}
      transition={{ ease: [0.76, 0, 0.24, 1], duration: 2 }}
      className="absolute top-[24%] right-[7%] opacity-0 text-white flex   gap-6 rounded-lg "
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[1rem] capitalize text-opacity-[0.8]">
            all content
          </p>
          <p className="text-sm text-opacity-[0.6] text-white">
            Movies,Specials
          </p>
        </div>
        <div>
          <p className="text-[1rem] capitalize text-opacity-[0.8]">
            Watch On Tv Or Laptop
          </p>
        </div>
        <div>
          <p className="text-[1rem] capitalize text-opacity-[0.8]">
            ad free movies and shows
          </p>
        </div>
        <div>
          <p className="text-[1rem] capitalize text-opacity-[0.8]">
            no of devices that can logged In
          </p>
        </div>
        <div>
          <p className="text-[1rem] capitalize text-opacity-[0.8]">
            max video quality
          </p>
        </div>
        <div>
          <p className="text-[1rem] capitalize text-opacity-[0.8]">
            max Audio quality
          </p>
          <p className="text-sm text-opacity-[0.6] text-white">
            atmos avialble on selected title only
          </p>
        </div>
      </div>

      <div className={` rounded ${backgroundColor1 ? "bg-[#ff3636]" : ""}`}>
        <p className="device mt-[-10%] text-lg text-center absolute top-[10%]">
          Tier 1
        </p>
        <div className="value flex flex-col gap-7 mt-2 px-6  items-center ">
          <div>
            <IoCheckmark className="text-2xl" />
          </div>
          <div>
            <IoCheckmark className="text-2xl" />
          </div>
          <div>
            <RxCross2 className="text-2xl" />
          </div>
          <div>1</div>
          <div>360p</div>
          <div>Dolby Atmos</div>
        </div>
      </div>
      <div className={` rounded ${backgroundColor2 ? "bg-[#ff3636]" : ""}`}>
        <p className="device mt-[-10%] text-lg text-center absolute top-[10%]">
          Tier 2
        </p>
        <div className="value flex flex-col gap-7 mt-2 px-6 items-center ">
          <div>
            <IoCheckmark className="text-2xl" />
          </div>
          <div>
            <IoCheckmark className="text-2xl" />
          </div>
          <div>
            <IoCheckmark className="text-2xl"></IoCheckmark>
          </div>
          <div>2</div>
          <div>480p</div>
          <div>Dolby Atmos</div>
        </div>
      </div>
      <div className={` rounded ${backgroundColor3 ? "bg-[#ff3636]" : ""}`}>
        <p className="device  mt-[-10%] mb-4  text-lg text-center absolute top-[10%] left-[86%]">
          Tier 3
        </p>
        <div className="value value flex flex-col gap-7 mt-2 px-6 items-center ">
          <div>
            <IoCheckmark className="text-2xl" />
          </div>
          <div>
            <IoCheckmark className="text-2xl" />
          </div>
          <div>
            <IoCheckmark className="text-2xl"></IoCheckmark>
          </div>
          <div>3</div>
          <div>720p</div>
          <div>Dolby Atmos</div>
        </div>
      </div>
    </motion.div>
  );
}
export default Subs;
