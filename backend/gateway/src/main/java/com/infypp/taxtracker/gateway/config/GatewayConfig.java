package com.infypp.taxtracker.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.WebFilter;

@Configuration
public class GatewayConfig {
    
    @Bean
    public WebFilter jwtFilter(JwtService jwtService) {
        return new JwtWebFilter(jwtService);
    }
}
