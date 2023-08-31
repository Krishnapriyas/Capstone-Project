import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const RegisterComplaint = () => {
    const [complaint, setComplaint] = useState({

        complaintId: "",
        subject: "",
        description: "",


    });
    const [promptMessage, setPromptMessage] = useState(""); // State to hold prompt message
    const [suggestedFaqs, setSuggestedFaqs] = useState([]); // State for suggested FAQs



    const navigate = useNavigate();

    // Retrieve employeeId from local storage
    const employeeId = localStorage.getItem("employeeId");

    const handleChange = (e) => {
        const value = e.target.value;
        setComplaint({ ...complaint, [e.target.name]: value });
    };

    const saveComplaint = async (e) => {
        e.preventDefault();
        const employeeId = localStorage.getItem('employeeId'); // Retrieve employee ID from local storage
        console.log(employeeId);

        // Validate complaint data
        if (!complaint.subject || !complaint.description) {
            setPromptMessage("Please enter subject and description!");
            return; // Don't proceed with the API call if validation fails
        }


        try {
            const employeeId = localStorage.getItem("employeeId");
            const response = await EmployeeService.registerComplaint(employeeId, complaint);

            const suggestedFaqsResponse = await EmployeeService.getSuggetedFaqs(response.data.complaintId);
            const suggestedFaqs = suggestedFaqsResponse.data;

            setComplaint({
                complaintId: "",
                subject: "",
                description: "",
            });
            setSuggestedFaqs(suggestedFaqs); // Set suggested FAQs
            setPromptMessage("Complaint submitted successfully.");
        } catch (error) {
            console.log(error);
        }
    };

    const reset = (e) => {
        e.preventDefault();
        setComplaint({
            complaintId: "",
            subject: "",
            description: "",


        });
        setPromptMessage("");
        setSuggestedFaqs([]);
    };

    return (
        <form>
            <div className="flex max-w-2xl mx-auto shadow border-b">
                <div className="px-8 py-8">
                    <h2 style={{ paddingLeft: "700px", fontSize: "25px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>Have Queries ?</h2>
                    <h2 style={{ paddingLeft: "500px", fontSize: "25px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>Submit Any Issues You Face, We Will Get Back To You Shortly</h2>


                    <div className="items-center justify-center h-14 w-full my-4" style={{ paddingTop: "80px", display: "flex", flexDirection: "column",marginLeft:"450px",marginRight:"350px" }}>
                        <label className="block text-gray-600 text-sm font-normal" style={{
                            fontSize: "25px", textAlign: "center", padding: "10px", borderRadius: "15px", border: "1px solid #ccc", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", fontWeight: "600",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)"
                        }}>
                            SUBJECT
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={complaint.subject}
                            required
                            onChange={(e) => handleChange(e)}
                            className="h-10 w-96 border mt-2 px-2 py-2" style={{
                                width: "776px", height: "50px", fontSize: "20px", padding: "10px",
                                borderRadius: "15px",
                                border: "1px solid #ccc",
                                boxShadow: "0 4px 6px rgba(0,0,0,0.2)", textAlign: "center",
                                marginRight:"350px" 
                            }}
                            placeholder="Enter Complaint Subject Here"></input>
                    </div>
                    <div className="items-center justify-center h-14 w-full my-4" style={{ paddingTop: "80px", display: "flex", flexDirection: "column",marginLeft:"450px",marginRight:"350px"  }}>
                        <label className="block text-gray-600 text-sm font-normal" style={{
                            fontSize: "25px", textAlign: "center", padding: "10px", borderRadius: "15px", border: "1px solid #ccc",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", fontWeight: "500",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
                        }}>
                            DESCRIPTION
                        </label>
                        <textarea
                            name="description"
                            value={complaint.description}
                            onChange={(e) => handleChange(e)}
                            required
                            className="h-80 w-96 border mt-2 px-2 py-2"
                            style={{
                                width: "776px",
                                height: "200px",
                                fontSize: "20px",
                                padding: "10px",
                                borderRadius: "15px",
                                border: "1px solid #ccc",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                                textAlign: "center",
                            }}
                            placeholder="Enter Your Complaint Description Here"
                        />
                    </div>


                    <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4" >
                        <button
                            type="button"
                            onClick={saveComplaint}
                            className="text-white font-bold py-2 px-4 rounded" style={{
                                backgroundColor: "#872746",
                                borderRadius: "0.25rem",
                                color: "white",
                                fontWeight: "bold",
                                padding: "0.5rem 1rem", marginLeft: "650px", marginTop: "50px", fontSize: "20px",
                            }}>
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            className="text-white font-bold py-2 px-4 rounded" style={{
                                backgroundColor: "#872746",
                                borderRadius: "0.25rem",
                                color: "white",
                                fontWeight: "bold",
                                padding: "0.5rem 1rem", marginLeft: "100px", marginTop: "50px", fontSize: "20px", marginBottom: "80px"
                            }}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <div className={`text-${promptMessage.includes("successfully") ? "green" : "red"}-600 mt-2`} style={{ marginBottom: "100px", textAlign: "center", fontSize: "20px", color: promptMessage.includes("successfully") ? "green" : "red" }}>
                {promptMessage}
                {/* Display suggested FAQs */}
                {suggestedFaqs.length > 0 && (
                    <div style={{ color: "black", marginTop: "25px" }}>
                        <h3>Suggested FAQs:</h3>
                        {suggestedFaqs.map((faq) => (
                            <div className="faq-item" key={faq.id} style={{ padding: "20px", fontSize: "20px" }}>
                                <details>
                                    <summary>{faq.question}</summary>
                                    <p style={{ padding: "45px", fontSize: "20px" }}>{faq.answer}</p>
                                </details>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </form>
    );
};

export default RegisterComplaint;
