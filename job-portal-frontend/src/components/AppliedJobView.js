import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "./AppliedJobView.css"; 
import { Chart as ChartJS,
ArcElement,
Tooltip,
Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);


const AppliedJobView = () => {
  const [loading, setLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobApplications, setFilteredJobApplications] = useState([]);
  const [noMatches, setNoMatches] = useState(false);
  const [statusFilter, setStatusFilter] = useState("ALL"); // Default filter
  const [sortByDate, setSortByDate] = useState("ASC"); // Default sorting order

  const toggleSortByDate = () => {
    // Toggle sorting order when the button is clicked
    setSortByDate(sortByDate === "ASC" ? "DESC" : "ASC");
  };

  const getTextColorForStatus = (status) => {
    return status === "APPLIED" || status === "IN_PROGRESS" || status === "SELECTED_FOR_INTERVIEW"
      ? "blue"
      : status === "ACCEPTED"
        ? "green"
        : status === "REJECTED" || status === "EXPIRED"
          ? "maroon"
          : "black"; // Default color if status is unknown
  };

  // Calculate the counts for each application status
  const countByStatus = {
    APPLIED: 0,
    IN_PROGRESS: 0,
    SELECTED_FOR_INTERVIEW: 0,
    ACCEPTED: 0,
    REJECTED: 0,
    EXPIRED: 0,
  };

  jobApplications.forEach((jobApplication) => {
    const status = jobApplication.jobApplicationStatus;
    if (status in countByStatus) {
      countByStatus[status]++;
    }
  });

   // Calculate the total number of applications
   const totalApplications = jobApplications.length;


   

  // Create data for the donut chart
  const chartData = {
    labels: Object.keys(countByStatus),
    datasets: [
      {
        data: Object.keys(countByStatus).map((status) => countByStatus[status]),
        backgroundColor: [
          "blue",
          "green",
          "yellow",
          "lime",
          "red",
          "gray",
        ],
      },
    ],
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employeeId = localStorage.getItem("employeeId");
        const response = await EmployeeService.trackJobApplication(employeeId);
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
      let filtered = jobApplications;

      if (searchTerm.trim() !== "") {
        filtered = filtered.filter(
          (jobApplication) =>
            (jobApplication.jobTitle &&
              jobApplication.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (jobApplication.department &&
              jobApplication.department.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      if (statusFilter !== "ALL") {
        filtered = filtered.filter((jobApplication) => jobApplication.jobApplicationStatus === statusFilter);
      }

      setFilteredJobApplications(filtered);
      setNoMatches(filtered.length === 0);
    };
    filterJobApplications();
  }, [jobApplications, searchTerm, statusFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
  };
  const getStatusColors = (status) => {
    switch (status) {
      case "APPLIED":
      case "IN_PROGRESS":
      case "SELECTED_FOR_INTERVIEW":
        return { textColor: "blue", backgroundColor: "lightblue" };
      case "ACCEPTED":
        return { textColor: "green", backgroundColor: "lightgreen" };
      case "REJECTED":
      case "EXPIRED":
        return { textColor: "red", backgroundColor: "#E34234" };
      default:
        return { textColor: "black", backgroundColor: "lightgray" }; // Default color if status is unknown
    }
  };
  
  const getLightColorForStatus = (status) => {
    return getStatusColors(status).backgroundColor;
  };
  

  const renderJobApplications = () => {
    const sortedApplications = [...filteredJobApplications].sort((a, b) => {
      if (sortByDate === "ASC") {
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      } else {
        return new Date(b.applicationDate) - new Date(a.applicationDate);
      }
    });
    return sortedApplications.map((jobApplication) => (
      <div className="job-card-apply" key={jobApplication.applicationId} style={{ backgroundColor: getLightColorForStatus(jobApplication.jobApplicationStatus) }}
      >
        <h3>{jobApplication.jobTitle}</h3>
        <p>Application ID: {jobApplication.applicationId}</p>
        <p>
          Application Date: {new Date(jobApplication.applicationDate).toLocaleDateString()}{' '}
          {new Date(jobApplication.applicationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p>Department: {jobApplication.department}</p>
        <p>Location: {jobApplication.location}</p>
        <p style={{ color: getTextColorForStatus(jobApplication.jobApplicationStatus), fontWeight: "900" }}>
          {jobApplication.jobApplicationStatus}
        </p>
      </div>
    ));
  };

  return (
    <div style={{    border:"1px solid #e0e0e0"}}>
      <p className="header">Track Your Applied Jobs!</p>
      
<div className="search-bar-donut-container">
      <div className="search-bar-apply">
        <input
          type="text"
          placeholder="Search by Job Title or Department"
          value={searchTerm}
          onChange={handleSearch}
          
        />
        
      </div>
      <div className="donut-chart">
        <Doughnut data={chartData} />
      </div>
      </div>

      {/* Status toggle buttons */}
      <div className="toggle-buttons">
        <button
          className={`status-toggle ${statusFilter === "ALL" ? "active" : ""}`}
          onClick={() => handleStatusFilterChange("ALL")}
        >
          ALL
        </button>
        <button
          className={`status-toggle ${statusFilter === "APPLIED" ? "active" : ""}`}
          onClick={() => handleStatusFilterChange("APPLIED")}
        >
          APPLIED
        </button>
        <button
          className={`status-toggle ${statusFilter === "IN_PROGRESS" ? "active" : ""}`}
          onClick={() => handleStatusFilterChange("IN_PROGRESS")}
        >
          IN PROGRESS
        </button>
        <button
          className={`status-toggle ${statusFilter === "SELECTED_FOR_INTERVIEW" ? "active" : ""}`}
          onClick={() => handleStatusFilterChange("SELECTED_FOR_INTERVIEW")}
        >
          SELECTED FOR INTERVIEW
        </button>
        <button
          className={`status-toggle ${statusFilter === "ACCEPTED" ? "active" : ""}`}
          onClick={() => handleStatusFilterChange("ACCEPTED")}
        >
          ACCEPTED
        </button>
        <button
          className={`status-toggle ${statusFilter === "REJECTED" ? "active" : ""}`}
          onClick={() => handleStatusFilterChange("REJECTED")}
        >
          REJECTED
        </button>
        <button
          className={`status-toggle ${statusFilter === "EXPIRED" ? "active" : ""}`}
          onClick={() => handleStatusFilterChange("EXPIRED")}
        >
          EXPIRED
        </button>
      </div>
       {/* Sort by Application Date button */}
       <div className="sort-button-container">
        <button
          className={`sort-button ${sortByDate === "ASC" ? "active" : ""}`}
          onClick={toggleSortByDate}
        >
          Sort by Application Date {sortByDate === "ASC" ? "↑" : "↓"}
        </button>
      </div>

      {/* Render job applications or "No matches found" message */}
      <div className="grid-apply">
        {filteredJobApplications.length === 0 ? (
          <div className="no-matches-message">
            No matches to your search
          </div>
        ) : (
          renderJobApplications()
        )}
      </div>
    </div>
  );
};

export default AppliedJobView;
