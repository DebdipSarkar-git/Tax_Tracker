package com.infypp.taxtracker.transaction_service.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.infypp.taxtracker.transaction_service.dto.TransactionDTO;
import com.infypp.taxtracker.transaction_service.dto.TransactionResponse;
import com.infypp.taxtracker.transaction_service.entity.Transaction;
import com.infypp.taxtracker.transaction_service.exception.TransactionException;
import com.infypp.taxtracker.transaction_service.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    
    private ModelMapper modelMapper = new ModelMapper();

    @Override
    public TransactionResponse getTransactions(int pageNumber, int pageSize, String financialYear, String month, boolean allMonths) {
        PageRequest pageable = PageRequest.of(pageNumber, pageSize);
        LocalDate startDate = null, endDate = null;

        if (financialYear != null) {
            String[] years = financialYear.split("-");
            int startYear = Integer.parseInt(years[0]);
            int endYear = Integer.parseInt(years[1]);

            if (month != null && !month.isEmpty()) {
                int monthInt = Integer.parseInt(month);
                startDate = LocalDate.of(startYear, monthInt, 1);
                endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());
            } else if (allMonths) {
                startDate = LocalDate.of(startYear, 4, 1);
                endDate = LocalDate.of(endYear, 3, 31);
            }
        } else {
            startDate = LocalDate.MIN;
            endDate = LocalDate.now();
        }

        Page<Transaction> transactions = transactionRepository.findByDateBetween(startDate, endDate, pageable);

        return new TransactionResponse(transactions.getTotalElements(), pageNumber, pageSize, transactions.getContent());
    }
    
    @Override
	public List<TransactionDTO> getAllTransactions() throws TransactionException{
		List<Transaction> transactions = (List<Transaction>)transactionRepository.findAll();
		if (transactions.isEmpty())
			throw new TransactionException("Service.TRANSACTION_NOT_FOUND");
		return modelMapper.map(transactions, new TypeToken<List<TransactionDTO>>() {
		}.getType());
	}

    @Override
    public List<TransactionDTO> getTransactionsByUserId(Long userId) throws TransactionException{
		List<Transaction> transactions = transactionRepository.findByUserId(userId);
		if (transactions.isEmpty())
			throw new TransactionException("Service.TRANSACTION_NOT_FOUND");
		return modelMapper.map(transactions, new TypeToken<List<TransactionDTO>>() {
		}.getType());
	}
    
    @Override
    public List<TransactionDTO> saveTransactions(List<TransactionDTO> transactionDTOList) {
        List<Transaction> transactions = transactionDTOList.stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());
        List<Transaction> transactionList = transactionRepository.saveAll(transactions);
        
        return transactionList.stream().map((transct) -> modelMapper.map(transct, TransactionDTO.class)).collect(Collectors.toList());
    }
    
    private Transaction convertToEntity(TransactionDTO transactionDTO) {
        return modelMapper.map(transactionDTO, Transaction.class);
    }
}
