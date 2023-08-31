import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import EmployeeService from "../services/EmployeeService";

const Login = () => {
    const navigate = useNavigate();
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailIdChange = (e) => {
        setEmailId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const login = async () => {
        const employee = {
            emailId: emailId,
            password: password
        };

        try {
            const response = await EmployeeService.login(employee);
            console.log(response);

            if (response.status === 200) {
                // User logged in successfully, navigate to the desired route

                if (employee.emailId === "admin@admin.com" && employee.password === "admin") {
                    navigate('/openJobs');
                } else {
                    const { employeeId } = response.data; // Extract employeeId from the response

                    // Store employeeId in local storage
                    localStorage.setItem('employeeId', employeeId);

                    console.log(employeeId);
                    // If it is a user, navigate to user homepage
                    navigate('/openJobs');
                }
            } else {
                // Login failed, display error message
                setError('Invalid user mailId or password');
            }
        } catch (error) {
            console.log(error);
            setError('Invalid user mailId or password');
        }
    };





    const handleLogin = (e) => {
        e.preventDefault();
        login();
    };



    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <label>Email Id</label>
                    <input type="text" value={emailId} onChange={handleEmailIdChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" style={{ marginBottom: '10px' }}>Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
