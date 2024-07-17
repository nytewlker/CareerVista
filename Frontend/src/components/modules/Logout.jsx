import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Logout = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`/api/${role}/logout`);
      console.log('Logout successful');
      // Clear user data from local storage
      localStorage.removeItem('user');
      // Navigate to the home page after logout
      navigate('/home');
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      // Optionally, you can handle the error state or show an error message
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
