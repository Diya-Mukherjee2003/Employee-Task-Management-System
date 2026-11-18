package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public User register(RegisterRequest request) {

        // 1. Check whether email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // 2. Find role from database

        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() ->
                        new RuntimeException("Role not found"));

        // 3. Create User
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // 4. Hash password using BCrypt
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(role);

        // 5. Save user
        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {

        // 1. Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));

        // 2. Check password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException("Invalid email or password");
        }
        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().getName().name()
        );
        // 3. Return safe response
        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().getName(),
                token
        );
    }
}