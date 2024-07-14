// navConfig.js
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
          { path: "/AdminPanel", label: "Dashboard Admin Panel" } // Adjusted label for clarity
        ]
      },
      { path: "/AboutUs", label: "About" },
      { path: "/ContactUs", label: "Contact Us" },
      
      // Add more dashboard-specific links here if needed
    ],

    recruiter: [
      { path: "/recruiterhome", label: "Home" },
      { path: "/addjobs", label: "Add Jobs" },
      { path: "/myjobs", label: "My Jobs" },
      { path: "/recruiterprofile", label: "Recruiter Profile" },
      { path: "/", label: "Log-Out" },
      // Add more recruiter-specific links here if needed
    ],

    employee: [
      { path: "/employeehome", label: "Home" },
      { path: "/appliedjobs", label: "Applied Jobs " },
      { path: "/employeeprofile", label: "Employee Profile" },
      { path: "/", label: "Log-Out" } // Adjusted label for clarity


      
      // Add more employee-specific links here if needed
    ],
  };
