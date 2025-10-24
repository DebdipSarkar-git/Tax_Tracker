package com.infypp.securityservice.service;

import lombok.RequiredArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.infypp.securityservice.config.JwtService;
import com.infypp.securityservice.dto.AuthRequest;
import com.infypp.securityservice.dto.UserDetailsResponseDto;
import com.infypp.securityservice.dto.RegisterRequest;
import com.infypp.securityservice.entity.User;
import com.infypp.securityservice.entity.User.Role;
import com.infypp.securityservice.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;

    public boolean register(RegisterRequest request) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new SecurityException("Service.USERNAME_ALREADY_EXISTS");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new SecurityException("Service.EMAIL_ALREADY_EXISTS");
        }

        // Create new user
        User user = modelMapper.map(request, User.class);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        userRepository.save(user);        
        return true;
    }

    public UserDetailsResponseDto login(AuthRequest request) {
        // Find user by username
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new SecurityException("Service.USER_NOT_FOUND"));
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new SecurityException("Service.INVALID_PASSWORD");
        }

        var tokenUser = User.builder()
                .username(request.getEmail())
                // .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .build();
        
        // Generate JWT token
        var jwtToken = jwtService.generateToken(tokenUser);
        
        user.getRole();
		return UserDetailsResponseDto.builder()
                .token(jwtToken)
                .username(tokenUser.getUsername())
                .name(user.getUsername())
                .mobileNo(user.getMobileNo())
                .id(user.getId())
                .role(user.getRole().toString())
                .addressLine1(user.getAddressLine1())
                .addressLine2(user.getAddressLine2())
                .area(user.getArea())
                .city(user.getCity())
                .state(user.getState())
                .pincode(user.getPincode())
                .build();
    }
}