package com.paytrack.controller;

import com.paytrack.model.User;
import com.paytrack.security.JwtUtil;
import com.paytrack.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User saved = authService.register(user);
        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully",
                "email", saved.getEmail()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.get("email"),
                        request.get("password")
                )
        );
        String token = jwtUtil.generateToken(request.get("email"));
        return ResponseEntity.ok(Map.of("token", token));
    }
}