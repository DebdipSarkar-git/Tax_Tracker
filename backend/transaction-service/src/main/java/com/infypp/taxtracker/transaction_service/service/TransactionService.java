package com.infypp.taxtracker.transaction_service.service;

import java.util.List;

import com.infypp.taxtracker.transaction_service.dto.TransactionDTO;
import com.infypp.taxtracker.transaction_service.dto.TransactionResponse;
import com.infypp.taxtracker.transaction_service.exception.TransactionException;

public interface TransactionService {
    TransactionResponse getTransactions(int pageNumber, int pageSize, String financialYear, String month, boolean allMonths);
    List<TransactionDTO> getAllTransactions() throws TransactionException;
    List<TransactionDTO> getTransactionsByUserId(Long userId) throws TransactionException;
    List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOList) throws TransactionException;
}
