package com.example.demo.dto;

import com.example.demo.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private Long id;

    private String name;

    private String email;

    private RoleType role;

    private String token;
}