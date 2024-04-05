import { Link } from "react-router-dom";
import OAuthButton from "./OAuthButton";
import { useState } from "react";
import axios from "axios";
import { config } from "../utils/config";
import { useDispatch } from "react-redux";
import { login } from "../AppStore/userSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${config.BASE_URL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      const userRes = await axios.get(`${config.BASE_URL}/users/profile`, {
        headers: { Authorization: res.data.token },
      });
      console.log(userRes.data);
      dispatch(login(userRes.data.user));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full md:w-1/2 flex flex-col mt-16 text-white p-10 bg-black bg-opacity-90 rounded-md shadow-md">
        <div className="flex self-center text-3xl font-bold py-4">Sign In</div>
        <form
          className="flex flex-col self-center justify-center mb-4"
          style={{ width: "35vw", alignItems: "center" }}
        >
          <input
            className="mb-5 px-10 py-2 w-full max-w-full text-base bg-black bg-opacity-80 rounded border border-white"
            type="email"
            placeholder="Email or Phone Number"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="mb-5 px-10 py-2 w-full max-w-full text-base bg-black bg-opacity-80 rounded border border-white"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="mb-4 px-4 py-2 w-full mt-5 max-w-[70%] text-base bg-red-700 hover:bg-red-800 text-white rounded border-none cursor-pointer align-middle"
            type="button"
            onClick={() => {
              handleLogin();
            }}
          >
            Sign In
          </button>
        </form>
        <a className="flex self-center hover:underline mb-4" href="#">
          Forgot Password?
        </a>
        <div className="flex self-center mb-4">
          <input
            className="mr-2 checked:bg-red-500 indeterminate:bg-gray-100"
            type="checkbox"
          />
          <p style={{ color: "grey" }}>Remember Me</p>
        </div>
        <div className="flex self-center">
          <p className="mr-4 hover:underline">
            New to Filmace? <Link to={"/signup"}>Sign Up now!!</Link>
          </p>
        </div>
        <div className="self-center mt-4 mb-4"> OR </div>
        <OAuthButton></OAuthButton>
      </div>
    </div>
  );
};

export default LoginForm;
