package com.axis.ijp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import com.axis.ijp.entity.JobDetails;
import com.axis.ijp.repository.JobDetailsRepository;
import com.axis.ijp.service.JobDetailsService;
import java.util.List;

@Service
public class JobDetailsServiceImpl implements JobDetailsService {

	@Autowired
    private JobDetailsRepository jobDetailsRepository;

    // Create job openings
    @Override
    public JobDetails createJobDetails(JobDetails jobDetails) {
        return jobDetailsRepository.save(jobDetails);
    }

    // Get job postings by Id
    @Override
    public JobDetails getJobDetailsById(int jobId) {
        return jobDetailsRepository.findById(jobId).orElse(null);
    }

    // Get all job postings
    @Override
    public List<JobDetails> getAllJobDetails() {
        return jobDetailsRepository.findAll();
    }

    // Update job posting details
    @Override
    public JobDetails updateJobDetails(int jobId, JobDetails jobDetails) {
        if (jobDetailsRepository.existsById(jobId)) {
            jobDetails.setJobId(jobId);
            return jobDetailsRepository.save(jobDetails);
        }
        return null;
    }

    // Delete job posting
    @Override
    public void deleteJobDetails(int jobId) {
        jobDetailsRepository.deleteById(jobId);
    }
}
