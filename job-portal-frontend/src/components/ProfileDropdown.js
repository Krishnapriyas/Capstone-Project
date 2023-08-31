import React, { useEffect, useState } from 'react';
import './ProfileDropdown.css'; // Create a CSS file for styling
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState({
    employeeId: "",
    fullName: "",
    emailId: "",
    phoneNo: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    dateOfJoining: "",
    password: "",
    profileStatus: "",
    //workHistoryList
    //skills
    //educationDetails

  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeId = localStorage.getItem('employeeId'); // Retrieve employee ID from local storage

        console.log("Fetching employee with id:", employeeId);

        const response = await EmployeeService.getEmployeeById(employeeId);
        console.log("Fetched employee data:", response.data);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [employeeId]);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-icon" onClick={toggleDropdown}>
        <img src="../profile-icon-5.png" alt="Profile Icon" className="icon" />

        {/* <span className="icon">&#128100;</span> {/* Unicode for profile icon */}
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <ul className='name' >
            <li >{employee.fullName}</li>
            <li>ID : {employee.employeeId}</li>
          </ul>
          <ul>

            <li>
              <a href="/viewProfile">Manage Profile</a></li>
          </ul>
          <ul>
            <li>
              <a href="/home">Logout</a></li>

          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
