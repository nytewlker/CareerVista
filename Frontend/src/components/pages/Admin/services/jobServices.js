// src/services/jobService.js

import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/jobs'; // Replace with your actual backend API URL

export const getAllJobs = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error while fetching jobs:', error);
    throw error;
  }
};

export const addJob = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error('Error while adding job:', error);
    throw error;
  }
};

export const updateJob = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error while updating job ${id}:`, error);
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting job ${id}:`, error);
    throw error;
  }
};
