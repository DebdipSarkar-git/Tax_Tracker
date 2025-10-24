package com.infypp.taxtracker.form_processing_service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mockStatic;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.springframework.boot.test.context.SpringBootTest;

import com.infypp.taxtracker.form_processing_service.dto.FormProcessingDTO;
import com.infypp.taxtracker.form_processing_service.entity.FormStatus;
import com.infypp.taxtracker.form_processing_service.repository.FormProcessingRepository;
import com.infypp.taxtracker.form_processing_service.service.SubmissionService;

@SpringBootTest
class FormProcessingServiceApplicationTests {

	 	@Mock
	    private FormProcessingRepository formRepo;
	 	
	 	@InjectMocks
	    private SubmissionService submissionService;

	    @Test
	    void testGetStatusByUserId_FormSubmitted() {
	        long userId = 123L;
	        String financialYear = getFinancialYear();
	        FormStatus formStatus = FormStatus.builder()
	                .userId(userId)
	                .financialYear(financialYear)
	                .isSubmitted(true)
	                .build();
	        
	        when(formRepo.findByUserIdAndFinancialYear(userId, financialYear))
	                .thenReturn(Optional.of(formStatus));

	        FormProcessingDTO result = submissionService.getStatusByUserId(userId);

	        assertTrue(result.isSubmitted(), "Form should be marked as submitted");
	    }

	    @Test
	    void testGetStatusByUserId_FormNotSubmitted() {
	        long userId = 123L;
	        String financialYear = getFinancialYear();
	        FormStatus formStatus = FormStatus.builder()
	                .userId(userId)
	                .financialYear(financialYear)
	                .isSubmitted(false)
	                .build();
	        
	        when(formRepo.findByUserIdAndFinancialYear(userId, financialYear))
	                .thenReturn(Optional.of(formStatus));

	        FormProcessingDTO result = submissionService.getStatusByUserId(userId);

	        assertFalse(result.isSubmitted(), "Form should not be marked as submitted");
	    }

	    @Test
	    void testGetStatusByUserId_FormStatusNotFound() {
	        long userId = 123L;
	        String financialYear = getFinancialYear();
	        
	        when(formRepo.findByUserIdAndFinancialYear(userId, financialYear))
	                .thenReturn(Optional.empty());

	        FormProcessingDTO result = submissionService.getStatusByUserId(userId);

	        assertFalse(result.isSubmitted(), "Form should not be marked as submitted when no status exists");
	    }

	    @Test
	    void testSetStatusByUserId_FormStatusExistsAndSetToSubmitted() {
	        long userId = 123L;
	        String financialYear = getFinancialYear();
	        FormStatus formStatus = FormStatus.builder()
	                .userId(userId)
	                .financialYear(financialYear)
	                .isSubmitted(false)
	                .build();
	        
	        when(formRepo.findByUserIdAndFinancialYear(userId, financialYear))
	                .thenReturn(Optional.of(formStatus));

	        String result = submissionService.setStatusByUserId(userId);

	        verify(formRepo, times(1)).save(formStatus);
	        assertTrue(formStatus.isSubmitted(), "Form should be marked as submitted");
	        assertEquals("Form Status set to Submitted Successfully!", result);
	    }

	    @Test
	    void testSetStatusByUserId_FormStatusDoesNotExist() {
	        long userId = 123L;
	        String financialYear = getFinancialYear();
	        
	        when(formRepo.findByUserIdAndFinancialYear(userId, financialYear))
	                .thenReturn(Optional.empty());

	        String result = submissionService.setStatusByUserId(userId);

	        verify(formRepo, times(1)).save(any(FormStatus.class));
	        assertEquals("Form Status set to Submitted Successfully!", result);
	    }
	    
	    @Test
	    void testGetStatusByUserId_AfterMarch() {
	        LocalDate mockDate = LocalDate.of(2025, 4, 1);
	        String expectedFinancialYear = "2025-2026";
	        try (MockedStatic<LocalDate> mockedStatic = mockStatic(LocalDate.class)) {
	            mockedStatic.when(LocalDate::now).thenReturn(mockDate);

	            long userId = 123L;
	            when(formRepo.findByUserIdAndFinancialYear(userId, expectedFinancialYear))
	                    .thenReturn(Optional.empty());

	            FormProcessingDTO result = submissionService.getStatusByUserId(userId);

	            assertFalse(result.isSubmitted(), "Form should not be marked as submitted when no status exists");
	        }
	    }

	    @Test
	    void testGetStatusByUserId_BeforeOrEqualToMarch() {
	        LocalDate mockDate = LocalDate.of(2025, 2, 15);
	        String expectedFinancialYear = "2024-2025";

	        try (MockedStatic<LocalDate> mockedStatic = mockStatic(LocalDate.class)) {
	            mockedStatic.when(LocalDate::now).thenReturn(mockDate);

	            long userId = 123L;
	            when(formRepo.findByUserIdAndFinancialYear(userId, expectedFinancialYear))
	                    .thenReturn(Optional.empty());

	            FormProcessingDTO result = submissionService.getStatusByUserId(userId);

	            assertFalse(result.isSubmitted(), "Form should not be marked as submitted when no status exists");
	        }
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
