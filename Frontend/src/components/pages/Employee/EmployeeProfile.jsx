import React, { useState, useEffect } from "react";
import axios from "axios";
import { APIBASEURL, DICURL } from "../../../config";

const EmployeeProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institutionName: "",
    startYear: "",
    endYear: "",
    skills: "",
    resume: null,
    profilePic: null,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.get(`${APIBASEURL}/employee/profile/${user._id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      alert("Failed to fetch profile data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const user = JSON.parse(localStorage.getItem("user"));
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      await axios.put(`${APIBASEURL}/employee/profile/${user._id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Employee profile updated successfully!");
    } catch (error) {
      console.error("Error updating employee profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const renderInput = (label, name, type = "text", value, onChange, required = true) => (
    <div>
      <label className="block  font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border tex-black   rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
    </div>
  );

  if (loading) {
    return <div className="text-center text-xl text-yellow-500">Loading profile...</div>;
  }

  return (
    <div className="container text-white mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-500">Employee Profile</h2>
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 bg-black bg-opacity-50 backdrop:blur-sm p-6 rounded-lg shadow-md">
        <div className="w-40 h-40 items-center relative">
          <img
            src={formData.profilePic ? `${DICURL}/${formData.profilePic}` : "/default-profile.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-yellow-500"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-2xl font-semibold ">{formData.name || "N/A"}</h4>
          <p className=" mb-4">{formData.email || "N/A"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-6">
          {renderInput("Name", "name", "text", formData.name, handleChange)}
          {renderInput("Email", "email", "email", formData.email, handleChange)}
        </div>

        <div className="grid md:grid-cols-2  gap-6">
          {renderInput("Phone", "phone", "tel", formData.phone, handleChange)}
          {renderInput("Institution Name", "institutionName", "text", formData.institutionName, handleChange)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {renderInput("Start Year", "startYear", "number", formData.startYear, handleChange)}
          {renderInput("End Year", "endYear", "number", formData.endYear, handleChange)}
        </div>

        {renderInput("Skills", "skills", "text", formData.skills, handleChange)}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block  font-medium mb-2">Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label className="block  font-medium mb-2">Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>

        {formData.resume && (
          <div className="p-4  rounded-lg">
            <span className=" text-xl font-extrabold ">Resume: </span>
            <a
              href={`${DICURL}/${formData.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-600 no-underline"
            >
              View Resume
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-3 rounded-lg font-medium transition duration-300 ${
            saving ? "bg-gray-400  cursor-not-allowed" : "bg-yellow-500  hover:bg-yellow-600"
          }`}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
      </div>

      
    </div>
  );
};

export default EmployeeProfile;
