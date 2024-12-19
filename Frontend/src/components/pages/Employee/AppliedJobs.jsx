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
      <div className="flex justify-center items-center  min-h-screen">
        <div className="animate-spin rounded-lg h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl py-16 mx-auto px-4   sm:px-6 lg:px-8 ">
      <h2 className="text-3xl font-bold text-center  mb-8">Applied Jobs</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {appliedJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appliedJobs
            .filter((job) => job && job._id)
            .map((job) => (
              <div key={job._id} className="bg-black bg-opacity-50 backdrop:blur-sm rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold ">{job.title}</h3>
                    <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      job.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <p className="-600 mb-4 line-clamp-3">{job.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center -700">
                      <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      <span>{job.company}</span>
                    </div>
                    
                    <div className="flex items-center -700">
                      <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center -700">
                      <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{job.jobType}</span>
                    </div>
                    
                    <div className="flex items-center -700">
                      <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  {job.status === "accepted" && job.message && (
                    <div className="mt-4 p-3 bg-green-50 rounded-md">
                      <p className="text-green-800 text-sm">{job.message}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 -400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium -900">No jobs applied yet</h3>
          <p className="mt-1 text-sm -500">Start exploring and applying for jobs to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;