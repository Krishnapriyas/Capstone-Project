package com.axis.ijp.enums;

public enum EmployeeRole {
	HR("HR"),
    CUSTOMER_SUPPORT("Customer Support"),
    CANDIDATE("Candidate");

    private String displayName;


	EmployeeRole(String string) {
		// TODO Auto-generated constructor stub
	}

	public String getDisplayName(String displayName) {
		return this.displayName;
	}
	
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
}
