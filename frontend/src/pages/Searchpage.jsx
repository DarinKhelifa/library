import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useBookStore } from "../store/bookstore";
import { useEffect } from "react";
import image1 from "../assets/images/book1.jpg";
import image2 from "../assets/images/book2.jpg";
import image3 from "../assets/images/book3.jpg";
import image4 from "../assets/images/book4.jpg";
import image5 from "../assets/images/book5.jpg";
import image6 from "../assets/images/book6.jpg";



const Searchpage = () => {
    const navigate = useNavigate() ;
    const [searchTerm, setSearchTerm] = useState("") ;
    const location = useLocation();
    const { books: storeBooks = [] } = useBookStore() ;
    const [results, setResults] = useState([]);

    // Preset homepage books (same as BookList.jsx)
    const exampleBooks = [
        { 
            cover: image1, 
            title: "Blood of my monster", 
            author: "Rina Kent", 
            rating: "4.7",
            reviews: [
                { user: { username: "BookLover123" }, rating: 5, review: "Absolutely amazing! The plot twists kept me on the edge of my seat.", createdAt: "2024-01-15" },
                { user: { username: "RomanceReader" }, rating: 4, review: "Great character development and steamy romance scenes.", createdAt: "2024-01-10" }
            ]
        },
        { 
            cover: image2, 
            title: "Twisted Games", 
            author: "Ana Huang", 
            rating: "4.8",
            reviews: [
                { user: { username: "ThrillerFan" }, rating: 5, review: "One of the best books I've read this year. Highly recommend!", createdAt: "2024-01-20" },
                { user: { username: "BookWorm" }, rating: 4, review: "Intense and captivating from start to finish.", createdAt: "2024-01-18" }
            ]
        },
        { 
            cover: image3, 
            title: "Shatter me", 
            author: "Tahereh Mafi", 
            rating: "4.6",
            reviews: [
                { user: { username: "FantasyLover" }, rating: 5, review: "Beautiful writing style and unique concept. Loved it!", createdAt: "2024-01-12" },
                { user: { username: "YAReader" }, rating: 4, review: "Great for young adult readers. The world-building is incredible.", createdAt: "2024-01-08" }
            ]
        },
        { 
            cover: image4, 
            title: "A good girl's Guide To murder", 
            author: "Holly Jackson", 
            rating: "4.7",
            reviews: [
                { user: { username: "MysteryBuff" }, rating: 5, review: "Perfect mystery novel with unexpected twists!", createdAt: "2024-01-14" },
                { user: { username: "CrimeReader" }, rating: 4, review: "Well-written and keeps you guessing until the end.", createdAt: "2024-01-11" }
            ]
        },
        { 
            cover: image5, 
            title: " Bound in Inked Flame", 
            author: "Ava Larksen", 
            rating: "4.9",
            reviews: [
                { user: { username: "RomanceAddict" }, rating: 5, review: "Incredible chemistry between characters. Couldn't put it down!", createdAt: "2024-01-16" },
                { user: { username: "BookCollector" }, rating: 5, review: "Masterpiece! The author's best work yet.", createdAt: "2024-01-13" }
            ]
        },
        { 
            cover: image6, 
            title: "Fearless  ", 
            author: "Laurren Roberts", 
            rating: "4.8",
            reviews: [
                { user: { username: "AdventureSeeker" }, rating: 5, review: "Thrilling adventure with strong female protagonist!", createdAt: "2024-01-17" },
                { user: { username: "ActionFan" }, rating: 4, review: "Fast-paced and exciting. Great for action lovers.", createdAt: "2024-01-09" }
            ]
        },
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }



    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const q = urlParams.get("searchTerm") || "";
        setSearchTerm(q);

        const query = q.toLowerCase();
        const combined = [...exampleBooks, ...(storeBooks || [])];
        const filtered = combined.filter((b) => {
            const title = (b.title || "").toLowerCase();
            const author = (b.author || "").toLowerCase();
            return title.includes(query) || author.includes(query);
        });
        setResults(filtered);
    }, [location.search, storeBooks]);

    console.log("Search Results:", results) ;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#F8E7F6] to-[#F6E7D7] px-4 pb-16">
        <div className="max-w-5xl mx-auto">
          <p className='cursor-pointer py-6' onClick={() => navigate("/")}>&larr; Back to Home</p>

          <div className="w-full max-w-sm md:max-w-xl lg:max-w-3xl text-base lg:text-lg mx-auto">
            <form onSubmit={handleSubmit}
             className="relative w-full text-base lg:text-lg flex">
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

          <div className="mt-10">
            <h2 className="py-2 text-xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl font-bold text-center tracking-wide text-[#4B164C]">
              Search Results
            </h2>

            {results.length === 0 ? (
              <p className="text-center text-[#4B164C] mt-4">No results found.</p>
            ) : (
              <div className="mt-6 flex flex-wrap justify-center gap-5 lg:gap-8 max-w-4xl mx-auto">
                {results.map((book, index) => (
                  <Link key={index} to={`/book/${book._id || book.id || 'demo'}`} state={{ book }} className="block relative">
                    <div className="group cursor-pointer w-32 md:w-40 xl:w-48 shadow-lg hover:shadow-2xl rounded-2xl bg-gradient-to-br from-[#F8E7F6] via-[#FFF8F3] to-[#FBE7E7] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-[#8e1d6c] overflow-hidden">
                      <div className="h-40 md:h-48 xl:h-56 bg-[#4B164C] rounded-t-2xl overflow-hidden flex items-center justify-center relative">
                        <img
                          src={book.cover || "https://images.unsplash.com/photo-1512820790803-83ca734da794"}
                          alt={book.title || "Book cover"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90"
                        />
                        <div className="absolute bottom-2 left-2 bg-[#FFF8F3] text-[#8e1d6c] px-2 py-1 rounded-full text-xs font-semibold shadow group-hover:bg-[#F8E7F6] transition">
                          ★ {book.rating || "4.8"}
                        </div>
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="mb-2 font-bold text-base md:text-lg text-[#8e1d6c] truncate drop-shadow">
                          {book.title || "Untitled"}
                        </h3>
                        <p className="text-xs md:text-sm text-[#4B164C] italic">
                          by {book.author || "Unknown"}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Searchpage
