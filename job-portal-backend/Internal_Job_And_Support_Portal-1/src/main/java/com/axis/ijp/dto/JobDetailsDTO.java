package com.axis.ijp.dto;

import java.time.LocalDate;

public class JobDetailsDTO {

    private int jobId;
    private String jobTitle;
    private String jobDescription;
    private String department;
    private String location;
    private LocalDate applicationDeadLine;
    
	public JobDetailsDTO() {
		super();
	}
	public JobDetailsDTO(int jobId, String jobTitle, String jobDescription, String department, String location,
			LocalDate applicationDeadLine) {
		super();
		this.jobId = jobId;
		this.jobTitle = jobTitle;
		this.jobDescription = jobDescription;
		this.department = department;
		this.location = location;
		this.applicationDeadLine = applicationDeadLine;
	}
	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public LocalDate getApplicationDeadLine() {
		return applicationDeadLine;
	}
	public void setApplicationDeadLine(LocalDate applicationDeadLine) {
		this.applicationDeadLine = applicationDeadLine;
	}
}

