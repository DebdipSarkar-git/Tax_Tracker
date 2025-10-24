package com.infypp.taxtracker.document_upload_service.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import com.infypp.taxtracker.document_upload_service.dto.FileUploadRespDto;
import com.infypp.taxtracker.document_upload_service.dto.FileUploadRqstDto;
import com.infypp.taxtracker.document_upload_service.dto.UserDetailsDto;
import com.infypp.taxtracker.document_upload_service.entity.FileEntity;
import com.infypp.taxtracker.document_upload_service.exceptions.NotFoundException;
import com.infypp.taxtracker.document_upload_service.repository.FileRepository;

@Service
public class FileUploadService {

    private FileRepository fileRepository;
    private ModelMapper modelMapper;
    
    public FileUploadService(FileRepository fileRepository, ModelMapper modelMapper) {
        this.fileRepository = fileRepository;
        this.modelMapper = modelMapper;
    }

    public FileUploadRespDto uploadFile(FileUploadRqstDto fileDto, MultipartFile fileData, long userId) throws IOException {
        FileEntity fileEntity = FileEntity.builder()
        	.userId(userId)
        	.uploadDate(LocalDate.now())
            .fileData(fileData.getBytes())
            .fileType(fileDto.getFileType())
            .fileName(fileDto.getFileName())
            .size(fileDto.getSize())
            .build();
        fileEntity = fileRepository.save(fileEntity);
        return new FileUploadRespDto(fileEntity.getId(), fileEntity.getUserId(), fileEntity.getFileName(), fileEntity.getFileType());
    }

    public FileEntity getFile(long id) throws NotFoundException {
        return fileRepository.findById(id).orElseThrow(() -> new NotFoundException("File not found"));
    }

    public List<FileUploadRespDto> getFileDetails(long userId) {
		List<FileEntity> files = fileRepository.findByUserId(userId);
		return modelMapper.map(files, new TypeToken<List<FileUploadRespDto>>() {}.getType());
	}
}
