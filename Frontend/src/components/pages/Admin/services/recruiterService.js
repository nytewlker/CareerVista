// src/services/recruiterService.js

import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/recruiters'; // Replace with your actual backend API URL

export const getAllRecruiters = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error while fetching recruiters:', error);
    throw error;
  }
};

export const addRecruiter = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error('Error while adding recruiter:', error);
    throw error;
  }
};

export const updateRecruiter = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error while updating recruiter ${id}:`, error);
    throw error;
  }
};

export const deleteRecruiter = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting recruiter ${id}:`, error);
    throw error;
  }
};
