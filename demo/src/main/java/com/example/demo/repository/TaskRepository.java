package com.example.demo.repository;

import com.example.demo.entity.Task;
import com.example.demo.entity.TaskStatus;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedTo(User user);

    List<Task> findByCreatedBy(User user);

    List<Task> findByAssignedToIsNull();

    List<Task> findByStatus(TaskStatus status);
}