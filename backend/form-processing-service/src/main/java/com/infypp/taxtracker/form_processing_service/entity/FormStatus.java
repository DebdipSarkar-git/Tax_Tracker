package com.infypp.taxtracker.form_processing_service.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "form_status")
public class FormStatus {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	
	@Column(name="user_id", nullable = false)
    private long userId;
	
	@Column(name="financial_year", nullable = false, length=9)
    private String financialYear;
	
	@Column(name="is_submitted", nullable = false)
	private boolean isSubmitted;
 
}
