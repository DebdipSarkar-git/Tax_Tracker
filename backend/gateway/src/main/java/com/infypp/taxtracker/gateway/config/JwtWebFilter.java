package com.infypp.taxtracker.gateway.config;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import reactor.core.publisher.Mono;

public class JwtWebFilter implements WebFilter {

    private final JwtService jwtService;

    public JwtWebFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        // Get the JWT token from the Authorization header
        String authorizationHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return unauthorizedResponse(exchange);
        }

        // Extract the token from the header
        String token = authorizationHeader.replace("Bearer ", "");

        try {
            // Validate and parse the token
            Claims claims = jwtService.extractAllClaims(token);

            // Set the authentication in the SecurityContext
            SecurityContextHolder.getContext().setAuthentication(new JwtAuthentication(claims));
            
            // Continue with the request chain
            return chain.filter(exchange);
        } catch (Exception e) {
            // If the token is invalid, return an unauthorized response
            return unauthorizedResponse(exchange);
        }
    }

    private Mono<Void> unauthorizedResponse(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}