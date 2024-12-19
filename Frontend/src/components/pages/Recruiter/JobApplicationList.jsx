import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APIBASEURL, DICURL } from '../../../config/index.js';

const JobApplicationsList = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${APIBASEURL}/application/applications/${jobId}`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching job applications:', error);
        setError('No job applications');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchApplications();
    }
  }, [jobId]);

  const handleOpenMessage = (applicationId) => {
    setSelectedApplication(applicationId);
  };

  const handleAccept = async (applicationId) => {
    if (!message) {
      alert('Please enter a message before accepting.');
      return;
    }

    try {
        await axios.post(`${APIBASEURL}/application/accept/${applicationId}`, {
        message,
      });
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status: 'accepted' } : app));
      setMessage('');
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  const handleReject = async (applicationId, employeeId) => {
    try {
      await axios.post(`${APIBASEURL}/application/reject/${employeeId}/${applicationId}`);
      setApplications(applications.map(app => app._id === applicationId ? { ...app, status: 'rejected' } : app));
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-24">
      <h2 className=" text-xl">Loading...</h2>
    </div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-24">
      <h2 className="text-red-500 text-xl">{error}</h2>
    </div>;
  }

  return (
    <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold  mb-6 border-b pb-3">Applications</h1>
      <div className="space-y-6">
        {applications.length > 0 ? (
          applications.map((applicant) => (
            <div key={applicant._id} className="flex flex-col md:flex-row bg-black bg-opacity-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex-grow">
                <div className="mb-4">
                  <h3 className="font-medium ">Cover Letter:</h3>
                  <p className=" mt-1">{applicant.coverLetter}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="">
                      <p className="mb-1"><span className="font-medium">Name:</span> {applicant.employeeId.name}</p>
                      <p className="mb-1"><span className="font-medium">Email:</span> {applicant.employeeId.email}</p>
                      <p className="mb-1"><span className="font-medium">Phone:</span> {applicant.employeeId.phone}</p>
                      <p><span className="font-medium">Institution:</span> {applicant.employeeId.institutionName}</p>
                    </div>
                    <Link 
                      to={`${DICURL}/${applicant.employeeId.resume}`} 
                      className="inline-block text-yellow-600 hover:text-yellow-800 font-extrabold text-3xl mb-2 no-underline hover:underline"
                      target='_blank'
                    >
                      View Resume
                    </Link>
                  </div>
                  
                  {selectedApplication === applicant._id && (
                    <div>
                      <textarea
                        placeholder="Message to applicant"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        rows={4}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-4 flex flex-col gap-2">
                {applicant.status === 'pending' && (
                  <div className="space-y-2">
                    <button 
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700  rounded"
                      onClick={() => handleAccept(applicant._id)}
                    >
                      Accept
                    </button>
                    <button 
                      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700  rounded"
                      onClick={() => handleReject(applicant._id, applicant.employeeId._id)}
                    >
                      Reject
                    </button>
                  </div>
                )}
                {selectedApplication !== applicant._id && applicant.status === 'pending' && (
                  <button 
                    className="w-full px-4 py-2 border   hover:bg-yellow-50 hover:text-black rounded"
                    onClick={() => handleOpenMessage(applicant._id)}
                  >
                    Add Message
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 ">
            No applications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicationsList;