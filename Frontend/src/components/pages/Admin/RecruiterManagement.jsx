import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const RecruiterManagement = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [show, setShow] = useState(false);
  const [currentRecruiter, setCurrentRecruiter] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    companyName: '',
    bio: ''
  });

  useEffect(() => {
    loadRecruiters();
  }, []);

  const loadRecruiters = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/recruiters');
      setRecruiters(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
    }
  };

  const handleShow = (recruiter = null) => {
    setCurrentRecruiter(recruiter || {
      name: '',
      email: '',
      password: '',
      phone: '',
      companyName: '',
      bio: ''
    });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      if (currentRecruiter._id) {
        await axios.put(`http://localhost:5000/api/admin/recruiters/${currentRecruiter._id}`, currentRecruiter);
      } else {
        await axios.post('http://localhost:5000/api/admin/recruiters', currentRecruiter);
      }
      loadRecruiters();
      handleClose();
    } catch (error) {
      console.error('Error saving recruiter:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/recruiters/${id}`);
      loadRecruiters();
    } catch (error) {
      console.error('Error deleting recruiter:', error);
    }
  };

  const handleChange = (e) => {
    setCurrentRecruiter({ ...currentRecruiter, [e.target.name]: e.target.value });
  };

  return (
    <div className='Recruitermanagement'>
      <h2>Manage Recruiters</h2>
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>Add Recruiter</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter) => (
            <tr key={recruiter._id}>
              <td>{recruiter.name}</td>
              <td>{recruiter.email}</td>
              <td>{recruiter.phone}</td>
              <td>{recruiter.companyName}</td>
              <td>{recruiter.bio}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(recruiter)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(recruiter._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentRecruiter._id ? 'Edit Recruiter' : 'Add Recruiter'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentRecruiter.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={currentRecruiter.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={currentRecruiter.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={currentRecruiter.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={currentRecruiter.companyName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={currentRecruiter.bio}
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

export default RecruiterManagement;
