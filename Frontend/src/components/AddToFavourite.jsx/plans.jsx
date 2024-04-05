import { motion } from "framer-motion";
import Subs from "../AddToFavourite.jsx/Subscription";
import { useState } from "react";
import BackgroundColor from "../../LandingPageBackgroundImageContext/context2";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoLaptopOutline } from "react-icons/io5";
import { PiTelevisionSimple } from "react-icons/pi";
import { useEffect } from "react";
import InfiniteScroll from "./InfiniteScroll";
import { NavLink } from "react-router-dom";
import {
  setIsNavBarVisible,
  setIsFooterVisible,
} from "../../AppStore/AppSlicer";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
import { toast } from "react-toastify";

function Plans() {
  const navigate = useNavigate();

  let [backgroundColor1, setBackgroundColor1] = useState(true);
  let [backgroundColor2, setBackgroundColor2] = useState(false);
  let [backgroundColor3, setBackgroundColor3] = useState(false);

  const button = ["Tier 1 ", "Tier 2", "Tier 3"];
  const handleOnClick = (e) => {
    if (e.target.id == 5) {
      setBackgroundColor1(true);
      setBackgroundColor2(false);
      setBackgroundColor3(false);
    } else if (e.target.id == 6) {
      setBackgroundColor1(false);
      setBackgroundColor2(true);
      setBackgroundColor3(false);
    } else {
      setBackgroundColor1(false);
      setBackgroundColor2(false);
      setBackgroundColor3(true);
    }
  };

  useEffect(() => {
    dispatch(setIsNavBarVisible(false));
  }, []);

  useEffect(() => {
    dispatch(setIsFooterVisible(false));
  }, []);

  let dispatch = useDispatch();

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }

      const amount = backgroundColor1 ? 245 : backgroundColor2 ? 459 : 689;
      const tier = backgroundColor1 ? 1 : backgroundColor2 ? 2 : 3;

      const stripe = await loadStripe(
        "pk_test_51OwT8LSFnIU9Zobg5roeG54Xh1WmUxRshSP3iTRS9dQvCYdLzgdXsCqVk8ZYCSct5QfEhjzWiuektuSGakFGuGdl00ge7Fr33Q"
      );

      const response = await axios.post(
        `${config.BASE_URL}/payment/checkout`,
        {
          amt: amount,
          name: "Movie Cinema",
          tier: tier,
        },
        { headers: { Authorization: token } }
      );

      const session = response?.data?.session;
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (err) {
      toast.error("Something went wrong! Please try again later.");
      console.log(err);
    }
  };

  return (
    <BackgroundColor.Provider
      value={{
        backgroundColor1,
        setBackgroundColor1,
        backgroundColor2,
        setBackgroundColor2,
        backgroundColor3,
        setBackgroundColor3,
      }}
    >
      <div className="">
        <div className="plan-container w-screen relative h-screen  ">
          <div className="flex flex-col gap-6 relative ">
            <div className="srcoller flex">
              <InfiniteScroll page={2} />
              <InfiniteScroll page={3} />
            </div>
            <div className="srcoller flex">
              <InfiniteScroll page={4} />
              <InfiniteScroll page={5} />
              <InfiniteScroll page={6} />
            </div>
            <div className="srcoller flex">
              <InfiniteScroll page={7} />
              <InfiniteScroll page={8} />
              <InfiniteScroll page={9} />
            </div>
          </div>
          <div className="plan-overlay1 absolute top-0 left-0 w-[40%] h-full"></div>
          <div className="plan-overlay2 absolute  top-0 right-0 w-[90%] h-full"></div>
          <NavLink to='/' className="inline-block">
            <div className="w-[4rem] h-[2rem] a rounded-md text-center left-[90%] top-[2%] absolute flex items-center justify-center px-12 py-6 capitalize      bg-red-500   text-white">
              {" "}
              home
            </div>
          </NavLink>
          <div className="top-[25%] left-[5%]  flex flex-col absolute ">
            <motion.h1
              inital={{ width: "0" }}
              animate={{ width: "fit-content" }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.3 }}
              className="text-red-500 text-[3.5vw] font-bold w-[0px] overflow-hidden"
            >
              Entertainment
            </motion.h1>
            <motion.p1
              inital={{ width: "0" }}
              animate={{ width: "fit-content" }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.3 }}
              className="text-[2.5vw] capitalize font-bold text-white w-[0] overflow-hidden text-opacity-[0.8]"
            >
              <p className="w-[30vw] font-bold">will never</p>
            </motion.p1>
            <motion.p1
              inital={{ width: "0" }}
              animate={{ width: "fit-content" }}
              transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.3 }}
              className="capitalize text-[3.5vw]  text-red-500 w-0  overflow-hidden"
            >
              <p className="w-[30vw] font-bold">gonna stop</p>
            </motion.p1>
          </div>
        </div>
        <div className="absolute top-[80%] left-[5%] flex  gap-9">
          {button.map((item, index) => {
            let price;
            if (index == 0) {
              price = 245;
            } else if (index == 1) {
              price = 459;
            } else {
              price = 689;
            }
            return (
              <motion.div
                inital={{ height: "0" }}
                animate={{ height: "fit-content" }}
                transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.5 }}
                className="overflow-hidden h-0 backdrop-blur-md relative"
                key={item}
              >
                <div
                  className="btnover w-full h-full absolute z-[4000]  "
                  id={index + 5}
                  onClick={handleOnClick}
                ></div>
                <button
                  className={`text-white relative  text-bold text-[2vw] px-4 w-[20vw]   p-1 b-[solid,2px,white]  rounded-xl  
                  ${
                    (backgroundColor1 && index == 0) ||
                    (backgroundColor2 && index == 1) ||
                    (backgroundColor3 && index == 2)
                      ? "b-red"
                      : "b-white"
                  }
                
                
                 `}
                >
                  <IoPhonePortraitOutline
                    className={`absolute  top-[30%] right-[10%] text-red-500 
                   ${backgroundColor1 && index == 0 ? "visible" : "invisible"}
                  `}
                  />
                  <PiTelevisionSimple
                    className={`absolute  top-[30%] right-[10%] text-red-500 
                   ${backgroundColor3 && index == 2 ? "visible" : "invisible"}
                  `}
                  />
                  <IoLaptopOutline
                    className={`absolute  top-[30%] right-[10%] text-red-500 
                   ${backgroundColor2 && index == 1 ? "visible" : "invisible"}
                  `}
                  />

                  <p
                    className={`text-[1.4rem] text-left 
                  ${
                    (backgroundColor1 && index == 0) ||
                    (backgroundColor2 && index == 1) ||
                    (backgroundColor3 && index == 2)
                      ? "text-red-500"
                      : ""
                  }
                  
                  `}
                  >
                    {item}
                  </p>
                  <p className="text-left">
                    <span className="text-[18px] absolute top-[50%] ">
                      &#8377;
                    </span>
                    <span className="ml-4 font-bold">{price}</span>
                    <span className="text-[17px]">/year</span>
                  </p>
                </button>
              </motion.div>
            );
          })}
        </div>
        <Subs></Subs>

        <motion.div
          initial={{ height: "0%" }}
          animate={{ height: "fit-content" }}
          transition={{ ease: [0.76, 0, 0.24, 1], duration: 1.5 }}
          className="overflow-hidden h-[0px] absolute top-[82%] right-[5%] hover:scale-[1.03] "
        >
          <button
            className="text-white  py-4 px-20 capitalize bg-red-700 hover:bg-red-600 font-bold rounded "
            onClick={() => handlePayment()}
          >
            Continue
          </button>
        </motion.div>

        {/* <div className="flex w-screen text-white px-20 justify-between gap-2">
          <div className="w-3/12  greeting-Box rounded-3xl p-4">
            <h1>storie tailored to your taste</h1>
          </div>
          <div className="w-3/12 greeting-Box rounded-3xl p-4">
            <h1>a place just for kid </h1>
          </div>
          <div className="w-3/12 greeting-Box rounded-3xl p-4">
            <h1>stream anywere and everywhere</h1>
          </div>
          <div className="w-3/12 greeting-Box rounded-3xl p-4">
            <h1>stream on any media size</h1>
          </div>
        </div> */}
      </div>
    </BackgroundColor.Provider>
  );
}

export default Plans;
