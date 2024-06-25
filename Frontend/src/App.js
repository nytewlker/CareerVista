import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import ContactUs from "./components/pages/ContactUs";
import Layout from "./components/Layout/Layout";
import RecruiterLoginForm from "./components/modules/RecruiterLoginForm";
import EmployeeLoginForm from "./components/modules/EmployeeLoginForm";
import RegistrationFrom from "./components/modules/RegistrationForm"






function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>

          <Route index element={<Home/>}/>
          <Route path="/AboutUs" element={<AboutUs/>}/>
          <Route path="/ContactUs" element={<ContactUs/>}/>
          <Route path="/RecruiterLoginForm" element={<RecruiterLoginForm/>}/>
          <Route path="/EmployeeLoginForm" element={<EmployeeLoginForm/>}/>
          <Route path="/RegistrationForm" element={<RegistrationFrom/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
