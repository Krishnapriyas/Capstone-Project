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
                navigate("/updateProfile");
            })
            .catch((error) => {
                console.log(error);
            });
    };


    return (
        <div className="flex max-w-2xl mx-auto shadow border-b" >
            <div className="px-8 py-8">
                <div className="font-thin text-2xl tracking-wider">
                    <h1 style={{ paddingLeft: "750px", marginTop: "40px", fontSize: "30px", paddingBottom: "10px" }}>Hi , {employee.fullName} </h1>
                    <h1 style={{ paddingLeft: "780px", fontSize: "30px", paddingBottom: "40px" }}>Profile Details </h1>

                </div>
                <div className="items-center justify-center h-14 w-full my-4" >
                    <form  >
                        <div className="grid grid-cols-2 gap-4" style={{ paddingLeft: "550px",paddingRight:"400px",fontWeight:"500" }}>
                        <div className="label-border">
                            <div style={{ paddingBottom: "50px", paddingTop: "50px" }}>
                            
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "150px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px",
                                    padding: "10px",
                                    
                                }}>PROFILE STATUS <span style={{ display: "inline-block", width: "6em" }}></span> {employee.profileStatus}</label>
                            </div>
                            
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "100px", paddingTop: "20px", paddingLeft: "10px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>EMPLOYEE ID <span style={{ display: "inline-block", width: "7em" }}></span> {employee.employeeId}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "130px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>FULL NAME <span style={{ display: "inline-block", width: "8em" }}></span> {employee.fullName}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "10px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>EMAIL ID <span style={{ display: "inline-block", width: "9.2em" }}></span>{employee.emailId}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "144px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>PHONE NO <span style={{ display: "inline-block", width: "7.83em" }}></span> {employee.phoneNo}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "196px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>GENDER <span style={{ display: "inline-block", width: "9.2em" }}></span> {employee.gender}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "162px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>DATE OF BIRTH <span style={{ display: "inline-block", width: "6.3em" }}></span> {employee.dateOfBirth}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "184px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>ADDRESS <span style={{ display: "inline-block", width: "9em" }}></span> {employee.address}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "156px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                   
                                }}>DATE OF JOINING <span style={{ display: "inline-block", width: "5.2em" }}></span> {employee.dateOfJoining}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "150px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>ROLE <span style={{ display: "inline-block", width: "10.8em" }}></span> {employee.role}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "182px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>PASSWORD <span style={{ display: "inline-block", width: "8.3em" }}></span>{employee.password}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "266px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>WORK HISTORY <span style={{ display: "inline-block", width: "6em" }}></span>{employee.workHistoryList}</label>
                            </div>
                            <div style={{ paddingBottom: "50px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "60px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>SKILLS<span style={{ display: "inline-block", width: "6em", marginRight: "300px" }}></span> {employee.skills}</label>
                            </div>
                            <div style={{ paddingBottom: "80px" }}>
                                <label className="block text-sm font-medium text-gray-600" style={{
                                    paddingRight: "234px", paddingTop: "20px", paddingLeft: "30px", fontSize: "20px", paddingBottom: "30px",
                                    padding: "10px",
                                    
                                }}>EDUCATION DETAILS<span style={{
                                    display: "inline-block", width: "6em"
                                }}></span> {employee.educationDetails}</label>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
                    <button
                        onClick={updateEmployee}
                        className="text-white font-bold py-2 px-4 rounded" style={{
                            backgroundColor: "#872746",
                            borderRadius: "0.25rem",
                            color: "white",
                            fontWeight: "bold",
                            padding: "0.5rem 1rem",
                            marginLeft: "800px",
                            marginBottom: "100px",
                            marginTop: "50px",
                            width: "120px",
                            height: "70px",
                            fontSize: "20px"
                        }}>
                        Update
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ManageEmployeeProfile;
