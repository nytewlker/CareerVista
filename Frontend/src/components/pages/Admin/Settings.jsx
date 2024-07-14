import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Settings = () => {
  return (
    <div>
      <h2>Settings</h2>
      <Form>
        <Form.Group>
          <Form.Label>Admin Email</Form.Label>
          <Form.Control type="email" placeholder="Enter admin email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Admin Password</Form.Label>
          <Form.Control type="password" placeholder="Enter admin password" />
        </Form.Group>
        <Button variant="primary" type="submit">Save Changes</Button>
      </Form>
    </div>
  );
};

export default Settings;
