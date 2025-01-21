import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (!token) {
      navigate('/user/login'); // Redirect to login page if no token is found
    }
  }, [navigate]); // Dependency array ensures this runs only when the component mounts

  return (
    <div>
      {localStorage.getItem('token') ? children : null} 
      {/* Render children only if the token exists */}
    </div>
  );
};

export default UserProtectedWrapper;
