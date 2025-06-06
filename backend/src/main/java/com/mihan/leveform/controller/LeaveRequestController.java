package com.mihan.leveform.controller;

import com.mihan.leveform.dto.LeaveRequestDto;
import com.mihan.leveform.model.LeaveRequest;
import com.mihan.leveform.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService service;

    @PostMapping
    public ResponseEntity<LeaveRequest> create(@RequestBody LeaveRequestDto request, Authentication authentication) {

        LeaveRequest created = service.create(request,authentication);
        return ResponseEntity.status(201).body(created);
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAll(Authentication authentication) {
        return ResponseEntity.ok(service.getAll(authentication));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeaveRequest> update(@PathVariable int id ,@RequestBody LeaveRequest request) {
        LeaveRequest updated = service.update(id,request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
