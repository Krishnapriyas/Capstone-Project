import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const ManageEmployeeProfile = () => {
    const { employeeId } = useParams();
    const navigate = useNavigate();
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
        workHistoryList: "",
        skills: "",
        educationDetails: "",
        role: "",

    });

    const [errors, setErrors] = useState({
        emailId: "",
        phoneNo: "",
        fullName: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedEmployee = { ...employee, [name]: value };

        // Email validation
        if (name === "emailId") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, emailId: "Invalid email format" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, emailId: "" }));
            }
        }

        // Phone number validation
        if (name === "phoneNo") {
            const phoneNumberPattern = /^\d{10}$/;
            if (!phoneNumberPattern.test(value)) {
                setErrors((prevErrors) => ({ ...prevErrors, phoneNo: "Invalid phone number format" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, phoneNo: "" }));
            }
        }

        // Full name validation
        if (name === "fullName") {
            if (value.length < 3) {
                setErrors((prevErrors) => ({ ...prevErrors, fullName: "Name must be at least 3 characters" }));
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
            }
        }

        setEmployee(updatedEmployee);
    };

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

    const updateEmployee = (e) => {
        e.preventDefault();
        console.log(employee);
        EmployeeService.updateEmployee(employee.employeeId, employee)
            .then((response) => {
                navigate("/viewProfile");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex max-w-2xl mx-auto shadow border-b" style={{ fontSize: "20px", marginLeft: "55px" }}>
            <div className="px-8 py-8" >
                <div className="font-thin text-2xl tracking-wider" style={{ marginBottom: "65px", marginLeft: "550px" }}>
                    <h1>Manage Profile</h1>
                </div>
                <div className="label-border" style={{paddingLeft:"500px",paddingRight:"200px",fontWeight:"500",fontSize:"25px"}}>

                <div className="items-center justify-center h-14 w-full my-4" >
                    <label className="block text-gray-600 text-sm font-normal">
                        Employee ID
                    </label>
                    <input
                        type="text"
                        name="employeeId"
                        value={employee.employeeId}
                        readOnly // Make the field uneditable
                        className="h-10 w-96 border mt-2 px-2 py-2 bg-gray-100" style={{ fontSize: "20px", background: "grey", marginLeft: "150px", marginBottom: "25px", height: '40px', width: '300px', height: '40px', width: '300px' }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Profile Status
                    </label>
                    <input
                        type="text"
                        name="profileStatus"
                        value={employee.profileStatus}
                        readOnly // Make the field uneditable
                        className="h-10 w-96 border mt-2 px-2 py-2 bg-gray-100" style={{ fontSize: "20px", background: "grey", marginLeft: "150px", marginBottom: "25px", height: '40px', width: '300px' }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={employee.fullName}
                        onChange={(e) => handleChange(e)}
                        className={`h-10 w-96 border mt-2 px-2 py-2 ${errors.fullName ? "border-red-500" : "border-gray-300"
                            }`}
                        style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "180px", marginBottom: "25px" }}
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1" style={{ marginLeft: "250px", color: "red" }}>
                            {errors.fullName}
                        </p>
                    )}
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Email Id
                    </label>
                    <input
                        type="email"
                        name="emailId"
                        value={employee.emailId}
                        onChange={(e) => handleChange(e)}
                        className={`h-10 w-96 border mt-2 px-2 py-2 ${errors.emailId ? "border-red-500" : "border-gray-300"
                            }`}
                        style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "200px", marginBottom: "25px" }}
                    />
                    {errors.emailId && (
                        <p className="text-red-500 text-sm mt-1" style={{ marginLeft: "250px", color: "red" }}>
                            {errors.emailId}
                        </p>
                    )}
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Phone No
                    </label>
                    <input
                        type="tel"
                        name="phoneNo"
                        value={employee.phoneNo}
                        onChange={(e) => handleChange(e)}
                        className={`h-10 w-96 border mt-2 px-2 py-2 ${errors.phoneNo ? "border-red-500" : "border-gray-300"
                            }`}
                        style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "180px", marginBottom: "25px" }}
                    />
                    {errors.phoneNo && (
                        <p className="text-red-500 text-sm mt-1" style={{ marginLeft: "250px", color: "red" }}>
                            {errors.phoneNo}
                        </p>
                    )}
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Gender
                    </label>

                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={employee.gender === "Male"}
                            onChange={(e) => handleChange(e)}
                            className="h-5 w-5 text-blue-500"
                            style={{ marginLeft: "200px", fontSize: "20px", marginBottom: "25px" }}
                        />
                        <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={employee.gender === "Female"}
                            onChange={(e) => handleChange(e)}
                            className="h-5 w-5 text-blue-500"
                            style={{ marginLeft: "20px", fontSize: "20px", marginBottom: "25px" }}
                        />
                        <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center ml-6">
                        <input
                            type="radio"
                            name="gender"
                            value="Other"
                            checked={employee.gender === "Other"}
                            onChange={(e) => handleChange(e)}
                            className="h-5 w-5 text-blue-500"
                            style={{ marginLeft: "20px", fontSize: "20px", marginBottom: "25px" }}
                        />
                        <span className="ml-2">Other</span>
                    </label>

                </div>



                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Date Of Birth
                    </label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={employee.dateOfBirth}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2" style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "145px", marginBottom: "25px" }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={employee.address}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2" style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "200px", marginBottom: "25px" }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Date Of Joining
                    </label>
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={employee.dateOfJoining}
                        readOnly // Make the field uneditable
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2" style={{ background: "grey", height: '40px', width: '300px', fontSize: "20px", marginLeft: "120px", marginBottom: "25px" }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Role
                    </label>
                    <input
                        type="text"
                        name="role"
                        value={employee.role}
                        readOnly // Make the field uneditable
                        className="h-10 w-96 border mt-2 px-2 py-2 bg-gray-100" style={{ height: '40px', width: '300px', fontSize: "20px", background: "grey", marginLeft: "240px", marginBottom: "25px" }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Password
                    </label>
                    <input
                        type="text"
                        name="password"
                        value={employee.password}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2" style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "185px", marginBottom: "25px" }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Work History
                    </label>
                    <input
                        type="text"
                        name="workHistoryList"
                        value={employee.workHistoryList}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2" style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "142px", marginBottom: "25px" }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Skills
                    </label>
                    <input
                        type="text"
                        name="skills"
                        value={employee.skills}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2" style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "230px", marginBottom: "25px" }}></input>
                </div>
                <div className="items-center justify-center h-14 w-full my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                        Education Details
                    </label>
                    <input
                        type="text"
                        name="educationDetails"
                        value={employee.educationDetails}
                        onChange={(e) => handleChange(e)}
                        className="h-10 w-96 border mt-2 px-2 py-2" style={{ height: '40px', width: '300px', fontSize: "20px", marginLeft: "97px", marginBottom: "25px" }}></input>
                </div>
                </div>
                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4" style={{paddingLeft:"500px"}}>
                    <button
                        onClick={updateEmployee}
                        className="text-white font-bold py-2 px-4 rounded" style={{
                            backgroundColor: "#872746",
                            borderRadius: "0.25rem",
                            color: "white",
                            fontWeight: "bold",
                            padding: "0.9rem rem",
                            margin: "100px",
                            width: "90px",
                            height: "50px", marginBottom: "45px",
                            fontSize:"20px"
                        }}>
                        Update
                    </button>
                    <button
                        onClick={() => navigate("/viewProfile")}
                        className="text-white font-bold py-2 px-4 rounded" style={{
                            backgroundColor: "#872746",
                            borderRadius: "0.25rem",
                            color: "white",
                            fontWeight: "bold",
                            padding: "0.5rem 1rem",
                            margin: "100px",
                            width: "90px",
                            height: "50px",
                            fontSize:"20px"
                        }}>
                        Cancel
                    </button>
                </div>
            </div>
    
        </div>
    );
};

export default ManageEmployeeProfile;
