package com.infypp.taxtracker.gateway.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.Claims;

import java.util.Collection;
import java.util.List;

public class JwtAuthentication implements Authentication {

    private final Claims claims;
    
    public JwtAuthentication(Claims claims) {
        this.claims = claims;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Extract roles or permissions from the claims if needed
        return List.of(new SimpleGrantedAuthority("ROLE_USER")); // Example: roles can be extracted from claims and returned here
    }

    @Override
    public Object getCredentials() {
        return claims; // Or you could return null or a specific token
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return claims.getSubject(); // Username or user identifier
    }

    @Override
    public boolean isAuthenticated() {
        return true; // Set based on your token validation logic
    }

    @Override
    public void setAuthenticated(boolean authenticated) throws IllegalArgumentException {
        // Not needed for stateless JWT authentication
    }

    @Override
    public String getName() {
        return claims.getSubject(); // Return the username or any other claim
    }
}

