import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService"; // Adjust this to your job service
import { useNavigate } from "react-router-dom";


const AppliedJobView = () => {
    const [loading, setLoading] = useState(true);
    const [jobApplications, setJobApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobApplications, setFilteredJobApplications] = useState([]);
    const [noMatches, setNoMatches] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const employeeId = localStorage.getItem('employeeId'); // Retrieve employee ID from local storage
                console.log(employeeId);
                const response = await EmployeeService.trackJobApplication(employeeId);
                console.log(response.data);
                setJobApplications(response.data);
            } catch (error) {
                setJobApplications([]);
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterJobApplications = () => {
            if (jobApplications && searchTerm.trim() !== "") {
                const filtered = jobApplications.filter(
                    (jobApplication) =>
                        (jobApplication.jobTitle && jobApplication.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (jobApplication.department && jobApplication.department.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setFilteredJobApplications(filtered);
                setNoMatches(filtered.length === 0);
            } else {
                setFilteredJobApplications(jobApplications);
                setNoMatches(false);
            }
        };
        filterJobApplications();
    }, [jobApplications, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const navigate = useNavigate();
    const getTextColorForStatus = (status) => {
        return status === "APPLIED" || status === "IN_PROGRESS" || status === "SELECTED_FOR_INTERVIEW"
            ? "blue"
            : status === "ACCEPTED"
                ? "green"
                : status === "REJECTED" || status === "EXPIRED"
                    ? "red"
                    : "black"; // Default color if status is unknown
    };

    {/*  const viewMore = (e, complaintId) => {
    e.preventDefault();
    navigate(`/complaint/viewMore/${complaintId}`);
  }; */}

    return (
        <div >
            <div style={{ paddingRight: "400px", paddingLeft: "40px" }}>
                <div className="container mx-auto my-8">
                    <h2 style={{ paddingLeft: "580px", paddingTop: "30px", paddingBottom: "30px", fontSize: "25px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>Track Your Applied Jobs !</h2>

                    <div className="h-12" style={{ paddingLeft: "550px", paddingBottom: "45px", }}>

                        <input
                            type="text"
                            placeholder="Search by Job Title or Department"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                width: "400px", fontSize: "23px",
                                padding: "10px",
                                borderRadius: "15px",
                                border: "1px solid #ccc",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                            }}
                        />
                    </div>
                    <div className="flex shadow border-b"  >

                        <table className="min-w-full" style={{ borderCollapse: "collapse", boxShadow: "10px 10px 10px 12px rgba(0,0,0,0.1)" }}>
                            <thead style={{ borderCollapse: "separate", boxShadow: "1px 1px 1px 1px rgba(0,0,0,0.1)" }}>
                                <div className="flex shadow border-b" style={{ marginTop: "30px" }} >
                                    <th style={{ paddingLeft: "25px", paddingRight: "200px", fontSize: "22px", paddingBottom: "25px" }}>Job Title</th>
                                    <th style={{ paddingRight: "180px", fontSize: "22px" }}>Application Date </th>
                                    <th style={{ paddingRight: "280px", fontSize: "22px" }}>Department</th>
                                    <th style={{ paddingRight: "180px", fontSize: "22px" }}>Location</th>
                                    <th style={{ paddingRight: "70px", fontSize: "22px" }}>Application Status</th>

                                </div>
                            </thead>

                            {!loading && (
                                <tbody className="bg-white">
                                    <div className="job-grid" style={{ marginBottom: "200px" }} >
                                        {filteredJobApplications.length === 0 ? (
                                            noMatches ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center", padding: "25px", fontSize: "30px", color: "maroon" }}>
                                                        No matches to your search
                                                    </td>
                                                </tr>
                                            ) : null
                                        ) : (
                                            filteredJobApplications.map((jobApplication) => (
                                                <tr key={jobApplications.applicationId} style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.1)" }}>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingBottom: "40px", paddingLeft: "30px", paddingTop: "25px", fontSize: "20px" }}>
                                                        <div className="text-sm text-gray-500">{jobApplication.jobTitle}</div>
                                                    </td>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "230px", fontSize: "20px" }}>
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(jobApplication.applicationDate).toLocaleDateString()}{" "}
                                                            {new Date(jobApplication.applicationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>

                                                    </td>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "250px", fontSize: "20px" }}>
                                                        <div className="text-sm text-gray-500">{jobApplication.department}</div>
                                                    </td>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "250px", fontSize: "20px" }}>
                                                        <div className="text-sm text-gray-500">{jobApplication.location}</div>
                                                    </td>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "200px", paddingRight: "90px", fontSize: "20px", color: getTextColorForStatus(jobApplication.jobApplicationStatus), fontWeight: "500" }}>
                                                        <div className="text-sm text-gray-500">{jobApplication.jobApplicationStatus}</div>
                                                    </td>

                                                    {/* <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft:"150px",fontSize: "20px" }}>
                          <button
                            className="text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: "#872746",
                            borderRadius: "0.25rem",,
                            color: "white",
                            fontWeight: "bold",
                            padding: "0.5rem 1rem", }}
                            onClick={(e) => viewMore(e, complaint.complaintId)}
                          >
                            View More
                          </button>
                      </td> */}
                                                </tr>
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

export default AppliedJobView;
