package com.axis.ijp.controller;

import com.axis.ijp.dto.ComplaintDTO;

import com.axis.ijp.entity.Complaint;
import com.axis.ijp.entity.FAQ;
import com.axis.ijp.service.ComplaintService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

	@Autowired
    private ComplaintService complaintService;

    /**
     * Submit a new complaint.
     * Author: Pallavi Bolar
     */
	/*
	 * @PostMapping("/submit/{employeeId}") public ResponseEntity<Complaint>
	 * submitComplaint(@PathVariable int employeeId, @RequestBody ComplaintDTO
	 * complaint) { Complaint newComplaint =
	 * complaintService.submitComplaint(employeeId, complaint.getSubject(),
	 * complaint.getDescription()); Complaint submittedComplaint =
	 * complaintService.saveSuggestedFaqToComplaint(newComplaint.getComplaintId());
	 * return ResponseEntity.ok(submittedComplaint); }
	 */
    
    @PostMapping("/submits/{employeeId}")
    public ResponseEntity<?> submitComplaints(@PathVariable int employeeId, @RequestBody ComplaintDTO complaint) {
        String subject = complaint.getSubject();
        String description = complaint.getDescription();
        
        if (subject == null || subject.trim().isEmpty() || description == null || description.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Please enter subject and description");
        }

        Complaint newComplaint = complaintService.submitComplaint(employeeId, subject, description);
        Complaint submittedComplaint = complaintService.saveSuggestedFaqToComplaint(newComplaint.getComplaintId());
        return ResponseEntity.ok(submittedComplaint);
    }


    /**
     * Get complaints by employee ID.
     * Author: Pallavi Bolar
     */
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Complaint>> getComplaintsByEmployee(@PathVariable int employeeId) {
        List<Complaint> complaints = complaintService.getComplaintsByEmployee(employeeId);
        return ResponseEntity.ok(complaints);
    }

    /**
     * Get complaints by employee name.
     * Author: Pallavi Bolar
     */
    @GetMapping("/employeeByName/{employeeName}")
    public ResponseEntity<List<Complaint>> getComplaintsByEmployeeName(@PathVariable String employeeName) {
        List<Complaint> complaints = complaintService.getComplaintsByEmployeeName(employeeName);
        return ResponseEntity.ok(complaints);
    }

    /**
     * Get suggested FAQs for a complaint.
     * Author: Krishnapriya S
     */
    @GetMapping("/suggestedFaqs/{complaintId}")
    public List<FAQ> getSuggestedFaqs(@PathVariable int complaintId) {
        return complaintService.getSuggestedFaqsForComplaint(complaintId);
    }
}
