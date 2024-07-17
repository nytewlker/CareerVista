import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { getAllEmployees, addEmployee, updateEmployee, deleteEmployee } from './services/employeeServices';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await getAllEmployees();
    setEmployees(result.data);
  };

  const handleShow = (employee = null) => {
    setCurrentEmployee(employee);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    if (currentEmployee._id) {
      await updateEmployee(currentEmployee._id, currentEmployee);
    } else {
      await addEmployee(currentEmployee);
    }
    loadEmployees();
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  const handleChange = (e) => {
    setCurrentEmployee({ ...currentEmployee, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Manage Employees</h2>
      <Button variant="primary" onClick={() => handleShow()}>Add Employee</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Institution</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.institution}</td>
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
          <Modal.Title>{currentEmployee?._id ? 'Edit Employee' : 'Add Employee'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={currentEmployee?.name || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={currentEmployee?.email || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={currentEmployee?.phone || ''} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Institution</Form.Label>
              <Form.Control type="text" name="institution" value={currentEmployee?.institution || ''} onChange={handleChange} />
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
