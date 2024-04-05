import { LampDemo } from "../lampdemo";
import axios from 'axios';
import { config } from '../../utils/config'
import MovieGrid from "../../HeorSectionComponents/movieGrid";
// import MovieGridHorizontal from "../../HeorSectionComponents/movieGridHorizontal";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify'

const MySpace = () => {
  const [userDetails, setUserDetails] = useState();
  
  const {user} = useSelector((state) => state.userSlice);
  // console.log(user);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
  
    const configauth = {
      headers: {
        Authorization: `${token}`
      }
    };

    axios.get(`${config.BASE_URL}/movies/getProfileDetails`, configauth)
      .then(res => { 
        console.log(res.data);
        setUserDetails(res.data);
        // console.log(userDetails.favorites)
      })
      .catch(err => {
        toast.error('Something went wrong')
        console.error(err);
      });
  }, []);

  return (
    <>
      <section
        className="bg-black"
        style={{ minHeight: "100vh", marginTop: "0vh" }}
      >
        <LampDemo name = {user.name}/>

        <div className="posterSection pl-6 mt-20" style={{ zIndex: 1000 }}>
          
          <MovieGrid label="Watch Later" data={userDetails?userDetails.watchlist:[]} />
          <MovieGrid label="Favourites" data={userDetails?userDetails.favorites:[]} />
          {/* <MovieGrid label="Rented" data={userDetails?userDetails.rentals:[]} /> */}
          <MovieGrid label="Watch Again" data={userDetails?userDetails.history:[]} />
        </div>
      </section>
    </>
  );
};

export default MySpace;