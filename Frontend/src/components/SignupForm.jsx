import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom' 
import OAuthButton from './OAuthButton'
import {config} from '../utils/config';
import {toast} from 'react-toastify';


const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    
    if (!name || !email || !password || !password2) {
      toast.error('Please fill all the fields');
      return;
    }

    if(password != password2) {
      toast.error('Passwords do not match');
      return;
    }
  
    try{
      // console.log({ name,email,password});
      await axios.post(`${config.BASE_URL}/users/register`,{ name,email,password});
      navigate('');
      
    }catch(err){
      toast.error('Something went wrong! Please try again later.');
      console.error(err);
    }
  };
 
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className='w-full md:w-1/4 flex flex-col mt-16 mb-16 text-white p-10 bg-black bg-opacity-80 rounded-md shadow-md'>
          <div className='flex self-center text-3xl font-bold py-4 mb-4'>Sign Up</div>
          <form className='flex flex-col self-center justify-center mb-4'>
            <input
              className="mb-5 px-10 py-2 w-full max-w-full text-base bg-black bg-opacity-80 rounded border border-white"
              type="Name"
              placeholder="Name"
              required
              onChange={(e) =>{
                setName(e.target.value)
              } }
            />
            <input
              className="mb-5 px-10 py-2 w-full max-w-full text-base bg-black bg-opacity-80 rounded border border-white"
              type="email"
              placeholder="Email Id"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              className="mb-5 px-10 py-2 w-full max-w-full text-base bg-black bg-opacity-80 rounded border border-white"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              className="mb-5 px-10 py-2 w-full max-w-full text-base bg-black bg-opacity-80 rounded border border-white"
              type="password"
              placeholder="Confirm Password"
              required
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <button className="mb-5 px-4 py-2 w-full max-w-full text-base bg-red-600 hover:bg-red-700 text-white rounded border-none cursor-pointer align-middle" type="button"
            onClick={() => {
              handleSubmit()
            }}>Sign Up</button>

            <div className='self-center m mb-10'> OR </div>
              <OAuthButton></OAuthButton>
          </form>
        </div>
      </div>
    )
};

export default SignupForm;