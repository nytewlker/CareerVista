import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillAlt, FaUserTie } from 'react-icons/fa';
import { APIBASEURL } from '../../../config';

const RecruiterHome = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${APIBASEURL}/job`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen  text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-yellow-600   mb-8">Posted Job Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-black bg-opacity-50 backdrop:blur-sm rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold  mb-2">
                  {job.title}
                </h3>
                <p className="text-yellow-600 font-medium mb-4">{job.company}</p>
                <div className="space-y-3">
                  <div className="flex items-center ">
                    <FaBriefcase className="w-5 h-5 mr-2 " />
                    <span>{job.experience} Experience</span>
                  </div>
                  <div className="flex items-center ">
                    <FaMoneyBillAlt className="w-5 h-5 mr-2 " />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center ">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2 " />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center ">
                    <FaUserTie className="w-5 h-5 mr-2 " />
                    <span>{job.jobType}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterHome;