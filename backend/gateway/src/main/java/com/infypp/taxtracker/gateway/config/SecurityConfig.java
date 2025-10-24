// package com.infypp.taxtracker.gateway.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.server.WebFilter;
// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
// import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;


// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity
// public class SecurityConfig {

//     private final JwtWebFilter jwtWebFilter;

//     public SecurityConfig(JwtWebFilter jwtWebFilter) {
//         this.jwtWebFilter = jwtWebFilter;
//     }

//     private static final String[] WHITE_LIST_URLS = {
//         "/api/v1/auth/hello",
//         "/api/v1/auth/login",
//         "/api/v1/auth/register",
//         "/api-docs/**",
//         "/swagger-ui/**",
//         "/swagger-ui.html",
//         "/actuator/health"
//     };

//     @Bean
//     public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         http
//                 .csrf(AbstractHttpConfigurer::disable)
//                 .authorizeHttpRequests(req -> 
//                         req.requestMatchers(WHITE_LIST_URLS)
//                                 .permitAll()
//                                 .anyRequest()
//                                 .authenticated()
//                 )
//                 .sessionManagement(session -> 
//                         session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                 )
//                 .addFilterBefore(jwtWebFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     // @Bean
//     // public AuthenticationProvider authenticationProvider() {
//     //     DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//     //     authProvider.setUserDetailsService(userDetailsService);
//     //     authProvider.setPasswordEncoder(passwordEncoder());
//     //     return authProvider;
//     // }

// }
