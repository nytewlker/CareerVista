import { BrowserRouter,Route,Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from "./components/Layout/Layout";

import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";

import LoginForm from "./components/modules/LoginForm";
import RegistrationFrom from "./components/modules/RegistrationForm"

import RecruiterHome from "./components/pages/Recruiter/RecruiterHome";
import AddJobs from "./components/pages/Recruiter/AddJobs";
import MyJobs from "./components/pages/Recruiter/MyJobs";
import UpdateJob from "./components/pages/Recruiter/UpdateJob";
import RecruiterProfile from "./components/pages/Recruiter/RecruiterProfile ";

import EmployeeHome from "./components/pages/Employee/EmployeeHome";
import ApplyJob from './components/pages/Employee/ApplyJob';
import AppliedJobs from "./components/pages/Employee/AppliedJobs";
import EmployeeProfile from "./components/pages/Employee/EmployeeProfile ";
import Logout from "./components/modules/Logout";




// import JobList from "./components/pages/Employee/jobList";
// import R1 from "./components/modules/r1";










function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout panel={'dashboard'}/>}>
          <Route index element={<Home/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/LoginForm" element={<LoginForm/>}/>
          <Route path="/RegistrationForm" element={<RegistrationFrom/>}/>
        </Route>

        <Route path="/" element={<Layout panel={'recruiter'}/>}>
          <Route path="/recruiterhome" element={<RecruiterHome/>} />
          <Route path="/addjobs" element={<AddJobs/>}/>
          <Route path="/MyJobs" element={<MyJobs/>}/>
          <Route path="/updatejob/:jobId" element={<UpdateJob />} />
          <Route path="/RecruiterProfile" element={<RecruiterProfile />}/>
          <Route path="/logout" element={<Logout/>}/>
        </Route>

        <Route path="/" element={<Layout panel={'employee'}/>}>
          <Route path="/employeehome" element={<EmployeeHome/>} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/appliedjobs" element={<AppliedJobs />} />
          <Route path="/employeeprofile" element={<EmployeeProfile/>}/>
          <Route path="/logout" element={<Logout/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
