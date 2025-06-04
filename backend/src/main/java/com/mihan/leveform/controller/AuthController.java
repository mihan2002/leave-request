package com.mihan.leveform.controller;

import com.mihan.leveform.dto.LoginRequestDto;
import com.mihan.leveform.dto.RegisterRequestDto;
import com.mihan.leveform.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("/api/auth")
@RestController

public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto registerRequestDto) {
        String token = service.register(registerRequestDto);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        String token = service.loginUser(loginRequestDto);
        return ResponseEntity.ok(Map.of("token", token));
    }
}
