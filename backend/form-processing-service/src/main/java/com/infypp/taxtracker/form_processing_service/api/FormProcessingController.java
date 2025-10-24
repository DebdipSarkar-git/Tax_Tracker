package com.infypp.taxtracker.form_processing_service.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import com.infypp.taxtracker.form_processing_service.dto.FormProcessingDTO;
import com.infypp.taxtracker.form_processing_service.dto.UserDetailsDto;
import com.infypp.taxtracker.form_processing_service.exception.FormProcessingException;
import com.infypp.taxtracker.form_processing_service.service.SubmissionService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin("http://localhost:3000")
public class FormProcessingController {

	private SubmissionService submissionService;
    private WebClient.Builder webClientBuilder;
    private String authorization = "Authorization";

    @Value("${UserService.url}")
    private String userServerUrl;
    
    private String userInfoApi = "/api/v1/auth/user-info";
    
    public FormProcessingController(SubmissionService submissionService,  WebClient.Builder webClientBuilder) {
        this.submissionService = submissionService;
        this.webClientBuilder = webClientBuilder;
    }
    
    @GetMapping("/form-status")
    public ResponseEntity<FormProcessingDTO> getStatus(HttpServletRequest servletRequest) throws FormProcessingException {
    	UserDetailsDto userDetails = webClientBuilder.build()
                .get().uri(userServerUrl + userInfoApi)
                .header(authorization, servletRequest.getHeader(authorization))
                .retrieve()
                .bodyToMono(UserDetailsDto.class).block();
    	return ResponseEntity.ok()
            .body(submissionService.getStatusByUserId(userDetails.getId()));
    }
    
    @PostMapping("/form-status")
    public ResponseEntity<String> getFileDetails(HttpServletRequest servletRequest) {
    	UserDetailsDto userDetails = webClientBuilder.build()
                .get().uri(userServerUrl + userInfoApi)
                .header(authorization, servletRequest.getHeader(authorization))
                .retrieve()
                .bodyToMono(UserDetailsDto.class).block();
            
        return ResponseEntity.ok()
            .body(submissionService.setStatusByUserId(userDetails.getId()));
    }
}
