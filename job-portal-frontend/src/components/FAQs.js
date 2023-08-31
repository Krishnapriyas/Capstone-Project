import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService"; // Adjust this to your job service

const FAQs = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await EmployeeService.getAllFAQs();
                setFaqs(response.data);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            }
        };

        fetchFAQs();
    }, []);

    return (
        <div className="faq-list" >
            <h2 style={{ paddingLeft: "680px", paddingTop: "30px", paddingBottom: "30px", fontSize: "25px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>FAQ SECTION</h2>

            {faqs.map((faq) => (
                <div className="faq-item" key={faq.id} style={{ padding: "20px", fontSize: "20px" }}>
                    <details>
                        <summary>{faq.question}</summary>
                        <p style={{ padding: "45px", fontSize: "20px" }}>{faq.answer}</p>
                    </details>
                </div>
            ))}
        </div>
    );
};

export default FAQs;
