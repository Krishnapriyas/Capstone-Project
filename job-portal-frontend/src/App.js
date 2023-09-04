import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OpenJobList from './components/OpenJobList';
import OpenJobLis from './components/OpenJobList';
import FAQs from './components/FAQs';
import React from 'react';
import RegisterComplaint from './components/RegisterComplaint';
import Login from './components/Login';
import EmployeeTrackComplaints from './components/EmployeeTrackComplaints';
import EmployeeTrackComplaintDetailed from './components/EmployeeTrackComplaintDetailed';
import ManageEmployeeProfile from './components/ManageEmployeeProfile';
import ViewEmployeeProfile from './components/ViewEmployeeProfile';
import AppliedJobView from './components/AppliedJobView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <div id="app-container">
      <BrowserRouter>
        <Navbar />
        <div id="content">
        <ToastContainer position="top-right" autoClose={3000} /> {/* Add the ToastContainer */}

          <Routes>
            <Route path="/openJobs" element={<OpenJobList />} />
            
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/registerComplaint" element={<RegisterComplaint />} />
            <Route path="/login" element={<Login />} />
            <Route path='/trackComplaints' element={<EmployeeTrackComplaints />} />
            <Route path='/complaint/viewMore/:complaintId' element={<EmployeeTrackComplaintDetailed />} />
            <Route path='/updateProfile' element={<ManageEmployeeProfile />} />
            <Route path='/viewProfile' element={<ViewEmployeeProfile />} />
            <Route path='/trackJobApplications' element={<AppliedJobView />} />


          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
