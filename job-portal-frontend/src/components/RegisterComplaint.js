import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import FAQPopup from "./FAQPopup";
import './RegisterComplaint.css';
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";


const RegisterComplaint = () => {
    const [complaint, setComplaint] = useState({

        complaintId: "",
        subject: "",
        description: "",


    });
    const [promptMessage, setPromptMessage] = useState(""); // State to hold prompt message
    const [suggestedFaqs, setSuggestedFaqs] = useState([]); // State for suggested FAQs

    const [showFAQPopup, setShowFAQPopup] = useState(false);

    const toggleFAQPopup = () => {
      setShowFAQPopup(!showFAQPopup);
    };
  



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
            toast.error("Enter subject and description", {
              position: "top-right",
              autoClose: 3000,
            });
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
            toast.success("Complaint submitted successfully", {
              position: "top-right",
              autoClose: 3000,
            });
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
        
            <div className="flex max-w-2xl mx-auto shadow border-b " style={{border:"1px solid #e0e0e0",background: "#f9f9f9",marginBottom:"150px"}}>
                <div >
                    <h2 className="header-complaint">Have Queries ?</h2>
                    <h2 className="header-complaint">Submit Any Issues You Face, We Will Get Back To You Shortly</h2>
                    <form className="form-group">
        <div >
          <label className="subject">
          Subject</label>
          <input
            type="text"
            name="subject"
            value={complaint.subject}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="Enter Complaint Subject"
            required
          />
        </div>
        <div>
          <label className="description">
          Description</label>
          <textarea
            name="description"
            value={complaint.description}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="Enter Complaint Description"
            required
            style={{height:"150px"}}
          />
        </div>
        <div className="text-center">
          <button
            type="button"
            onClick={saveComplaint}
            className="button-style"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={reset}
            className="button-style"
          >
            Clear
          </button>
                    </div>
                    </form>
                    

            <div className={`text-${promptMessage.includes("successfully") ? "green" : "red"}-600 mt-2 complaint-prompt`}
             style={{ paddingTop:"30px",
            color: promptMessage.includes("successfully") ? "green" : "red" }}>
                {promptMessage}
                <div>
                <button onClick={toggleFAQPopup} className="button-style-suggested">Show Suggested FAQs</button>

      {showFAQPopup && <FAQPopup onClose={toggleFAQPopup} suggestedFaqs={suggestedFaqs} />}
      </div>
            </div>
       
        </div>
        </div>
    );
};

export default RegisterComplaint;





  
