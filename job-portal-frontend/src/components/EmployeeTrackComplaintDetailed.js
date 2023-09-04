import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import "./ComplaintDetailed.css"; 
import ProgressBar from "./ProgressBar"; // Import the ProgressBar component


const EmployeeTrackComplaintDetailed = () => {
  const [loading, setLoading] = useState(true);
  const [complaint, setComplaint] = useState([]);
  const navigate = useNavigate();
  const { complaintId } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employeeId = localStorage.getItem("employeeId"); // Retrieve employee ID from local storage
        const response = await EmployeeService.trackComplaints(employeeId);
        const specificComplaint = response.data.find(
          (complaint) => complaint.complaintId === +complaintId
        ); // Find the complaint with the matching complaintId
        setComplaint(specificComplaint);
      } catch (error) {
        setComplaint([]);
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [complaintId]);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="container mx-auto my-8">
            <div >
              <h2 className="header">COMPLAINT DETAILS</h2>
              <div className="progress-bar-row">
                    
                      <ProgressBar complaintStatus={complaint.complaintStatus} />
                    
                  </div>
            </div>
            <div className="details-container">
                
              <table className="details-table">
                <tbody className="bg-white">
                  <div className="job-grid">
                    {complaint ? (
                      <>
                        <tr key={complaint.complaintId} className="complaint-no ">
                          <td>
                            <div className="text-maroon-500 complaint-detail border-style">
                              COMPLAINT NO : {complaint.complaintId}
                            </div>
                          </td>
                          
                        </tr>

                        <tr >
                          <td className="subject">
                            <div className="text-maroon-500 complaint-detail border-style ">
                              SUBJECT : {complaint.subject}
                            </div>
                          </td>
                          <td className="date-of-complaint">
                            <div className="text-maroon-500 complaint-detail border-style">
                              DATE OF COMPLAINT : <br />
                              {new Date(complaint.complaintDate).toLocaleDateString()}{" "}
                              {new Date(complaint.complaintDate).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </td>
                        </tr>


                        <div className="border-style comment-body-container">
                        <tr>
                       
                          <td className="complaint-body ">
                            <div className="text-maroon-500 complaint-detail ">
                              COMPLAINT BODY
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="complaint-body-text">
                            <div className="text-maroon-500 complaint-detail">
                              {complaint.description}
                            </div>
                          </td>
                         
                        </tr>
                        </div>
                       
                      </>
                    ) : (
                      <tr>
                        <td colSpan="2" className="complaint-not-found">
                          Complaint not found
                        </td>
                      </tr>
                    )}
                  </div>
                

              <div className="comments-container border-style comment-body-container">
                <tr>
                  <td className="text-maroon-500 comments-heading ">COMMENTS FROM CUSTOMER SUPPORT</td>
                </tr>
                <tr >
                  <td className="comments-list border-style" >
                    {complaint.comments.map((comment, index) => (
                      <div key={index} className="comments-item"  >
                        <p className="text-maroon-500  comments-date">
                          {new Date(complaint.commentDates[index]).toLocaleString("en-GB", {
                            year: "2-digit",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                        <p className="text-maroon-500 comments-text"  >{comment}</p>
                      </div>
                    ))}
                  </td>
                </tr>
              </div>
              </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={() => navigate("/trackComplaints")}
        className="goBack-button"
      >
        Go Back
      </button>
    </div>
  );
};

export default EmployeeTrackComplaintDetailed;
