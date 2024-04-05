import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const tmdbToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZDNiZThjYzNiNWVmMzJlYTRlOGIwMzZiZWUwNDJiYiIsInN1YiI6IjY1ZWYwYjJmZTcyZmU4MDE2MjViZjIwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NTztL1lCPKhDxpUQzTGkkiIr6MOyp9s0X39RrzfGooE";
const headers = {
  Authorization: "Bearer " + tmdbToken,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const res = await axios.get(baseUrl + url, { headers, params });
    return res.data;
    
  } catch (err) {
    console.log(err);
  }
};
