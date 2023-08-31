package com.axis.ijp.repository;

import com.axis.ijp.entity.Complaint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Integer> {
	@Query("SELECT c FROM Complaint c JOIN FETCH c.complainant")
	List<Complaint> findAllWithEmployee();

	// ComplaintServiceImpl
	List<Complaint> findByComplainant_EmployeeId(int employeeId);

	List<Complaint> findByComplainant_FullName(String employeeName);
}
