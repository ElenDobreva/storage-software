package com.warehouse.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/test")
    public String testEndpoint() {
        return "AuthController is working!";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        System.out.println("Login request received for username: " + request.getUsername());

        Optional<User> userOptional = userRepository.findByEmail(request.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println("User found: " + user.getName());

            if (request.getPassword().equals(user.getPassword())) {
                System.out.println("Password matched for user: " + user.getName());
                return new AuthResponse(
                        user.getId(),
                        user.getName(),
                        user.getRole().name(),
                        user.getEmail(),
                        user.getPhone(),
                        "dummy-token"
                );
            } else {
                System.out.println("Password mismatch for user: " + user.getName());
            }
        } else {
            System.out.println("User not found for email: " + request.getUsername());
        }

        throw new RuntimeException("Invalid credentials");
    }
}