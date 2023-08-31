import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService"; // Adjust this to your job service
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const EmployeeTrackComplaintDetailed = () => {
    const [loading, setLoading] = useState(true);
    const [complaint, setComplaint] = useState([]);

    const { complaintId } = useParams(); // Get the complaintId from the route parameter


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const employeeId = localStorage.getItem('employeeId'); // Retrieve employee ID from local storage
                console.log(employeeId);
                const response = await EmployeeService.trackComplaints(employeeId);
                console.log(response.data);
                const specificComplaint = response.data.find(
                    (complaint) => complaint.complaintId === +complaintId
                ); // Find the complaint with the matching complaintId
                setComplaint(specificComplaint);
                //console.log(specificComplaint.comments);
            } catch (error) {
                setComplaint([]);
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [complaintId]);






    return (
        <div >
            <div >
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="container mx-auto my-8">
                        <div className="flex shadow border-b">
                            <h2 style={{ paddingLeft: "450px", paddingTop: "30px", fontSize: "25px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>COMPLAINT DETAILS</h2>
                        </div>
                        <div className="flex shadow border-b" style={{ marginTop: "20px", padding: "20px", borderRadius: "15px", border: "1px solid #ccc", boxShadow: "0 4px 6px rgba(0,0,0,0.2)" }}>



                            <table className="min-w-full">

                                <tbody className="bg-white">
                                    <div className="job-grid">
                                        {complaint ? (

                                            <>
                                                <div style={{
                                                    marginRight: "35px"
                                                }}><tr key={complaint.complaintId}>

                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingTop: "50px", paddingLeft: "30px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500" }} >COMPLAINT NO&nbsp; : &nbsp;{complaint.complaintId} </div>
                                                        </td>

                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "500px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500", marginRight: "25px" }}>COMPLAINT STATUS&nbsp; : &nbsp; {complaint.complaintStatus} </div>
                                                        </td>
                                                    </tr>
                                                    <tr>


                                                    </tr>

                                                    <tr>
                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingTop: "50px", paddingLeft: "30px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500" }}>SUBJECT  &nbsp; : &nbsp; {complaint.subject} </div>
                                                        </td>
                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "500px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500", marginRight: "25px" }}>DATE OF COMPLAINT&nbsp; : &nbsp; <br />{new Date(complaint.complaintDate).toLocaleDateString()}{" "}
                                                                {new Date(complaint.complaintDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                        </td>
                                                    </tr>
                                                    <tr>

                                                    </tr>
                                                    <tr>
                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingTop: "50px", paddingLeft: "30px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500" }}>COMPLAINT BODY </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingTop: "15px", paddingLeft: "30px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500", marginBottom: "25px" }}>{complaint.description}</div>
                                                        </td>
                                                    </tr>
                                                </div>

                                                <div style={{
                                                    width: "100%"
                                                }}>
                                                    <tr>
                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingTop: "65px", paddingLeft: "30px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{ borderCollapse: "separate", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500" }}>COMMENTS FROM CUSTOMER SUPPORT </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingTop: "25px", paddingLeft: "30px", fontSize: "20px" }}>
                                                            <div className="text-sm text-gray-500" style={{
                                                                borderCollapse: "separate", marginBottom: "100px", boxShadow: "1px 1px  1px 1px   rgba(0,0,0,0.7)", padding: "10px", fontWeight: "500",
                                                                paddingRight: "100px"
                                                            }} >
                                                                {complaint.comments.map((comment, index) => (

                                                                    <div key={index} style={{
                                                                        marginBottom: "60px", padding: "10px", fontWeight: "500",
                                                                    }}>
                                                                        <p style={{ marginLeft: "150px", marginRight: "320px", fontSize: "18px", fontWeight: "normal" }}>
                                                                            {new Date(complaint.commentDates[index]).toLocaleString('en-GB', {
                                                                                year: '2-digit',
                                                                                month: '2-digit',
                                                                                day: '2-digit',
                                                                                hour: '2-digit',
                                                                                minute: '2-digit',
                                                                                hour12: true

                                                                            })}
                                                                        </p>
                                                                        <p style={{ marginLeft: "150px", marginRight: "320px", fontSize: "25px" }}>{comment} </p>

                                                                    </div>
                                                                ))}

                                                            </div>
                                                        </td>
                                                    </tr>
                                                </div>
                                            </>
                                        ) : (
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: "center", padding: "25px", fontSize: "30px", color: "maroon" }}>
                                                    Complaint not found
                                                </td>
                                            </tr>
                                        )}</div>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeTrackComplaintDetailed;
