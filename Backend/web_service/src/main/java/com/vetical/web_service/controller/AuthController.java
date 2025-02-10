package com.vetical.web_service.controller;

import com.vetical.web_service.model.User;
import com.vetical.web_service.service.JwtService;
import com.vetical.web_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthController {

    @Autowired
    private UserService service;

    @Autowired
    AuthenticationManager authenticationManager;


    @Autowired
    JwtService jwtService;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        user.setPassword(encoder.encode(user.getPassword()));
        service.saveUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String identifier = loginRequest.get("username"); // Can be email or username
        String rawPassword = loginRequest.get("password");

        // ✅ Find user by username or email
        User user = service.loginUser(identifier);

        // ✅ Validate password
        if (!encoder.matches(rawPassword, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        // ✅ Generate JWT token
        String token = jwtService.generateToken(user.getUsername());

        // ✅ Return structured response
        return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token
        ));
    }






}
