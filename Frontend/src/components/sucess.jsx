

import styles from './css/sucess.module.css';
import { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom';
import { Poster } from './Poster'
import axios from 'axios'
import { config } from '../utils/config';
import Marquee from 'react-fast-marquee'
import img1 from '../assets/Images/3-iron.jpg'
import img2 from '../assets/Images/aaa.jpg'
import img3 from '../assets/Images/always.jpg'
import img4 from '../assets/Images/witcher.jpg'
import img5 from '../assets/Images/Aot.jpg'
import img6 from '../assets/Images/arrow.jpg'
import img7 from '../assets/Images/wed.jpg'
import img8 from '../assets/Images/walk.jpg'
import img9 from '../assets/Images/wizard.jpg'
import img10 from '../assets/Images/wom.jpg'
// import logo from '../assets/Images/MFlix_logo.png'
import { useDispatch } from "react-redux";
import { login } from "../AppStore/userSlice";

function Success() {
    const {amt}=useParams()
    const dispatch = useDispatch();
  useEffect(() => {
    setUser();
  }, []);

  const setUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const res = await axios.get(`${config.BASE_URL}/users/profile`, {
        headers: { Authorization: token },
      });
      dispatch(login(res.data.user));
      console.log(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };
    const row1 = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
  const row2 = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
  const row3 = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10]
  useEffect(()=>{
    const token=localStorage.getItem('token')
    const tier=amt==245 ?1: amt==459?2 :3

    const subs=async()=>{
      try{
      const res=await axios.post(`${config.BASE_URL}/subscription/create`,{
        duration:3,
        tier:tier
      },{
        headers:{Authorization:token}
      })
      console.log(res);

    }
    catch(err){
      console.log(err);
    }
  }
    subs();
  },[])
  return (
    
      <div className='bg-gradient-to-tr from-red-500'>
      <div className='mix-blend-overlay'>
        <Marquee direction='left'>
          {row1.map(i => (<Poster img={i}></Poster>))}
        </Marquee>
        <Marquee direction='right'>
          {row2.map(i => (<Poster img={i}></Poster>))}  
        </Marquee>
        <Marquee direction='left'>
          {row3.map(i => (<Poster img={i}></Poster>))}
        </Marquee>
      </div>
      <div className="navLinks">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className='w-full md:w-1/4 h-[50%] flex flex-col mt-16 text-white p-10 bg-black bg-opacity-80 rounded-md shadow-md justify-center items-center'>
        <div className={styles.payment_heading}>
          Payment Successful
        </div>
        <div className={styles.tick}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<circle cx="24" cy="24" r="20" fill="#4dd0e1"></circle><path fill="#fff" d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659l-6.083-6.084c-0.879-0.878-0.879-2.303,0-3.182 c0.878-0.879,2.304-0.879,3.182,0l6.083,6.084c0.879,0.878,0.879,2.303,0,3.182C23.643,30.47,23.067,30.69,22.491,30.69z"></path><path fill="#fff" d="M22.491,30.69c-0.576,0-1.152-0.22-1.591-0.659c-0.879-0.878-0.879-2.303,0-3.182l9.539-9.539 c0.878-0.879,2.304-0.879,3.182,0c0.879,0.878,0.879,2.303,0,3.182l-9.539,9.539C23.643,30.47,23.067,30.69,22.491,30.69z"></path>
</svg>
        </div>
        <div className={styles.amount_full}>
          <div className={styles.amount_paid}>
            Amount paid
          </div>
          <div className={styles.amount}>
           ₹ {amt}
          </div>
        </div>

        </div>
          
      </div>
      
      </div>
      
    </div>
        
     
  );
}

export default Success;