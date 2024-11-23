import React, { useEffect, useState } from "react";
import axios from "axios";
import { APIBASEURL } from "../../../config";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`${APIBASEURL}/application/applied/${user._id}`);
          setAppliedJobs(response.data);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setError("Failed to fetch applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [user]);

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 applied-jobs-container">
      <h4 className="text-center mb-4 applied-jobs-header">Applied Jobs</h4>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {appliedJobs.length > 0 ? (
        appliedJobs
          .filter((job) => job && job._id) // Filter out invalid jobs
          .map((job) => (
            <div key={job._id} className="card mb-4 shadow-sm applied-job-box">
              <div className="card-body">
                <h5 className="card-title job-title">{job.title}</h5>
                <p className="card-text job-description">{job.description}</p>
                <p className="card-text job-details"><strong>Company:</strong> {job.company}</p>
                <p className="card-text job-details"><strong>Location:</strong> {job.location}</p>
                <p className="card-text job-details"><strong>Job Type:</strong> {job.jobType}</p>
                <p className="card-text job-details"><strong>Salary:</strong> {job.salary}</p>
                <p className="card-text job-status"><strong>Status:</strong> {job.status}</p>
                {job.status === "accepted" && (
                  <p className="card-text job-message"><strong>Message:</strong> {job.message}</p>
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="text-center">
          <h6 className="no-jobs-message">No jobs applied yet.</h6>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
