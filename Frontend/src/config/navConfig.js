// navConfig.js
export const navConfig = {
    recruiter: [
      { path: "/", label: "Home" },
      { path: "/AboutUs", label: "About" },
      { path: "/ContactUs", label: "Contact Us" },
      { path: "/JobPostings", label: "Job Postings" },
      {
        dropdown: true,
        title: "Join Us",
        items: [
          { path: "/RegistrationForm", label: "Register Yourself" },
          { path: "/LoginForm", label: "Login Here" },
          { divider: true },
          { path: "/AdminPanel", label: "Recruiter Admin Panel" } // Adjusted label for clarity
        ]
      }
      // Add more recruiter-specific links here if needed
    ],
    employee: [
      { path: "/", label: "Home" },
      { path: "/AboutUs", label: "About" },
      { path: "/ContactUs", label: "Contact Us" },
      { path: "/JobSearch", label: "Job Search" },
      {
        dropdown: true,
        title: "Join Us",
        items: [
          { path: "/RegistrationForm", label: "Register Yourself" },
          { path: "/LoginForm", label: "Login Here" },
          { divider: true },
          { path: "/AdminPanel", label: "Employee Admin Panel" } // Adjusted label for clarity
        ]
      }
      // Add more employee-specific links here if needed
    ],
    dashboard: [
      { path: "/", label: "Home" },
      { path: "/AboutUs", label: "About" },
      { path: "/ContactUs", label: "Contact Us" },
      { path: "/AdminPanel", label: "Admin Panel" },
      {
        dropdown: true,
        title: "Join Us",
        items: [
          { path: "/RegistrationForm", label: "Register Yourself" },
          { path: "/LoginForm", label: "Login Here" },
          { divider: true },
          { path: "/AdminPanel", label: "Dashboard Admin Panel" } // Adjusted label for clarity
        ]
      }
      // Add more dashboard-specific links here if needed
    ],
  };
  