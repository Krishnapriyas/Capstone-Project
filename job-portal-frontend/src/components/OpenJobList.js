import React, { useEffect, useState } from "react";
import OpenJobs from "./OpenJobs"; // Assuming you have an OpenJobs component
import EmployeeService from "../services/EmployeeService"; // Adjust this to your job service

const OpenJobList = () => {
    const [loading, setLoading] = useState(true);
    const [jobDetails, setJobDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobDetails, setFilteredJobDetails] = useState([]);
    const [noMatches, setNoMatches] = useState(false);
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const employeeId = localStorage.getItem('employeeId');
                const resp = await EmployeeService.getEmployeeById(employeeId);
                setEmployee(resp.data);

                const response = await EmployeeService.getAllOpenJobs();
                setJobDetails(response.data);
            } catch (error) {
                setJobDetails([]);
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterJobDetails = () => {
            if (jobDetails && searchTerm.trim() !== "") {
                const filtered = jobDetails.filter(
                    (jobDetail) =>
                        (jobDetail.jobLocation && jobDetail.jobLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (jobDetail.jobTitle && jobDetail.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setFilteredJobDetails(filtered);
                setNoMatches(filtered.length === 0);
            } else {
                setFilteredJobDetails(jobDetails);
                setNoMatches(false);
            }
        };
        filterJobDetails();
    }, [jobDetails, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div >
            <div >
                <div className="container mx-auto my-8">
                    <h2 style={{ paddingLeft: "350px", paddingBottom: "25px", paddingTop: "25px", fontSize: "40px", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>Welcome Back, {employee.fullName}</h2>
                    <h2 style={{ paddingLeft: "400px", fontSize: "25px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>Find And Apply For Your Jobs Here !</h2>
                    <div className="h-12" style={{ paddingLeft: "430px", paddingBottom: "80px", paddingTop: "25px" }}>

                        <input
                            type="text"
                            placeholder="Search by Job Title or Location"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                width: "400px", fontSize: "20px",
                                padding: "10px",
                                borderRadius: "15px",
                                border: "1px solid #ccc",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                            }}
                        />
                    </div>
                    <div className="flex shadow border-b" >

                        <table className="min-w-full" style={{ borderCollapse: "collapse", boxShadow: "12px 12px 12px 12px rgba(0,0,0,0.1)" }}>
                            <thead style={{ borderCollapse: "separate", boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.1)" }}>
                                <div className="flex shadow border-b" style={{ marginTop: "30px", marginBottom: "20px" }}>
                                    <th style={{ paddingLeft: "25px", paddingRight: "50px", fontSize: "22px" }}>Job Title</th>
                                    <th style={{ paddingRight: "30px", fontSize: "22px" }}>Job Location</th>
                                    <th style={{ paddingRight: "5px", fontSize: "22px" }}>Description</th>
                                    <th style={{ paddingLeft: "50px", fontSize: "22px" }}>Department</th>
                                    <th style={{ paddingLeft: "30px", fontSize: "22px" }}>Qualification</th>
                                    <th style={{ paddingLeft: "50px", fontSize: "22px", marginBottom: "90px" }}>Application DeadLine</th>

                                </div>
                            </thead>

                            {!loading && (
                                <tbody className="bg-white">
                                    <div className="job-grid" style={{ marginBottom: "90px" }}>
                                        {filteredJobDetails.length === 0 ? (
                                            noMatches ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center", padding: "25px", fontSize: "30px", color: "maroon" }}>
                                                        No matches to your search
                                                    </td>
                                                </tr>
                                            ) : null
                                        ) : (
                                            filteredJobDetails.map((jobDetail) => (
                                                <OpenJobs jobDetails={jobDetail} key={jobDetail.jobId} />
                                            ))
                                        )}
                                    </div>
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenJobList;
