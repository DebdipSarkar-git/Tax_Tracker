package com.infypp.taxtracker.document_upload_service.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.infypp.taxtracker.document_upload_service.dto.FileUploadRespDto;
import com.infypp.taxtracker.document_upload_service.dto.FileUploadRqstDto;
import com.infypp.taxtracker.document_upload_service.dto.UserDetailsDto;
import com.infypp.taxtracker.document_upload_service.entity.FileEntity;
import com.infypp.taxtracker.document_upload_service.exceptions.NotFoundException;
import com.infypp.taxtracker.document_upload_service.service.FileUploadService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;

@RestController
@Log4j2
@CrossOrigin
public class FileUploadController {

    private FileUploadService fileUploadService;
    private WebClient.Builder webClientBuilder;

    @Value("${UserService.url}")
    private String userServerUrl;
    
    private String userInfoApi = "/api/v1/auth/user-info";
    
    public FileUploadController(FileUploadService fileUploadService, WebClient.Builder webClientBuilder) {
        this.fileUploadService = fileUploadService;
        this.webClientBuilder = webClientBuilder;
    }

    @PostMapping("/upload")
    public ResponseEntity<FileUploadRespDto> uploadFile(@RequestPart FileUploadRqstDto fileDto, @RequestPart MultipartFile fileData
        , HttpServletRequest servletRequest) throws IOException {
        UserDetailsDto userDetails = webClientBuilder.build()
            .get().uri(userServerUrl + userInfoApi)
            .header("Authorization", servletRequest.getHeader("Authorization"))
            .retrieve()
            .bodyToMono(UserDetailsDto.class).block();
        log.info("File Dto: {}, user ID: {}, received file Size: {}, file original name: {}", fileDto, userDetails.getId(), fileData.getSize(), fileData.getOriginalFilename());
        FileUploadRespDto respDto = fileUploadService.uploadFile(fileDto, fileData, userDetails.getId());
        return new ResponseEntity<>(respDto, HttpStatus.CREATED);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable long id) throws NotFoundException {
        FileEntity fileEntity = fileUploadService.getFile(id);
        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=" + fileEntity.getFileName())
            .body(fileEntity.getFileData());
    }
    
    @GetMapping("/files")
    public ResponseEntity<List<FileUploadRespDto>> getFileDetails(HttpServletRequest servletRequest) {
    	UserDetailsDto userDetails = webClientBuilder.build()
                .get().uri(userServerUrl + userInfoApi)
                .header("Authorization", servletRequest.getHeader("Authorization"))
                .retrieve()
                .bodyToMono(UserDetailsDto.class).block();
            
        return ResponseEntity.ok()
            .body(fileUploadService.getFileDetails(userDetails.getId()));
    }
}
