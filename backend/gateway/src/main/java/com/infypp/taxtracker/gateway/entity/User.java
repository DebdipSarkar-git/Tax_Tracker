// package com.infypp.taxtracker.gateway.entity;

// import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;
// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// import java.time.LocalDateTime;
// import java.util.Collection;
// import java.util.List;

// @Data
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// @Entity
// @Table(name = "users")
// public class User implements UserDetails {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false, unique = true, length = 50)
//     private String username;

//     @Column(nullable = false, unique = true, length = 50)
//     private String email;

//     @Column(nullable = true)
//     private Long mobileNo;

//     @Column(nullable = false)
//     private String password;

//     @Enumerated(EnumType.STRING)
//     private Role role;

//     @Column(nullable = true, length = 50)
//     private String addressLine1;

//     @Column(nullable = true, length = 50)
//     private String addressLine2;

//     @Column(nullable = true, length = 50)
//     private String area;

//     @Column(nullable = true, length = 6)
//     private Integer pincode;

//     @Column(nullable = true, length = 30)
//     private String city;

//     @Column(nullable = true, length = 30)
//     private String state;

//     @Column(name = "created_at")
//     private LocalDateTime createdAt;

//     @Column(name = "updated_at")
//     private LocalDateTime updatedAt;

//     @PrePersist
//     protected void onCreate() {
//         createdAt = LocalDateTime.now();
//         updatedAt = LocalDateTime.now();
//     }

//     @PreUpdate
//     protected void onUpdate() {
//         updatedAt = LocalDateTime.now();
//     }

//     public enum Role {
//         USER,
//         ADMIN
//     }

//     @Override
//     public Collection<? extends GrantedAuthority> getAuthorities() {
//         return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
//     }

//     @Override
//     public boolean isAccountNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isAccountNonLocked() {
//         return true;
//     }

//     @Override
//     public boolean isCredentialsNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isEnabled() {
//         return true;
//     }
// }
