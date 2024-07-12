import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for navigation
import { Button } from 'react-bootstrap';

const Logout = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`/api/${role}/logout`);
      console.log('Logout successful');
      // Navigate to home page after logout
      navigate('/home'); // Example navigation to home page
    } catch (error) {
      console.error('Logout error:', error.response.data);
      // Handle error state or show error message
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
