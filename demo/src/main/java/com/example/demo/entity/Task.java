package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    // Admin's optional task file
    private String taskFileName;

    private String taskFilePath;

    // Employee's proof
    private String proofLink;

    private String proofFileName;

    private String proofFilePath;

    // Admin who created the task
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    // Employee assigned to the task
    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;
}