package com.infypp.taxtracker.document_upload_service.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.infypp.taxtracker.document_upload_service.entity.FileEntity;

public interface FileRepository extends CrudRepository<FileEntity, Long> {

	List<FileEntity> findByUserId(long userId);	
    
}
