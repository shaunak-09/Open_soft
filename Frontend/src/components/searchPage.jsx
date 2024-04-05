 

import SearchPageMovieCard from "./searchPageMovieCard";
import useFetch from "../custumHooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { RiHome3Line } from "react-icons/ri";
import { useState, useEffect,useRef } from "react";
import { setIsNavBarVisible, setIsFooterVisible } from "../AppStore/AppSlicer";
 
import { NavLink, useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
 
import { config } from "../utils/config";
import axios from "axios";
import { MdOutlineDescription } from "react-icons/md";
import { IoColorWand } from "react-icons/io5";
// import { useRef } from "react";

function SearchPage() {
  let dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { url, rand } = useSelector((state) => state.AppSlice);
  // console.log(url);
  const [isPlot, setIsPlot] = useState(false);
  const [isAI, setIsAI] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState("");
  const [srchData, setsrchData] = useState([]);
  const [srchHistData, setsrchHistData] = useState([]);
  const navigate = useNavigate();
  const imageref = useRef();

  // console.log(heroImg);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const queryCheck = (qu) => {
    const regex = /[^a-zA-Z0-9\s]/g;
    const cleanedString = qu.replace(regex, "");
    return cleanedString;
  };
  const token=localStorage.getItem('token')

  const getsearch_hist=async()=>{
    
    if(!token)
    setsrchData([])
  else{
    const res=await axios.get(`${config.BASE_URL}/search_hist`,{
      headers:{
        Authorization:token
      }
    })
    console.log(res);

    setsrchHistData(res?.data?.history?.reverse())
   

  }
 

  }
  const handleFocus=()=>{
    if (query.trim() == "") {
      getsearch_hist()
    }

  }
  useEffect(() => {
    
    if (query.trim() == "") {
    //  getsearch_hist();
     setsrchData([])
    }
  }, [query]);

  useEffect(() => {
    dispatch(setIsNavBarVisible(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(setIsFooterVisible(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  let [active, setActive] = useState(false);
  const { heroImg} = useFetch(
    `/trending/all/day?page=${rand}`
  );
  useEffect(() => {
    setData(heroImg?.results);
  }, [heroImg]);

  const handleOnScroll = () => {
    if (window.scrollY > 230) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  window.addEventListener("scroll", handleOnScroll);

  // const handleOnClick = (e) => {
  //   console.log(e);
  //   dispatch(setIsNavBarVisible(true));
  // };
  const handlePlot = () => {
    setIsPlot(!isPlot);
    // console.log(isPlot);
  };

  const handleAI = () => {
    setIsAI(!isAI);
    // console.log(isPlot);
  };
  // const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    clearTimeout(typingTimeout);
    if (q.trim() !== "") {
      setTypingTimeout(setTimeout(() => handleAutocomplete(q), 1000));
    }
  };
  const handlekey = (e) => {
    if (e.keyCode == 13) {
      console.log("enter");
      handleSubmit(query);
    }
  };

  const handleImageInputChange = async (event) => {
    // console.log(1);
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();

    // Append the file to the FormData object with a specified field name (e.g., 'image')
    formData.append('image',file);

    console.log(formData);
    const configHeaders = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    try{
      const results=await axios.post(`${config.BASE_URL}/search/image-search`,formData,{
        configHeaders
      })
      console.log(results.data);
  
      setData(results.data)
      setsrchHistData([])

    }
    catch(err){
      console.log(err);
    }


    

    // console.log(selectedImage);
  };

  const handleIconClick = () => {
    console.log(2);
    imageref.current.click();
  };

  const fetchSrchHist=async(quer)=>{
    const res=await axios.post(`${config.BASE_URL}/search_hist`,{
      query:quer
    },{
      headers:{
        Authorization:token
      }
    })
    console.log(res);
  }
  const api_url = isAI?
      isPlot
      ? `${config.BASE_URL}/sem_search/plot`
      : `${config.BASE_URL}/sem_search/`
      :
      isPlot
      ? `${config.BASE_URL}/search/plot`
      : `${config.BASE_URL}/search/`

      useEffect(() => {
        console.log(api_url);
      }, [api_url])
      
  const handleSubmit = async (qr) => {
    try{
      
      if(qr.trim() == "")
      return;
      console.log(qr);
    const q = queryCheck(qr);
    console.log(q);
    const result = await axios.get(`${api_url}`, {
      params: {
        query: q,
      },
    });
    console.log(result);
    if(token)
    {
      fetchSrchHist(q)

    }
    setData(result.data.reverse());
    setQuery("");
    setsrchData([])
    setsrchHistData([])
    
  }
  catch(err)
  {
    console.log(err);
  }
    // console.log(result);
    
  };

  const handleAutocomplete = async (quer) => {
    try{
   
    // console.log(quer);
    const q = queryCheck(quer);
    console.log(q);
    const result = await axios.get(`${api_url}`, {
      params: {
        query: q,
      },
    });
    console.log(result);
    setsrchData(result.data.reverse());

    }
    catch(err)
    {
      console.log(err);
    }
   

    // setQuery("");
  };

  return (
    <div
      className={`bg-[#050404] w-screen min-h-[100vh] relative overflow-hidden  `}
    >
      <div
        className={`w-screen   pt-10   ${
          active ? "color" : ""
        } flex justify-center items-center`}
      >
        {/* <input
          type="search"
          placeholder="Search for movie or tv shows "
          className=" pl-14  ml-[2.4%] w-[70%] h-[3.3rem] rounded-lg text-white text-opacity-[0.8] text-xl   outline-none bg-[#3c3c3c]    placeholder:text-xl capitalize"
        /> */}
        <div className=" flex w-full justify-center items-center flex-row">
          <svg
            className=" w-[1.9rem] absolute top-[50px] left-[200px]    test-white fill-white cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={()=>handleSubmit(query)}
            fill="currentColor"
          >
            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
          </svg>
          <div className="flex flex-col w-[80%] relative justify-center items-center">
            <div className="flex relative w-full flex-rowm justify-center items-center">
              <input
                type="search"
                placeholder="Search for movie or tv shows"
                onKeyUp={handlekey}
                onChange={handleChange}
                onFocus={handleFocus}
                value={query}
                autoComplete={"off"}
                className="pl-14 w-[80%]  justify-center h-[3.3rem] rounded-lg text-white text-opacity-[0.8] text-xl outline-none bg-[#3c3c3c] placeholder:text-xl"
                id="searchInput"
              />
              <div className="flex flex-row justify-center items-center">
                <span
                  htmlFor="imageInput"
                  className="text-white absolute  translate-x-[-110px]"
                  onClick={handleIconClick}
                >
                  <FaImage />
                </span>
                <input
                  ref={imageref}
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageInputChange}
                />
                <span
                  className="text-white absolute translate-x-[-70px] cursor-pointer p-2 rounded-sm font-semibold"
                  style={
                    isPlot
                      ? { backgroundColor: "red", color: "black" }
                      : { backgroundColor: "black", color: "white" }
                  }
                  // style={{position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}}
                  onClick={handlePlot}
                >
                  <MdOutlineDescription  />
                </span>
                <span
                  className="text-white absolute translate-x-[-30px] cursor-pointer p-2 rounded-sm font-semibold"
                  style={
                    isAI
                      ? { backgroundColor: "red", color: "black" }
                      : { backgroundColor: "black", color: "white" }
                  }
                  // style={{position: "absolute", right: "40px", top: "50%", transform: "translateY(-50%)", cursor: "pointer"}}
                  onClick={handleAI}
                >
                  < IoColorWand/>
                </span>
              </div>
            </div>
            <div
              className=" relative w-full flex justify-center items-center rounded-lg "
              style={{}}
            >
              {srchData?.length > 0 ? (
                <ul
                  className="  w-[80%] inset-x-0 top-full  z-[2000]"
                  style={{ borderRadius: "15px" }}
                >
                  {srchData.map((item) => {
                    // console.log(item);
                    return (
                      <li
                        key={item._id}
                        className="px-4  py-2 bg-gray-600 text-white  hover:bg-red-700 cursor-pointer "
                        onClick={() => {
                          fetchSrchHist(item?.title)
                          navigate(`/${item?._id}`);
                        }}
                      >
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              ):
              (
                srchHistData?.length > 0 && (
                  <ul
                    className="  w-[80%] inset-x-0 top-full  z-[2000]"
                    style={{ borderRadius: "15px" }}
                  >
                    {srchHistData.map((item,index) => {
                      // console.log(item);
                      return (
                        <li
                          key={index}
                          className="px-4  py-2 bg-gray-600 text-white  hover:bg-red-700 cursor-pointer "
                          onClick={() => {
                            setQuery(item)
                            handleSubmit(item)
                          }}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                )


              )
            }
            </div>
          </div>
        </div>
        <NavLink to="/">
          <div className="absolute bg-red-600 capitalize top-[2.8%] right-[3%] px-6 hover:scale-[1.05]  rounded py-2 text-white">
            home
          </div>
        </NavLink>
      </div>
      <div className="w-screen grid   sm:grid-cols-4 pt-20 md:grid-col-8 lg:grid-cols-6 max-lg:grid-cols-12 gap-4 px-20">
        {data?.map((item) =>
          item ? (
            <SearchPageMovieCard
              key={item.id}
              img={item?.poster}
              img2={url?.poster + item.poster_path}
              about={item?.plot}
              date={item?.released}
              item={item}
            />
          ) : (
            <div className="w-[10rem]  blinker h-[25rem] " key={Math.random()}></div>
          )
        )}
      </div>
    </div>
  );
}

export default SearchPage;
