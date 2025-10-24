package com.infypp.taxtracker.transaction_service.dto;

import java.util.List;

import com.infypp.taxtracker.transaction_service.entity.Transaction;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TransactionResponse {
	private long totalRecords;
    private int pageNumber;
    private int pageSize;
    private List<Transaction> transactions;
}