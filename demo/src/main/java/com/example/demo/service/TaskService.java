package com.example.demo.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.demo.entity.Task;
import com.example.demo.entity.TaskStatus;
import com.example.demo.entity.User;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.example.demo.entity.RoleType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository,
                       UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Create task
    public Task createTask(String title, String description, MultipartFile file) {
        try{
            Task task = new Task();

            task.setTitle(title);
            task.setDescription(description);
            task.setStatus(TaskStatus.CREATED);

            // File will be handled here later
            if (file != null && !file.isEmpty()) {
                task.setTaskFileName(file.getOriginalFilename());
            }
            return taskRepository.save(task);
        }catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }

    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Get task by ID
    public Task getTaskById(Long id) {

        return taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));
    }

    // Delete task
    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }

        taskRepository.deleteById(id);
    }

    // Assign task to employee
    public Task assignTask(Long taskId, Long employeeId) {

        Task task = getTaskById(taskId);

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        if (employee.getRole().getName() != RoleType.EMPLOYEE) {
            throw new RuntimeException("Task can only be assigned to an employee");
        }

        task.setAssignedTo(employee);
        task.setStatus(TaskStatus.ASSIGNED);

        return taskRepository.save(task);
    }

    // Employee changes status
    public Task updateStatus(Long taskId, TaskStatus status) {

        Task task = getTaskById(taskId);

        task.setStatus(status);

        return taskRepository.save(task);
    }

    // Get tasks assigned to employee
    public List<Task> getEmployeeTasks(Long employeeId) {

        User employee = userRepository.findById(employeeId)
                .orElseThrow(() ->
                        new RuntimeException("Employee not found"));

        return taskRepository.findByAssignedTo(employee);
    }

    // Get unassigned tasks
    public List<Task> getUnassignedTasks() {
        return taskRepository.findByAssignedToIsNull();
    }

    // Admin approves task
    public Task approveTask(Long taskId) {

        Task task = getTaskById(taskId);

        if (task.getStatus() != TaskStatus.COMPLETED) {
            throw new RuntimeException(
                    "Only completed tasks can be approved");
        }

        task.setStatus(TaskStatus.APPROVED);

        return taskRepository.save(task);
    }

    // Admin rejects task
    public Task rejectTask(Long taskId) {

        Task task = getTaskById(taskId);

        if (task.getStatus() != TaskStatus.COMPLETED) {
            throw new RuntimeException(
                    "Only completed tasks can be rejected");
        }

        task.setStatus(TaskStatus.REJECTED);

        return taskRepository.save(task);
    }
}