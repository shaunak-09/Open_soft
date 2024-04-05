import SignupForm from "./SignupForm";
import { Poster } from "./Poster";
import Marquee from "react-fast-marquee";
import img1 from "../assets/Images/3-iron.jpg";
import img2 from "../assets/Images/aaa.jpg";
import img3 from "../assets/Images/always.jpg";
import img4 from "../assets/Images/witcher.jpg";
import img5 from "../assets/Images/Aot.jpg";
import img6 from "../assets/Images/arrow.jpg";
import img7 from "../assets/Images/wed.jpg";
import img8 from "../assets/Images/walk.jpg";
import img9 from "../assets/Images/wizard.jpg";
import img10 from "../assets/Images/wom.jpg";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsNavBarVisible } from "../AppStore/AppSlicer";

/* className='bg-gradient-to-tr from-red-900 to-pink-400' */
function LoginPage() {
  const row1 = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  const row2 = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  const row3 = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsNavBarVisible(true));
  }, []);

  return (
    <div className="bg-gradient-to-tr from-red-500">
      <div className="mix-blend-overlay">
        <Marquee direction="left">
          {row1.map((i) => (
            <Poster key={i} img={i}></Poster>
          ))}
        </Marquee>
        <Marquee direction="right">
          {row2.map((i) => (
            <Poster key={i} img={i}></Poster>
          ))}
        </Marquee>
        <Marquee direction="left">
          {row3.map((i) => (
            <Poster key={i} img={i}></Poster>
          ))}
        </Marquee>
      </div>
      <div className="navLinks">
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}

export default LoginPage;
