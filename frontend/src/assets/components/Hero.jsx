import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate() ;


  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

    
    
  }
  return (
    <div className="relative h-[75vh] lg:h-[90vh] text-[#FFFCF2] px-4 md:px-12 overflow-hidden">
      {/* background overlay */}
      <div className="bg-[#252422] w-full h-full absolute top-0 left-0 opacity-80 z-10"></div>
      <div className="absolute inset-0 -z-20">
        <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover absolute top-0 left-0 z-20"
        >
            <source src="/bgVideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center z-50 relative text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl pb-8 lg:pb-12 text-center max-w-5xl -mt-20">Share your <span className="text-[#8e1d6c]">favorite</span> books and <span className="text-[#8e1d6c]"> discover </span>
         new ones from readers like you</h1>

         <form onSubmit={handleSubmit}
         className="relative w-full max-w-sm md:max-w-xl lg:max-w-3xl text-base lg:text-lg flex">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="What are you into"
            className="flex-1 px-5 py-3 rounded-l-full bg-[#FFF8F3] text-[#4B164C] border-2 border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#8e1d6c] transition placeholder-[#8e1d6c] font-semibold shadow-md"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#F8E7F6] via-[#FFFCF2] to-[#F8E7F6] text-[#4B164C] font-bold px-7 py-3 rounded-r-full shadow-lg border-2 border-[#F8E7F6] transition-all duration-300 hover:scale-105 hover:from-[#FFFCF2] hover:to-[#F8E7F6] relative z-10"
          >
            Search
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default Hero
