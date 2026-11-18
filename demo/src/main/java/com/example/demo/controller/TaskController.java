package com.example.demo.controller;

import com.example.demo.entity.Task;
import com.example.demo.entity.TaskStatus;
import com.example.demo.service.TaskService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }



    // Create task
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Task createTask(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile file
    ) {
        return taskService.createTask(title, description, file);
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get task by ID
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // Delete task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

        return "Task deleted successfully";
    }

    // Assign task
    @PutMapping("/{taskId}/assign/{employeeId}")
    public Task assignTask(
            @PathVariable Long taskId,
            @PathVariable Long employeeId) {

        return taskService.assignTask(taskId, employeeId);
    }

    // Update status
    @PutMapping("/{taskId}/status")
    public Task updateStatus(
            @PathVariable Long taskId,
            @RequestParam TaskStatus status) {

        return taskService.updateStatus(taskId, status);
    }

    // Employee's tasks
    @GetMapping("/employee/{employeeId}")
    public List<Task> getEmployeeTasks(
            @PathVariable Long employeeId) {

        return taskService.getEmployeeTasks(employeeId);
    }

    // Unassigned tasks
    @GetMapping("/unassigned")
    public List<Task> getUnassignedTasks() {

        return taskService.getUnassignedTasks();
    }

    // Approve
    @PutMapping("/{taskId}/approve")
    public Task approveTask(@PathVariable Long taskId) {

        return taskService.approveTask(taskId);
    }

    // Reject
    @PutMapping("/{taskId}/reject")
    public Task rejectTask(@PathVariable Long taskId) {

        return taskService.rejectTask(taskId);
    }
}