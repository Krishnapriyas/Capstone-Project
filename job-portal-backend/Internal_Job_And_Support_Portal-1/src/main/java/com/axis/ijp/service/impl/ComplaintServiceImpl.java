package com.axis.ijp.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.ijp.dto.ComplaintDTO;
import com.axis.ijp.entity.Complaint;
import com.axis.ijp.entity.Employee;
import com.axis.ijp.entity.FAQ;
import com.axis.ijp.enums.ComplaintStatus;
import com.axis.ijp.exception.ComplaintNotFoundException;
import com.axis.ijp.exception.EmployeeNotFoundException;
import com.axis.ijp.repository.ComplaintRepository;
import com.axis.ijp.service.ComplaintService;
import com.axis.ijp.service.EmployeeService;
import com.axis.ijp.service.FAQService;

@Service
public class ComplaintServiceImpl implements ComplaintService {

	@Autowired
	private ComplaintRepository complaintRepository;
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private FAQService faqService;
	
	private static final Set<String> STOP_WORDS = new HashSet<>(Arrays.asList("the", "is", "and", "in", "to", "of",
			"it", "for", "with", "on", "at", "am", "I", "have", "has", "had", "will", "here", "do", "you", "my"
	// Add more common stop words as needed
	));

	// ComplaintController
	@Override
	public Complaint submitComplaint(int employeeId, String subject, String description) {
		Employee complainant = employeeService.getEmployeeById(employeeId);
		if (complainant == null) {
			throw new EmployeeNotFoundException("Employee with ID " + employeeId + " not found");
		}

		Complaint complaint = new Complaint();
		complaint.setComplainant(complainant);
		complaint.setSubject(subject);
		complaint.setDescription(description);
		complaint.setComplaintDate(LocalDateTime.now());
		complaint.setComplaintStatus(ComplaintStatus.OPENED);

		return complaintRepository.save(complaint);
	}

	@Override
	public List<Complaint> getComplaintsByEmployee(int employeeId) {
		Employee employee = employeeService.getEmployeeById(employeeId);
		if (employee == null) {
			throw new EmployeeNotFoundException("Employee with ID " + employeeId + " not found");
		}

		return complaintRepository.findByComplainant_EmployeeId(employeeId);
	}

	@Override
	public List<Complaint> getComplaintsByEmployeeName(String employeeName) {
		List<Complaint> complaints = complaintRepository.findByComplainant_FullName(employeeName);
		if (complaints.isEmpty()) {
			throw new ComplaintNotFoundException("No complaints found for employee with name " + employeeName);
		}

		return complaints;
	}

	// SupportAssistantController
	// @Override
	// public List<Complaint> getAllComplaints() {
	// return complaintRepository.findAll();
	// }

	
	@Override
	public List<Complaint> getAllComplaints() {
		return complaintRepository.findAll();
	}
	
	@Override
	public List<ComplaintDTO> getAllComplaintsDto() {
		List<Complaint> complaints = complaintRepository.findAllWithEmployee(); // Fetch complaints with employee info
		return complaints.stream()
				.map(this::convertToDto)
				.collect(Collectors.toList());
	}

	private ComplaintDTO convertToDto(Complaint complaint) {
		ComplaintDTO dto = new ComplaintDTO();
		dto.setComplaintId(complaint.getComplaintId());
		dto.setEmployeeId(complaint.getComplainant().getEmployeeId());
		dto.setSubject(complaint.getSubject());
		dto.setDescription(complaint.getDescription());
		dto.setComplaintDate(complaint.getComplaintDate());
		dto.setComplaintStatus(complaint.getComplaintStatus());
		dto.setComments(complaint.getComments());
		dto.setCommentDates(complaint.getCommentDates());
		return dto;
	}

	
	@Override
	public Complaint updateComplaintStatus(int complaintId, ComplaintStatus status) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null) {
			complaint.setComplaintStatus(status);
			return complaintRepository.save(complaint);
		} else {
			throw new ComplaintNotFoundException("Complaint with ID " + complaintId + " not found");
		}
	}

	@Override
	public Complaint addCommentToComplaint(int complaintId, String comment) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null) {
			complaint.getComments().add(comment);
			complaint.getCommentDates().add(LocalDateTime.now()); // Add the current date and time
			return complaintRepository.save(complaint);
		}
		return null;
	}

	@Override
	public Complaint updateCommentForComplaint(int complaintId, int commentIndex, String updatedComment) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null && commentIndex >= 0 && commentIndex < complaint.getComments().size()) {
			complaint.getComments().set(commentIndex, updatedComment);
			return complaintRepository.save(complaint);
		}
		return null;
	}

	public static String[] extractKeywords(String complaintText) {
		// Use regex to find all words in the complaint text i.e description of complaint
		Pattern pattern = Pattern.compile("\\b\\w+\\b");
		Matcher matcher = pattern.matcher(complaintText.toLowerCase());

		// Store the keywords in a set to remove duplicates and stop words
		Set<String> keywords = new HashSet<>();
		while (matcher.find()) {
			String word = matcher.group();
			if (!STOP_WORDS.contains(word)) {
				keywords.add(word);
			}
		}

		// Convert the set of keywords to an array
		return keywords.toArray(new String[0]);
	}

	@Override
	public Complaint saveSuggestedFaqToComplaint(int complaintId) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		String description = complaint.getDescription();

		// Extract keywords from the complaint description
		String[] keywords = extractKeywords(description);

		// Get suggested FAQs based on keywords
		List<FAQ> suggestedFaqs = faqService.getSuggestedFaq(keywords);

		// Associate suggested FAQs with the complaint, avoiding duplicates
	    Set<FAQ> uniqueSuggestedFaqs = new HashSet<>(suggestedFaqs);
	    complaint.setSuggestedFaqs(new ArrayList<>(uniqueSuggestedFaqs));

	    return complaintRepository.save(complaint);
	}

	@Override
	public List<FAQ> getSuggestedFaqsForComplaint(int complaintId) {
		Complaint complaint = complaintRepository.findById(complaintId).orElse(null);
		if (complaint != null) {
			return complaint.getSuggestedFaqs();
		} else {
			throw new ComplaintNotFoundException("Complaint with ID " + complaintId + " not found");
		}
	}

}
