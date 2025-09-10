import { Route, Routes } from "react-router"
import Navbar from "./assets/components/Navbar"
import Addbook from "./pages/Addbook"
import Homepage from "./pages/Homepage"
import Library from "./pages/Library"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from './store/authStore';
import { useEffect } from "react";
import RedirectAuthenticatedUsers from "./providers/RedirectAuthenticatedUsers"
import RedirectUnauthenticatedUsers from "./providers/RedirectUnauthenticatedUsers"
import Footer from "./assets/components/Footer"
import Searchpage from "./pages/Searchpage"
import Bookpage from "./pages/Bookpage"
import Updatepage from "./pages/Updatepage"


 
function App() {
  const { fetchUser, fetchingUser } = useAuthStore();
  useEffect(() => {
    fetchUser() ;
  },[fetchUser]) ;
  if (fetchingUser) {
    return <p>Loading...</p> ;
  }


  return (
    <>

    <Toaster />

    <Navbar />
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/add-book" element={
        <RedirectUnauthenticatedUsers>
          <Addbook />
        </RedirectUnauthenticatedUsers>
        } />
      <Route path="/login" element={
        <RedirectAuthenticatedUsers>
          <LoginPage />
        </RedirectAuthenticatedUsers>
      } />
      <Route path="/signup" element={
        <RedirectAuthenticatedUsers>
          <SignupPage />
        </RedirectAuthenticatedUsers>
        } />

      <Route path="/search" element={<Searchpage />} />
      <Route path="/book/:id" element={<Bookpage />} />

      <Route path="/update-book/:id" element={<Updatepage />} />
    </Routes>

    <Footer />
    </>
  )
}

export default App
