import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
const RedirectAuthenticatedUsers = ({children}) => {
    const {user} = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate('/');
        } } , [user, navigate]);

    if (user) {
        return null; // or a loading spinner, or redirect message
    }
  return (
    <>
      {children}
    </>
  )
}

export default RedirectAuthenticatedUsers
