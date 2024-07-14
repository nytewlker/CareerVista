import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getAllJobs, addJob, updateJob, deleteJob } from './services/jobServices';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const result = await getAllJobs();
    setJobs(result.data);
  };

  const handleShow = (job = null) => {
    setCurrentJob(job);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (currentJob._id) {
      await updateJob(currentJob._id, currentJob);
    } else {
      await addJob(currentJob);
    }
    loadJobs();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  const handleChange = (e) => {
    setCurrentJob({ ...currentJob, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Manage Jobs</h2>
      <Button variant="primary" onClick={() => handleShow()}>Add Job</Button>
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
          <Modal.Title>{currentJob?._id ? 'Edit Job' : 'Add Job'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={currentJob?.title || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={currentJob?.description || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" name="company" value={currentJob?.company || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" name="location" value={currentJob?.location || ''} onChange={handleChange} />
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
