import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService"; // Adjust this to your job service
import { useNavigate } from "react-router-dom";


const EmployeeTrackComplaints = () => {
    const [loading, setLoading] = useState(true);
    const [complaints, setComplaints] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredComplaints, setFilteredComplaints] = useState([]);
    const [noMatches, setNoMatches] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const employeeId = localStorage.getItem('employeeId'); // Retrieve employee ID from local storage
                console.log(employeeId);
                const response = await EmployeeService.trackComplaints(employeeId);
                console.log(response.data);
                setComplaints(response.data);
            } catch (error) {
                setComplaints([]);
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterComplaints = () => {
            if (complaints && searchTerm.trim() !== "") {
                const filtered = complaints.filter(
                    (complaint) =>
                        (complaint.complaintStatus && complaint.complaintStatus.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (complaint.subject && complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setFilteredComplaints(filtered);
                setNoMatches(filtered.length === 0);
            } else {
                setFilteredComplaints(complaints);
                setNoMatches(false);
            }
        };
        filterComplaints();
    }, [complaints, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const navigate = useNavigate();

    const viewMore = (e, complaintId) => {
        e.preventDefault();
        navigate(`/complaint/viewMore/${complaintId}`);
    };

    return (
        <div >
            <div >
                <div className="container mx-auto my-8" style={{ marginBottom: "200px" }}>
                    <h2 style={{ paddingLeft: "430px", fontSize: "25px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>TRACK COMPLAINT STATUS</h2>

                    <div className="h-12" style={{ paddingLeft: "400px", paddingBottom: "25px", paddingTop: "25px" }}>

                        <input
                            type="text"
                            placeholder="Search by Complaint Status or Subject"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{
                                width: "400px", fontSize: "23px", borderRadius: "15px",
                                border: "1px solid #ccc",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.5)", textAlign: "center", padding: "10px", marginBottom: "50px"
                            }}
                        />
                    </div>
                    <div className="flex shadow border-b" >

                        <table className="min-w-full" style={{ borderCollapse: "collapse", boxShadow: "10px 10px 10px 12px rgba(0,0,0,0.1)", marginRight: "20px" }}>
                            <thead>
                                <div className="flex shadow border-b"   >
                                    <th style={{ paddingLeft: "25px", paddingRight: "250px", fontSize: "20px", paddingBottom: "25px" }}>COMPALINT SUBJECT</th>
                                    <th style={{ paddingRight: "250px", fontSize: "20px" }}>DATE </th>
                                    <th style={{ paddingRight: "70px", fontSize: "20px" }}>COMPLAINT STATUS</th>

                                </div>
                            </thead>

                            {!loading && (
                                <tbody className="bg-white">
                                    <div className="job-grid"  >
                                        {filteredComplaints.length === 0 ? (
                                            noMatches ? (
                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "center", padding: "25px", fontSize: "30px", color: "maroon" }}>
                                                        No matches to your search
                                                    </td>
                                                </tr>
                                            ) : null
                                        ) : (
                                            filteredComplaints.map((complaint) => (
                                                <tr key={complaints.complaintId}>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingBottom: "25px", paddingLeft: "30px", fontSize: "20px" }}>
                                                        <div className="text-sm text-gray-500">{complaint.subject}</div>
                                                    </td>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "200px", fontSize: "20px" }}>
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(complaint.complaintDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}{" "}
                                                            {new Date(complaint.complaintDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>


                                                    </td>
                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "200px", fontSize: "20px" }}>
                                                        <div className="text-sm text-gray-500">{complaint.complaintStatus}</div>
                                                    </td>

                                                    <td className="text-left px-6 py-4 whitespace-nowrap" style={{ paddingLeft: "150px", fontSize: "20px" }}>
                                                        <button
                                                            className="text-white font-bold py-2 px-4 rounded" style={{
                                                                backgroundColor: "#872746",
                                                                borderRadius: "0.25rem",
                                                                color: "white",
                                                                fontWeight: "bold",
                                                                padding: "0.5rem 1rem",
                                                                marginRight: "25px"
                                                            }}
                                                            onClick={(e) => viewMore(e, complaint.complaintId)}
                                                        >
                                                            View More
                                                        </button>
                                                    </td>
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

export default EmployeeTrackComplaints;
