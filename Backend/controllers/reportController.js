const Application = require('../models/Application'); // Import the Application model
const Job = require('../models/Job'); // Import the Job model
const Recruiter = require('../models/Recruiter'); // Import the Recruiter model
const Employee = require('../models/Employee'); // Import the Employee model
const PDFDocument = require('pdfkit'); // For PDF generation
const ExcelJS = require('exceljs'); // For Excel generation
const mongoose = require('mongoose');

// Download Job Posting Report
exports.downloadJobPostingReport = async (req, res) => {
    try {
      const jobs = await Job.find().populate('recruiterId', 'name email');
  
      const doc = new PDFDocument();
      let buffers = [];
  
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=job_posting_report.pdf');
        res.send(pdfData);
      });
  
      // Add content to the PDF
      doc.fontSize(25).text('Job Posting Report', { align: 'center' });
      doc.moveDown();
      jobs.forEach(job => {
        doc.fontSize(18).text(`Title: ${job.title}`);
        doc.fontSize(14).text(`Description: ${job.description}`);
        doc.fontSize(14).text(`Recruiter: ${job.recruiterId.name} (${job.recruiterId.email})`);
        doc.moveDown();
      });
  
      doc.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error generating job posting report' });
    }
  };

// Download Application Report
exports.downloadApplicationReport = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('jobId', 'title')
      .populate('employeeId', 'name email');

    const doc = new PDFDocument();
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=application_report.pdf');
      res.send(pdfData);
    });

    doc.fontSize(25).text('Application Report', { align: 'center' });
    doc.moveDown();
    applications.forEach(app => {
      doc.fontSize(18).text(`Job Title: ${app.jobId.title}`);
      doc.fontSize(14).text(`Applicant: ${app.employeeId.name} (${app.employeeId.email})`);
      doc.fontSize(14).text(`Status: ${app.status}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ msg: 'Error generating application report' });
  }
};

// Download Recruiter Report
exports.downloadRecruiterReport = async (req, res) => {
  try {
    const recruiters = await Recruiter.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Recruiter Report');

    worksheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Phone', key: 'phone' },
      { header: 'Company Name', key: 'companyName' },
    ];

    recruiters.forEach(recruiter => {
      worksheet.addRow({
        name: recruiter.name,
        email: recruiter.email,
        phone: recruiter.phone,
        companyName: recruiter.companyName,
      });
    });

    res.setHeader('Content-Disposition', 'attachment; filename=recruiter_report.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ msg: 'Error generating recruiter report' });
  }
};

// Download Employee Report
exports.downloadEmployeeReport = async (req, res) => {
  try {
    const employees = await Employee.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Report');

    worksheet.columns = [
      { header: 'Name', key: 'name' },
      { header: 'Email', key: 'email' },
      { header: 'Phone', key: 'phone' },
      { header: 'Institution Name', key: 'institutionName' },
      { header: 'Skills', key: 'skills' },
    ];

    employees.forEach(employee => {
      worksheet.addRow({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        institutionName: employee.institutionName,
        skills: employee.skills.join(', '), // Join skills into a string
      });
    });

    res.setHeader('Content-Disposition', 'attachment; filename=employee_report.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ msg: 'Error generating employee report' });
  }
};
