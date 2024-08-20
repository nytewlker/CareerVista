import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear user data from localStorage
      localStorage.removeItem('user');

      // Redirect to the home page after logout
      navigate('/home');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
