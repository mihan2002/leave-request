package com.mihan.leveform.service;

import com.mihan.leveform.model.LeaveRequest;
import com.mihan.leveform.repo.LeaveRequestRepo;
import com.mihan.leveform.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepo leaveRequestRepo;

    public LeaveRequest create(LeaveRequest request) {
        return leaveRequestRepo.save(request);
    }

    public List<LeaveRequest> getAll() {
        return leaveRequestRepo.findAll();
    }

    public LeaveRequest update(LeaveRequest request) {
        if (request.getId() == null || !leaveRequestRepo.existsById(request.getId())) {
            throw new ResourceNotFoundException("Leave request not found with ID: " + request.getId());
        }
        return leaveRequestRepo.save(request);
    }

    public void delete(int id) {
        if (!leaveRequestRepo.existsById(id)) {
            throw new ResourceNotFoundException("Leave request not found with ID: " + id);
        }
        leaveRequestRepo.deleteById(id);
    }
}
