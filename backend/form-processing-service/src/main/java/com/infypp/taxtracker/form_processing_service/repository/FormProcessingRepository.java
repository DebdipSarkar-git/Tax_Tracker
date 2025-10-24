package com.infypp.taxtracker.form_processing_service.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.infypp.taxtracker.form_processing_service.entity.FormStatus;

public interface FormProcessingRepository extends CrudRepository<FormStatus, Long> {

	Optional<FormStatus> findByUserIdAndFinancialYear(long userId, String financialYear);
	
}
