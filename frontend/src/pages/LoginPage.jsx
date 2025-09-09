import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [email , setEmail] = useState("") ;
  const [password , setPassword] = useState("") ;
  const {login , isLoading,error} = useAuthStore() ;
  const navigate = useNavigate() ;

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const {message} = await login(email, password);
      toast.success(message);
      navigate("/") ;
    } catch (error) {
     console.log(error) ;
    } 

  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F3] via-[#F8E7F6] to-[#F6E7D7] px-4'>
      <form
       onSubmit={handleLogin}
       className='flex flex-col w-full max-w-xl mx-auto space-y-6 bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 border border-[#F8E7F6]'>
        <h2 className='text-center font-semibold md:text-2xl text-[#4B164C] mb-2 tracking-wide relative'>
          Log in
          <span className="block mx-auto mt-2 w-16 h-1 bg-[#F8E7F6] rounded-full"></span>
        </h2>
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Email :</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#4B164C] transition'
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Password :</label>
          <input
            type="password"
             value={password}
            onChange={e => setPassword(e.target.value)}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#4B164C] transition'
          />
        </div>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit"
          disabled={isLoading}
          className="bg-[#4B164C] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#6d2170] transition-colors duration-200 w-full mt-2 shadow"
        >
          {isLoading ? "Please wait..." : "Log In"}
        </button>
        <p className="text-center">
          Don't have an account? <Link to={"/signup"} className="text-[#944424] underline hover:text-[#4B164C]">Sign up</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage ;