import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getAllRecruiters, addRecruiter, updateRecruiter, deleteRecruiter } from './services/recruiterService';

const RecruiterManagement = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [show, setShow] = useState(false);
  const [currentRecruiter, setCurrentRecruiter] = useState(null);

  useEffect(() => {
    loadRecruiters();
  }, []);

  const loadRecruiters = async () => {
    const result = await getAllRecruiters();
    setRecruiters(result.data);
  };

  const handleShow = (recruiter = null) => {
    setCurrentRecruiter(recruiter);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (currentRecruiter._id) {
      await updateRecruiter(currentRecruiter._id, currentRecruiter);
    } else {
      await addRecruiter(currentRecruiter);
    }
    loadRecruiters();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteRecruiter(id);
    loadRecruiters();
  };

  const handleChange = (e) => {
    setCurrentRecruiter({ ...currentRecruiter, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Manage Recruiters</h2>
      <Button variant="primary" onClick={() => handleShow()}>Add Recruiter</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recruiters.map((recruiter) => (
            <tr key={recruiter._id}>
              <td>{recruiter.name}</td>
              <td>{recruiter.email}</td>
              <td>{recruiter.company}</td>
              <td>{recruiter.phone}</td>
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
          <Modal.Title>{currentRecruiter?._id ? 'Edit Recruiter' : 'Add Recruiter'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={currentRecruiter?.name || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={currentRecruiter?.email || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control type="text" name="company" value={currentRecruiter?.company || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={currentRecruiter?.phone || ''} onChange={handleChange} />
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
