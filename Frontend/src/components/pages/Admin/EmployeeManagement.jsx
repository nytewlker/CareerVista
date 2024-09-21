import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { DICURL } from '../../../config';
import { Avatar } from '@mui/material';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/admin/employees');
      setEmployees(result.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleShow = (employee = {}) => {
    setCurrentEmployee(employee);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setCurrentEmployee({});
    setFile(null);
  };

  const handleSave = async () => {
    try {
      if (file) {
        // Logic to handle file upload (e.g., to an S3 bucket or server endpoint)
        // Example: const fileUrl = await uploadFile(file);
        // currentEmployee.resume = fileUrl;
      }

      if (currentEmployee._id) {
        await axios.put(`http://localhost:5000/api/admin/employees/${currentEmployee._id}`, currentEmployee);
      } else {
        await axios.post('http://localhost:5000/api/admin/employees', currentEmployee);
      }

      loadEmployees();
      handleClose();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/employees/${id}`);
      loadEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: files[0] });
  };

  return (
    <div className='EmployeeManagement'>
      <div className='text-center mb-5'>Manage Employees</div>
      <Button variant="primary" onClick={() => handleShow()}>Add Employee</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Institution</th>
            <th>Start Year</th>
            <th>End Year</th>
            <th>Profile Picture</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.institutionName}</td>
              <td>{employee.startYear}</td>
              <td>{employee.endYear}</td>
              <td>
              <Avatar
              src={`${DICURL}/${employee.profilePic}`}
              alt="Profile Pic"
              className="profile-picture"
              sx={{ width: 50, height: 50 }}
            />
              </td>
              <td>
                <a className="view-resume" href={`${DICURL}/${employee.resume}`} target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              </td>
              <td>
                <Button variant="warning" onClick={() => handleShow(employee)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(employee._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEmployee._id ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={currentEmployee.name || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={currentEmployee.email || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={currentEmployee.phone || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={currentEmployee.password || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Institution Name</Form.Label>
              <Form.Control type="text" name="institutionName" value={currentEmployee.institutionName || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Year</Form.Label>
              <Form.Control type="text" name="startYear" value={currentEmployee.startYear || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Year</Form.Label>
              <Form.Control type="text" name="endYear" value={currentEmployee.endYear || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control type="text" name="skills" value={currentEmployee.skills || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Resume</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
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

export default EmployeeManagement;
