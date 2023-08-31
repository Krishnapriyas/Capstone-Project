import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService"; // Import your service for applying to the job


const OpenJobs = ({ jobDetails }) => {
    const navigate = useNavigate();
    const [application, setApplication] = useState([]);
    const [applied, setApplied] = useState(false); // State to track application status


    useEffect(() => {
        // Check if the user has already applied for this job
        const checkApplicationStatus = async () => {
            try {
                const employeeId = localStorage.getItem("employeeId");
                const response = await EmployeeService.getJobApplicationStatus(jobDetails.jobId, employeeId);
                if (response.data === "You have already applied for this job") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                } else if (response.data === "Your job application is in progress") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                }
                else if (response.data === "Your job application has been accepted") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                } else if (response.data === "Your job application has been rejected,You cannot apply for this job") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                }
                else if (response.data === "You have been selected for interview") {
                    setApplied(true);
                    setApplication("You have already applied for this job");
                }
            } catch (error) {
                console.log(error);
            }
        };
        checkApplicationStatus();
    }, [jobDetails.jobId]);

    const applyJob = async (e, jobId) => {

        e.preventDefault();

        try {
            const employeeId = localStorage.getItem('employeeId');
            const response = await EmployeeService.applyForJob(jobId, employeeId); // Call the service to apply for the job
            console.log(response.data);
            setApplication(response.data);
            setApplied(true); // Update application status


        } catch (error) {
            console.log(error);
        }
    };



    return (
        <tr key={jobDetails.jobId} style={{ borderCollapse: "separate", boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.1)" }} >
            <td className="text-left px-6 py-4 whitespace-nowrap" style={{ padding: "30px", fontSize: "20px" }}>
                <div className="text-sm text-gray-500">{jobDetails.jobTitle}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap" style={{ padding: "30px", fontSize: "20px" }}>
                <div className="text-sm text-gray-500">{jobDetails.jobLocation}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap" style={{ padding: "30px", fontSize: "20px" }}>
                <div className="text-sm text-gray-500">{jobDetails.jobDescription}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "30px", fontSize: "20px" }}>
                <div className="text-sm text-gray-500">{jobDetails.department}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "60px", fontSize: "20px" }}>
                <div className="text-sm text-gray-500">{jobDetails.qualification}</div>
            </td>
            <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "150px", fontSize: "20px" }}>
            <div className="text-sm text-gray-500">
        {new Date(jobDetails.applicationDeadline).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        })}
    </div></td>

            <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "100px", fontSize: "20px", color: applied ? (application === "Application submitted successfully" ? "green" : "red") : "inherit" }}>
                {applied ? (
                    <span >{application}</span>
                ) : (
                    <button
                        className="text-white font-bold py-2 px-4 rounded"
                        style={{
                            backgroundColor: "#872746",
                            borderRadius: "0.25rem",
                            color: "white",
                            fontWeight: "bold",
                            padding: "0.5rem 1rem",
                            marginRight: "50px",
                            fontSize: "17px"
                        }}
                        onClick={(e) => applyJob(e, jobDetails.jobId)}
                    >
                        Apply
                    </button>
                )}
            </td>
        </tr>
    );
};

export default OpenJobs;
