import React from 'react'
import Hero from '../assets/components/Hero'
import BookList from '../assets/components/BookList'
const Homepage = () => {
  return (
    <div>
      <Hero />
      <BookList variant="home" />
    </div>
  )
}

export default Homepage
