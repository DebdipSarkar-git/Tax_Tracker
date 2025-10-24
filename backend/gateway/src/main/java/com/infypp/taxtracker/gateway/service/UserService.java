// package com.infypp.taxtracker.gateway.service;

// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.infypp.taxtracker.gateway.entity.User;
// import com.infypp.taxtracker.gateway.repository.UserRepository;

// @Service
// public class UserService implements UserDetailsService {

//     private final UserRepository userRepository;

//     UserService(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     @Override
//     public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//         User user = userRepository.findByEmail(username)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
//         var userDetails = org.springframework.security.core.userdetails.User
//                 .withUsername(user.getEmail())
//                 .password(user.getPassword())
//                 .authorities(user.getRole().name())
//                 .accountExpired(false)
//                 .accountLocked(false)
//                 .credentialsExpired(false)
//                 .disabled(false)
//                 .build();
//         return userDetails;
//     }

//     public User getUserById(Long id) {
//         return userRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//     }
// }
