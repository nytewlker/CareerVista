export const navConfig = {
  dashboard: [
    { path: "/", label: "Home" },
    {
      dropdown: true,
      title: "Join Us",
      items: [
        { path: "/RegistrationForm", label: "Register Yourself" },
        { path: "/LoginForm", label: "Login Here" },
        { divider: true },
        { path: "/adminlogin", label: "Admin Panel" }
      ]
    },
    { path: "/AboutUs", label: "About" },
    { path: "/ContactUs", label: "Contact Us" }
  ],
  recruiter: [
    { path: "/recruiterhome", label: "Home" },
    { path: "/addjobs", label: "Add Jobs" },
    { path: "/myjobs", label: "My Jobs" },
    { path: "/recruiterprofile", label: "Recruiter Profile" },
    { path: "/", label: "Log-Out" }
  ],
  employee: [
    { path: "/employeehome", label: "Home" },
    { path: "/appliedjobs", label: "Applied Jobs" },
    { path: "/employeeprofile", label: "Employee Profile" },
    { path: "/", label: "Log-Out" }
  ],
  admin: [
    { path: "/dashboard", label: "Home" },
    { path: "/admin/recruiters", label: "Recruiter Management" },
    { path: "/admin/employees", label: "Employee Management" },
    { path: "/admin/jobs", label: "Job Management" },
    { path: "/admin/applications", label: "Application Management" },
    { path: "/admin/reports", label: "Reports" },
    { path: "/admin/settings", label: "Settings" }
  ]
};
