package com.example.demo.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "my-super-secret-key-for-task-management-system-2026";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes(StandardCharsets.UTF_8)
            );

    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    // Generate JWT
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .subject(email)
                .claim("role", role)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME)
                )
                .signWith(key)
                .compact();
    }

    // Extract email from JWT
    public String extractEmail(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Validate JWT
    public boolean isTokenValid(String token) {

        try {

            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}