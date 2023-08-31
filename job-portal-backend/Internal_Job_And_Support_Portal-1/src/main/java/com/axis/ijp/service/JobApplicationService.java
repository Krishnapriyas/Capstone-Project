package com.axis.ijp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.axis.ijp.dto.JobApplicationDTO;
import com.axis.ijp.entity.JobDetails;
import com.axis.ijp.enums.JobApplicationStatus;

@Service
public interface JobApplicationService {

    ResponseEntity<List<JobDetails>> getAllOpenApplications();

    ResponseEntity<String> applyForJob(int jobId, int employeeId);

    ResponseEntity<List<JobApplicationDTO>> getApplicationsByApplicant(int employeeId);
    
	void updateApplicationStatus(int applicationId, JobApplicationStatus newStatus);

	ResponseEntity<String> getJobApplicationStatus(int jobId, int employeeId);


}
