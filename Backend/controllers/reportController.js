// controllers/reportController.js

const jsPDF = require('jspdf');
const XLSX = require('xlsx');
const Application = require('../models/Application'); // Adjust based on your models
const Job = require('../models/Job');
const Recruiter = require('../models/Recruiter');
const Employee = require('../models/Employee');

exports.getJobPostingReport = async (req, res) => {
  try {
    const jobs = await Job.find(); // Fetch job postings
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(jobs);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Job Postings");

    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader('Content-Disposition', 'attachment; filename=job_postings_report.xlsx');
    res.send(excelFile);
  } catch (error) {
    res.status(500).json({ message: 'Error generating job posting report', error });
  }
};

exports.getApplicationReport = async (req, res) => {
  try {
    const applications = await Application.find().populate('jobId employeeId');
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(applications.map(app => ({
      jobId: app.jobId.title,
      employeeId: app.employeeId.name,
      coverLetter: app.coverLetter,
      status: app.status,
      message: app.message,
    })));
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader('Content-Disposition', 'attachment; filename=application_report.xlsx');
    res.send(excelFile);
  } catch (error) {
    res.status(500).json({ message: 'Error generating application report', error });
  }
};

exports.getRecruiterReport = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(recruiters);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Recruiters");

    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader('Content-Disposition', 'attachment; filename=recruiter_report.xlsx');
    res.send(excelFile);
  } catch (error) {
    res.status(500).json({ message: 'Error generating recruiter report', error });
  }
};

exports.getEmployeeReport = async (req, res) => {
  try {
    const employees = await Employee.find();
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(employees);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader('Content-Disposition', 'attachment; filename=employee_report.xlsx');
    res.send(excelFile);
  } catch (error) {
    res.status(500).json({ message: 'Error generating employee report', error });
  }
};
exports.getJobPostingReportPDF = async (req, res) => {
    try {
      const jobs = await Job.find();
      const doc = new jsPDF();
      doc.text("Job Posting Report", 10, 10);
  
      jobs.forEach((job, index) => {
        doc.text(`${index + 1}. ${job.title}`, 10, 20 + index * 10);
      });
  
      res.setHeader('Content-Disposition', 'attachment; filename=job_postings_report.pdf');
      res.send(doc.output('arraybuffer')); // Send PDF as a response
    } catch (error) {
      res.status(500).json({ message: 'Error generating PDF report', error });
    }
  };
  