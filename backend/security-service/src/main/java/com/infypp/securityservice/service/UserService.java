package com.infypp.securityservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.infypp.securityservice.dto.UserDetailsResponseDto;
import com.infypp.securityservice.entity.User;
import com.infypp.securityservice.exception.NotFoundException;
import com.infypp.securityservice.repository.UserRepository;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        var userDetails = org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
        return userDetails;
    }

    public User getUserById(Long id) throws NotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("User not found with id: " + id));
    }

    public UserDetailsResponseDto getUserByEmail(String email) throws NotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User not found with email: " + email));
        UserDetailsResponseDto responseDto = UserDetailsResponseDto.builder()
            .id(user.getId())
            .name(user.getUsername())
            .username(user.getEmail())
            .mobileNo(user.getMobileNo())
            .addressLine1(user.getAddressLine1())
            .addressLine2(user.getAddressLine2())
            .area(user.getArea())
            .pincode(user.getPincode())
            .city(user.getCity())
            .state(user.getState())
            .role(user.getRole().toString())
            .build();
        log.info("UserDetailsResponseDto: {}", responseDto);
        return responseDto;
    }
    
}