package com.infypp.taxtracker.document_upload_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileUploadRespDto {
    private long id;
    private long userId;
    private String fileName;
    private String fileType;
}
