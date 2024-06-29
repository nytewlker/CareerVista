import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import Layout from "./components/Layout/Layout";
import LoginForm from "./components/modules/LoginForm";
import RegistrationFrom from "./components/modules/RegistrationForm"
import 'bootstrap/dist/css/bootstrap.min.css';
import RecruiterHome from "./components/pages/Recruiter/RecruiterHome";
import EmployeeHome from "./components/pages/Employee/EmployeeHome";








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
          <Route path="/RecruiterHome" element={<RecruiterHome/>} />
        </Route>

        <Route path="/" element={<Layout panel={'employee'}/>}>
        <Route path="/EmployeeHome" element={<EmployeeHome/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
