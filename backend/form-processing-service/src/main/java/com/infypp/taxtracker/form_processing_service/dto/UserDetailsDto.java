package com.infypp.taxtracker.form_processing_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDto {
    private Long id;
    private String token;
    private String username;
    private String name;
    private Long mobileNo;
    private String role;
    private String addressLine1;
    private String addressLine2;
    private String area;
    private Integer pincode;
    private String city;
    private String state;
}