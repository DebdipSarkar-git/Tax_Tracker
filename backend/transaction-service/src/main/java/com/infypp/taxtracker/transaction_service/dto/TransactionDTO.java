package com.infypp.taxtracker.transaction_service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class TransactionDTO {
	private Long id;
	private Long userId;
    private LocalDate date;
    private BigDecimal amount;
    private BigDecimal taxAmount;
    private String type;
    private String organizationName;
  
}
