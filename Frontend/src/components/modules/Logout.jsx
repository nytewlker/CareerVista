import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Assuming you use react-router-dom for routing
import { Button } from 'react-bootstrap';

const Logout = ({ role }) => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await axios.post(`/api/${role}/logout`);
      console.log('Logout successful');
      // Redirect to login page or any other page after logout
      history.push('/login'); // Example redirect to login page
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
