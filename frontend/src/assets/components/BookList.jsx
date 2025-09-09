import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useBookStore } from "../../store/bookstore";
import image1 from "../images/book1.jpg";
import image2 from "../images/book2.jpg";
import image3 from "../images/book3.jpg";
import image4 from "../images/book4.jpg";
import image5 from "../images/book5.jpg";
import image6 from "../images/book6.jpg";

const BookList = ({ variant = "home" }) => {
  const { books, isLoading, error, fetchBooks } = useBookStore();

  useEffect(() => {
    // Always try to fetch real books so Home and Library show the same data
    fetchBooks();
  }, [fetchBooks]);

  // Example books for demo (fallback when no books from API)
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

  return (
    <div className="text-[#4B164C] bg-[#FFF8F3] px-4 md:px-12 pb-20">
      <h1 className="py-6 text-xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl font-bold text-center tracking-wide">
        {variant === "library" ? "Your Library" : "Reader's are loving these books"}
      </h1>

      <div className="flex flex-wrap justify-center gap-5 lg:gap-8 max-w-4xl mx-auto">
        {(books && books.length > 0 ? books : exampleBooks).map((book, index) => (
          <Link
            key={index}
            to={`/book/${book._id || 'demo'}`}
            state={{ book }}
            className="block relative"
          >
            <div className="group cursor-pointer w-32 md:w-40 xl:w-48 shadow-lg hover:shadow-2xl rounded-2xl bg-gradient-to-br from-[#F8E7F6] via-[#FFF8F3] to-[#FBE7E7] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-2 border-[#8e1d6c] overflow-hidden">
              <div className="h-40 md:h-48 xl:h-56 bg-[#4B164C] rounded-t-2xl overflow-hidden flex items-center justify-center relative">
                <img
                  src={
                    book.cover ||
                    "https://images.unsplash.com/photo-1512820790803-83ca734da794"
                  }
                  alt={book.title || "Book cover"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90"
                />
                <div className="absolute bottom-2 left-2 bg-[#FFF8F3] text-[#8e1d6c] px-2 py-1 rounded-full text-xs font-semibold shadow group-hover:bg-[#F8E7F6] transition">
                  ★ {book.rating || "4.8"}
                </div>
              </div>
              <div className="p-3 text-center">
                <h2 className="mb-2 font-bold text-base md:text-lg text-[#8e1d6c] truncate drop-shadow">
                  {book.title || "Blood of my monster"}
                </h2>
                <p className="text-xs md:text-sm text-[#4B164C] italic">
                  by {book.author || "Rina Kent"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
