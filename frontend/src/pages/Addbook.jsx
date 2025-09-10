import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useBookStore } from '../store/bookstore';

const Addbook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const {addBook , isLoading , error} = useBookStore();
  const navigate = useNavigate() ;
  // Show preview image if cover is set
  const image = cover;  



  // Fix: handle file upload and text URL
  const handleCoverChange = (e) => {
    // If file is uploaded
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Compress image before converting to base64
      const compressImage = (file, maxWidth = 800, quality = 0.8) => {
        return new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img;
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
            resolve(compressedDataUrl);
          };
          
          const reader = new FileReader();
          reader.onload = (e) => {
            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        });
      };
      
      compressImage(file).then((compressedImage) => {
        setCover(compressedImage);
      });
    } else {
      // If text input (URL)
      setCover(e.target.value);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author || !cover) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const {message } = await addBook(title, author, cover, link, rating, description);
    toast.success(message);
    navigate('/') ;
}

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF8F3] via-[#F8E7F6] to-[#F6E7D7] px-4'>
      <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-xl mx-auto space-y-6 bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 border border-[#F8E7F6]'>
        <h2 className='text-center font-semibold md:text-2xl text-[#4B164C] mb-2 tracking-wide relative'>
          Add a Book
          <span className="block mx-auto mt-2 w-16 h-1 bg-[#F8E7F6] rounded-full"></span>
        </h2>
        {image && (
          <img
            src={image}
            alt="Book cover preview"
            className="mx-auto mb-4 w-32 h-44 object-cover rounded-lg shadow"
          />
        )}
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#8e1d6c] transition font-semibold shadow-md'
            required
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#8e1d6c] transition font-semibold shadow-md'
            required
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className='mb-2'
          />
          <input
            type="text"
            value={cover}
            onChange={handleCoverChange}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#8e1d6c] transition font-semibold shadow-md'
            placeholder="Or paste image URL here"
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#8e1d6c] transition font-semibold shadow-md'
            placeholder="https://example.com/book"
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Rating:</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#8e1d6c] transition font-semibold shadow-md'
            placeholder="e.g. 4.8"
          />
        </div>
        <div className='flex flex-col w-full'>
          <label className='md:text-lg mb-1'>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full px-3 py-2 text-[#4B164C] rounded-lg bg-[#FFF8F3] border border-[#F8E7F6] focus:outline-none focus:ring-2 focus:ring-[#8e1d6c] transition font-semibold shadow-md'
            rows={3}
            placeholder="Tell us about this book..."
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-[#F8E7F6] via-[#FFFCF2] to-[#F8E7F6] text-[#4B164C] font-bold px-7 py-3 rounded-full shadow-lg border-2 border-[#F8E7F6] transition-all duration-300 hover:scale-105 hover:from-[#FFFCF2] hover:to-[#F8E7F6] relative z-10"
        >
          {isLoading ? "Please wait ... " : "Add Book To your Library" } 
        </button>
      </form>
    </div>
  );
};

export default Addbook;
