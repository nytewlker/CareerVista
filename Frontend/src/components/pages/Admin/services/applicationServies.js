// src/services/applicationService.js

import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/applications'; // Replace with your actual backend API URL

export const getAllApplications = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error while fetching applications:', error);
    throw error;
  }
};

export const updateApplication = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error while updating application ${id}:`, error);
    throw error;
  }
};
