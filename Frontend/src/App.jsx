import NavBar from "./components/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { config } from "./utils/config";
import { useDispatch } from "react-redux";
import { login } from "./AppStore/userSlice";

function App() {

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      {<NavBar></NavBar>}
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default App;
