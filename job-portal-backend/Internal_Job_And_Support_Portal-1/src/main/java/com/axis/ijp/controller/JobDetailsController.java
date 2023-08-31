package com.axis.ijp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.ijp.entity.JobDetails;
import com.axis.ijp.service.JobDetailsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/job-details")
public class JobDetailsController {

	@Autowired
    private JobDetailsService jobDetailsService;

    /**
     * Create Job Details.
     * Author: Utkarsha Bhosale
     */
  	@PostMapping("/createJobDetails")
  	public ResponseEntity<JobDetails> createJobDetails(@RequestBody JobDetails jobDetails) {
  		JobDetails createdJobDetails = jobDetailsService.createJobDetails(jobDetails);
  		return new ResponseEntity<>(createdJobDetails, HttpStatus.CREATED);
  	}

    /**
     * View all Job Details.
     * Author: Utkarsha Bhosale
     */
  	@GetMapping("/viewAllJobDetails")
  	public ResponseEntity<List<JobDetails>> getAllJobDetails() {
  		List<JobDetails> jobDetailsList = jobDetailsService.getAllJobDetails();
  		return new ResponseEntity<>(jobDetailsList, HttpStatus.OK);
  	}

    /**
     * View Job by ID.
     * Author: Utkarsha Bhosale
     */
  	@GetMapping("/viewJobsById/{jobId}")
  	public ResponseEntity<JobDetails> getJobDetailsById(@PathVariable int jobId) {
  	    JobDetails jobDetails = jobDetailsService.getJobDetailsById(jobId);
  	    if (jobDetails != null) {
  	        return new ResponseEntity<>(jobDetails, HttpStatus.OK);
  	    } else {
  	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  	    }
  	}

    /**
     * Update Job Details.
     * Author: Utkarsha Bhosale
     */
  	@PutMapping("/updateJobDetails/{jobId}")
  	public ResponseEntity<JobDetails> updateJobDetails(@PathVariable int jobId, @RequestBody JobDetails jobDetails) {
  		JobDetails updatedJobDetails = jobDetailsService.updateJobDetails(jobId, jobDetails);
  		return new ResponseEntity<>(updatedJobDetails, HttpStatus.OK);
  	}

    /**
     * Delete Job Details.
     * Author: Utkarsha Bhosale
     */
  	@DeleteMapping("/{jobId}")
  	public ResponseEntity<Void> deleteJobDetails(@PathVariable int jobId) {
  		jobDetailsService.deleteJobDetails(jobId);
  		return new ResponseEntity<>(HttpStatus.OK);
  	}
}
