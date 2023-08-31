import React from "react";
import "./Navbar.css";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        <div className="logo">
          <img src="./brand-name.png" alt="Logo" />
          {/*<h2>
            <span>E</span>mployee
            <span>D</span>ash
            <span>B</span>oard
  </h2> */}
        </div>
        <div className="menu-link">
          <ul>
            <li>
              <a href="/openJobs">Find Jobs</a>
            </li>
            <li>
              <a href="/trackJobApplications">Track Applied Jobs</a>
            </li>
            <li>
              <a href="/registerComplaint">Register Complaint</a>
            </li>

            <li>
              <a href="/trackComplaints">Track Complaints</a>
            </li>

            <li>
              <a href="/faqs">FAQ's</a>
            </li>

            <li>
              <ProfileDropdown />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
