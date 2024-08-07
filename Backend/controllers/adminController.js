const Recruiter = require('../models/Recruiter');
const Employee = require('../models/Employee');
const Job = require('../models/Job');
const Application = require('../models/Application');
const Setting = require('../models/Setting');

// Recruiters
exports.getAllRecruiters = async (req, res) => {
  const recruiters = await Recruiter.find();
  res.json(recruiters);
};

exports.addRecruiter = async (req, res) => {
  const newRecruiter = new Recruiter(req.body);
  await newRecruiter.save();
  res.json(newRecruiter);
};

exports.updateRecruiter = async (req, res) => {
  const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(recruiter);
};

exports.deleteRecruiter = async (req, res) => {
  await Recruiter.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recruiter deleted' });
};

// Employees
exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.addEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  await newEmployee.save();
  res.json(newEmployee);
};

exports.updateEmployee = async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(employee);
};

exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
};

// Jobs
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
};

exports.addJob = async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.json(newJob);
};

exports.updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
};

exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Job deleted' });
};

// Applications
exports.getAllApplications = async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
};

exports.updateApplicationStatus = async (req, res) => {
  const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(application);
};

// Settings
exports.getSettings = async (req, res) => {
  const settings = await Setting.find();
  res.json(settings);
};

exports.updateSettings = async (req, res) => {
  const settings = await Setting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(settings);
};
