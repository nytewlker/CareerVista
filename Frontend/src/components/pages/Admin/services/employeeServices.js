// src/services/employeeService.js

import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/employees'; // Replace with your actual backend API URL

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error while fetching employees:', error);
    throw error;
  }
};

export const addEmployee = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error('Error while adding employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error while updating employee ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting employee ${id}:`, error);
    throw error;
  }
};
