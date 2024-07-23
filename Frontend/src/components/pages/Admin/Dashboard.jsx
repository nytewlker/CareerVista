import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, Admin!</h1>
      <div className="card">Manage all recruiters</div>
      <div className="card">Manage all employees</div>
      <div className="card">Manage job postings</div>
      <div className="card">View system reports</div>
    </div>
  );
};

export default AdminDashboard;
