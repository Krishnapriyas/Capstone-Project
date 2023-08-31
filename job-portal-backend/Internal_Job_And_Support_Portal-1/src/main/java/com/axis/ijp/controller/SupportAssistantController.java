package com.axis.ijp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.axis.ijp.entity.Complaint;
import com.axis.ijp.enums.ComplaintStatus;
import com.axis.ijp.service.ComplaintService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/support-assistant")
public class SupportAssistantController {

	@Autowired
    private ComplaintService complaintService;

    /**
     * Get all complaints (accessible by support assistant)
     * Author: Pallavi Bolar
     */
    @GetMapping("/complaints")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        List<Complaint> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }

    /**
     * Update complaint status (accessible by support assistant)
     * Author: Pallavi Bolar
     */
    @PutMapping("/complaints/{complaintId}/update-status")
    public ResponseEntity<Complaint> updateComplaintStatus(@PathVariable int complaintId,
                                                           @RequestParam ComplaintStatus status) {
        Complaint updatedComplaint = complaintService.updateComplaintStatus(complaintId, status);
        return ResponseEntity.ok(updatedComplaint);
    }

    /**
     * Add a comment to a complaint (accessible by support assistant)
     * Author: Pallavi Bolar
     */
    @PutMapping("/complaints/{complaintId}/add-comment")
    public ResponseEntity<Complaint> addCommentToComplaint(@PathVariable int complaintId,
                                                           @RequestParam String comment) {
        Complaint updatedComplaint = complaintService.addCommentToComplaint(complaintId, comment);
        return ResponseEntity.ok(updatedComplaint);
    }

    /**
     * Update a comment for a complaint (accessible by support assistant)
     * Author: Pallavi Bolar
     */
    @PutMapping("/complaints/{complaintId}/update-comment/{commentIndex}")
    public ResponseEntity<Complaint> updateCommentForComplaint(@PathVariable int complaintId,
                                                               @PathVariable int commentIndex,
                                                               @RequestParam String updatedComment) {
        Complaint updatedComplaint = complaintService.updateCommentForComplaint(complaintId, commentIndex,
                updatedComment);
        if (updatedComplaint != null) {
            return ResponseEntity.ok(updatedComplaint);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
