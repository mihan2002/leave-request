package com.mihan.leveform.controller;

import com.mihan.leveform.dto.LeaveRequestDto;
import com.mihan.leveform.model.LeaveRequest;
import com.mihan.leveform.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService service;

    @PostMapping
    public ResponseEntity<LeaveRequest> create(@RequestBody LeaveRequestDto request) {
        LeaveRequest created = service.create(request);
        return ResponseEntity.status(201).body(created); // 201 Created
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping
    public ResponseEntity<LeaveRequest> update(@RequestBody LeaveRequest request) {
        LeaveRequest updated = service.update(request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}
