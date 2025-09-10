import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useBookStore } from '../store/bookstore'
import { toast } from 'react-hot-toast'



function Bookpage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const routedBook = location.state && location.state.book;
  const { book, isLoading, error, fetchBook, updateRating, deleteBook } = useBookStore();
  const [localRating, setLocalRating] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // If book is passed via router state (demo/preset), skip fetch
    if (routedBook) return;

    // Only fetch when id looks like a Mongo ObjectId (24 hex chars)
    const isMongoId = /^[a-f\d]{24}$/i.test(id || '');
    if (id && isMongoId) {
      fetchBook(id);
    }
  }, [id, fetchBook, routedBook]);

  if (!routedBook && isLoading) {
    return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div>
          <p className='text-red-600 mb-4'>{error}</p>
          <button onClick={() => navigate(-1)} className='underline'>Go Back</button>
        </div>
      </div>
    )
  }

  if (!routedBook && !book) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div>
          <p className='mb-4'>Book not found.</p>
          <button onClick={() => navigate(-1)} className='underline'>Go Back</button>
        </div>
      </div>
    )
  }

  const displayBook = routedBook || book;

  const handleDelete = async () => {
    try {
      const targetId = displayBook._id || id;
      if (!targetId) {
        toast.error('Missing book id');
        return;
      }
      const { message } = await deleteBook(targetId);
      toast.success(message);
      navigate('/');
    } catch (e) {
      toast.error('Failed to delete book');
    }
  }
  
  // Example fake reviews for demo display
  const exampleReviews = [
    { user: { username: 'BookLover123' }, rating: 5, review: 'Absolutely amazing! The plot twists kept me on the edge of my seat.', createdAt: '2024-01-15' },
    { user: { username: 'PageTurner' }, rating: 4, review: 'Great pacing and lovable characters. Highly recommend!', createdAt: '2024-02-10' },
    { user: { username: 'NovelNerd' }, rating: 4.5, review: 'Well-written and engaging from start to finish.', createdAt: '2024-03-05' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#FFF8F3] via-[#F8E7F6] to-[#F6E7D7] px-4 py-10'>
      {/* Three dots menu */}
      <div className='max-w-5xl mx-auto relative mb-4'>
        <div className='flex justify-end'>
          <div className='relative'>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className='p-2 text-[#4B164C] hover:bg-white/50 rounded-full transition-colors'
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
              </svg>
            </button>
            
            {showMenu && (
              <div className='absolute right-0 top-10 bg-white rounded-lg shadow-lg border py-2 z-10 min-w-[120px]'>
                <button
                onClick={() => {
                         setShowMenu(false);
                         navigate(`/update-book/${displayBook._id || id}`);
                        }}
                className='w-full px-4 py-2 text-left text-[#4B164C] hover:bg-gray-100 transition-colors'
>
  Update
</button>
                <button
                  onClick={handleDelete}
                  
                  className='w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 transition-colors'
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-1'>
          <img src={displayBook.cover} alt={displayBook.title} className='w-full rounded-xl shadow-lg' />
          <button
            onClick={() => {
              if (displayBook.link) {
                window.open(displayBook.link, '_blank');
              } else {
                alert('No reading link available for this book');
              }
            }}
            className="w-full mt-4 px-5 py-2 rounded border font-semibold bg-[#4B164C] text-white border-[#4B164C] hover:bg-[#3a123b] transition-colors"
          >
            Read Now
          </button>
        </div>
        <div className='md:col-span-2 text-[#4B164C]'>
          <h1 className='text-2xl md:text-3xl font-bold mb-2'>{displayBook.title}</h1>
          <p className='italic mb-4'>by {displayBook.author}</p>

          <div className='flex flex-wrap gap-4 mb-6'>
            <div className='px-3 py-1 bg-white/70 rounded-full border'>
              <span className='opacity-70 mr-1'>Rating:</span>
              <span className='font-semibold'>{displayBook.rating ?? '—'}</span>
            </div>
            {displayBook.user?.username && (
              <div className='px-3 py-1 bg-white/70 rounded-full border'>
                <span className='opacity-70 mr-1'>Uploaded by:</span>
                <span className='font-semibold'>{displayBook.user.username}</span>
              </div>
            )}
            {displayBook.createdAt && (
              <div className='px-3 py-1 bg-white/70 rounded-full border'>
                <span className='opacity-70 mr-1'>Added:</span>
                <span className='font-semibold'>{new Date(displayBook.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {displayBook.description && (
            <p className='mb-6 leading-relaxed'>{displayBook.description}</p>
          )}


          {/* Example Reviews Section */}
          <div className='mt-8'>
            <h3 className='text-lg font-semibold mb-4'>Reviews ({exampleReviews.length})</h3>
            <div className='space-y-4'>
              {exampleReviews.map((review, index) => (
                <div key={index} className='p-4 bg-white/50 rounded-lg border'>
                  <div className='flex items-center justify-between mb-2'>
                    <span className='font-semibold'>{review.user?.username || 'Anonymous'}</span>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm'>{review.rating}/5</span>
                      <span className='text-sm opacity-70'>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className='text-sm'>{review.review}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='mt-8'>
            <button onClick={() => navigate(-1)} className='px-4 py-2 border rounded'>Back</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookpage