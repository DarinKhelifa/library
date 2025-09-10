import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
// eslint-disable-next-line react/prop-types
const RedirectUnauthenticatedUsers = ({children}) => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if(!user) {
        return null; // or a loading spinner, or redirect message
    }

  return (
    <>
      {children}
    </>
  )
}

export default RedirectUnauthenticatedUsers
