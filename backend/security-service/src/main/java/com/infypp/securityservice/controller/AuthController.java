package com.infypp.securityservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infypp.securityservice.dto.AuthRequest;
import com.infypp.securityservice.dto.UserDetailsResponseDto;
import com.infypp.securityservice.dto.RegisterRequest;
import com.infypp.securityservice.exception.NotFoundException;
import com.infypp.securityservice.service.AuthService;
import com.infypp.securityservice.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Log4j2
@Tag(name = "Authentication", description = "Authentication management APIs")
@CrossOrigin("http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello";
    }

    @GetMapping("/testAuthentication")
    public String testAuthentication() {
        return "Authentication successful";
    }
    

    @PostMapping("/register")
    @Operation(summary = "Register a new user", description = "Creates a new user account but user need to login for JWT token")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request
    ) throws Exception {
        if(authService.register(request)) {
            return ResponseEntity.ok( "User registered successfully" );
        }
        else {
            throw new Exception("Service.REGISTRATION_FAILED");
        }
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate user", description = "Authenticates user credentials and returns JWT token")
    public ResponseEntity<UserDetailsResponseDto> login(
            @Valid @RequestBody AuthRequest request
    ) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/user-info")
    @Operation(
            summary = "Get user info",
            description = "Returns authenticated user information (protected endpoint)",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<UserDetailsResponseDto> getUserInfo() throws NotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("User info: {}", authentication);
        UserDetailsResponseDto user = userService.getUserByEmail(authentication.getName());

        return ResponseEntity.ok(user);
    }

}