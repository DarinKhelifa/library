import React from 'react'
import { Link } from "react-router-dom"
import { useAuthStore } from '../../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();

  console.log("Navbar user:", user);

  const handleLogout = async () => {
    const {message} = await logout ();
    toast.success(message);
  }
  return (
    <nav className='bg-[#4B164C] flex justify-between items-center text-black px-4 md:px-12 py-4 md:py-6'>
      <Link to="/" className='flex items-center space-x-2'>
        <label className='font-semibold tracking-wider md:text-lg lg:text-xl'>Story</label>
      </Link>

      {user ? (
        <div className='flex items-center space-x-5 md:text-lg'>
          <Link to={"/add-book"}>
            <button className="bg-gradient-to-r from-[#F8E7F6] via-[#FFFCF2] to-[#F8E7F6] text-[#4B164C] font-bold px-5 py-2 rounded-full shadow-lg hover:scale-105 hover:from-[#FFFCF2] hover:to-[#F8E7F6] transition-all duration-300 border-2 border-[#4B164C] flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="#4B164C" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Book
            </button>
          </Link>

          <p onClick={handleLogout}>Logout {user.username}</p>
        </div>
      ) : (
        <div className='flex items-center space-x-5 md:text-lg'>
          <Link to={"/login"}><p>Add book</p></Link>
          <Link to={"/login"}><p>Log in</p></Link>
          <Link to={"/signup"}><p className='bg-[#F8E7F6] px-3 py-2'>Sign up</p></Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
