package com.infypp.taxtracker.form_processing_service.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.infypp.taxtracker.form_processing_service.dto.FormProcessingDTO;
import com.infypp.taxtracker.form_processing_service.entity.FormStatus;
import com.infypp.taxtracker.form_processing_service.repository.FormProcessingRepository;


@Service
public class SubmissionService {
	
	private FormProcessingRepository formRepo;
	
	public SubmissionService(FormProcessingRepository formRepo) {
        this.formRepo = formRepo;
    }

	public FormProcessingDTO getStatusByUserId(long userId) {
		String financialYear = this.getFinancialYear();
		Optional<FormStatus> formStatus = formRepo.findByUserIdAndFinancialYear(userId, financialYear);
		boolean isSubmitted = formStatus.isPresent() && formStatus.get().isSubmitted();
		return new FormProcessingDTO(isSubmitted);
	}

	public String setStatusByUserId(Long id) {
		String financialYear = this.getFinancialYear();
		Optional<FormStatus> formStatus = formRepo.findByUserIdAndFinancialYear(id, financialYear);
		if(formStatus.isPresent()) {
			var resp = formStatus.get();
			resp.setSubmitted(true);
			formRepo.save(resp);
		} else {
			formRepo.save(FormStatus.builder()
			.financialYear(financialYear)
			.userId(id)
			.isSubmitted(true)
			.build());
		}
		
		return "Form Status set to Submitted Successfully!";
	}
	
	private String getFinancialYear() {
        LocalDate today = LocalDate.now();
        String financialYear;
        if (today.getMonthValue() > 3) {
            financialYear = "" + today.getYear() + "-" + (today.getYear() + 1);
        } else {
            financialYear = "" + (today.getYear() - 1) + "-" + (today.getYear());
        }
        return financialYear;
    }

	
}
