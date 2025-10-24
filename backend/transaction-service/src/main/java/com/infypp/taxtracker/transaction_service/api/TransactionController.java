package com.infypp.taxtracker.transaction_service.api;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.infypp.taxtracker.transaction_service.dto.TransactionDTO;
import com.infypp.taxtracker.transaction_service.dto.TransactionResponse;
import com.infypp.taxtracker.transaction_service.dto.UserDetailsDto;
import com.infypp.taxtracker.transaction_service.exception.TransactionException;
import com.infypp.taxtracker.transaction_service.service.TransactionService;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin
@Log4j2
public class TransactionController {
 
    private TransactionService transactionService;
    private WebClient.Builder webClientBuilder;

    @Value("${UserService.url}")
    private String userServerUrl;

    public TransactionController(TransactionService transactionService, WebClient.Builder webClientBuilder) {
        this.transactionService = transactionService;
        this.webClientBuilder = webClientBuilder;
    }
    
 
    @GetMapping("/transactions")
    public TransactionResponse getTransactions(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String financialYear,
            @RequestParam(required = false) String month,
            @RequestParam(defaultValue = "false") boolean allMonths) {
 
        return transactionService.getTransactions(pageNumber, pageSize, financialYear, month, allMonths);
    }
    
    @GetMapping("/transactions/allTransactions")
    @CircuitBreaker(name = "allTransactionService", fallbackMethod = "fallbackGetAllTransactions")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions(HttpServletRequest servletRequest) throws TransactionException {
        log.info("=====Inside getAllTransactions====, header got: {}", servletRequest.getHeader("X-User-Email")); 
		UserDetailsDto userDetails = webClientBuilder.build()
            .get().uri(userServerUrl + "/api/v1/auth/user-info")
            .header("Authorization", servletRequest.getHeader("Authorization"))
            .retrieve()
            .bodyToMono(UserDetailsDto.class).block();
        List<TransactionDTO> transactionList = transactionService.getTransactionsByUserId(userDetails.getId());
//		if (transactionList != null) {
//	        throw new TransactionException("No transactions found");
//	    }
		return new ResponseEntity<>(transactionList, HttpStatus.OK);
	}
    
    
    
    @PostMapping("/transactions/addTransactions")
    public ResponseEntity<List<TransactionDTO>> addTransactions(@RequestBody List<TransactionDTO> transactionDTOList, HttpServletRequest servletRequest) throws TransactionException {
    	log.info("Request Body"+transactionDTOList);
    	UserDetailsDto userDetails = webClientBuilder.build()
                .get().uri(userServerUrl + "/api/v1/auth/user-info")
                .header("Authorization", servletRequest.getHeader("Authorization"))
                .retrieve()
                .bodyToMono(UserDetailsDto.class).block();
    	transactionDTOList.forEach((value)->{
    		value.setUserId(userDetails.getId());
    	});
    	List<TransactionDTO> savedTransactions = transactionService.saveTransactions(transactionDTOList);
        return new ResponseEntity<>(savedTransactions, HttpStatus.CREATED);
    }
    
    
    public ResponseEntity<List<TransactionDTO>> fallbackGetAllTransactions(HttpServletRequest servletRequest, Throwable ex) {
    	log.info("=====Inside FallBack Method====");
		TransactionDTO transactionTO = new TransactionDTO();
		List<TransactionDTO> transactionDTOList = new ArrayList<>();
		transactionDTOList.add(transactionTO);
		
		return new ResponseEntity<List<TransactionDTO>>(transactionDTOList,HttpStatus.OK);
    }

}