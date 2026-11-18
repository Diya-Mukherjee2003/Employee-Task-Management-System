package com.example.demo.dto;

import com.example.demo.entity.RoleType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String name;

    private String email;

    private String password;

    private RoleType role;
}