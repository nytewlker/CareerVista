import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/admin'; // Replace with your actual backend API URL

const getAllJobs = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error while fetching jobs:', error);
    throw error;
  }
};

const addJob = async (data) => {
  try {
    const response = await axios.post(baseUrl, data);
    return response.data;
  } catch (error) {
    console.error('Error while adding job:', error);
    throw error;
  }
};

const updateJob = async (id, data) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error while updating job ${id}:`, error);
    throw error;
  }
};

const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error while deleting job ${id}:`, error);
    throw error;
  }
};

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [currentJob, setCurrentJob] = useState({ title: '', description: '', company: '', location: '' });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  };

  const handleShow = (job = { title: '', description: '', company: '', location: '' }) => {
    setCurrentJob(job);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      if (currentJob._id) {
        await updateJob(currentJob._id, currentJob);
      } else {
        await addJob(currentJob);
      }
      loadJobs();
      handleClose();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleChange = (e) => {
    setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
  };

  return (
    <div className='jobmanagement'>
      <div className='text-center mb-5'>Manage Jobs</div>
      {/* <Button variant="primary" onClick={() => handleShow()}>Add Job</Button> */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Company</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(job)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(job._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentJob._id ? 'Edit Job' : 'Add Job'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentJob.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentJob.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={currentJob.company}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={currentJob.location}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default JobManagement;
