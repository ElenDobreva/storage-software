package com.warehouse.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000") 
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @PostMapping("/api/auth/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        String hardcodedUsername = "testuser";
        String hardcodedPassword = "password123";
        String hardcodedRole = "Admin";
        String hardcodedEmail = "user@example.com";
        String hardcodedPhone = "123-456-7890";

        if (hardcodedUsername.equals(request.getUsername()) && hardcodedPassword.equals(request.getPassword())) {
            return new AuthResponse(hardcodedUsername, hardcodedRole, hardcodedEmail, hardcodedPhone, "dummy-token");
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }

    public static class AuthRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class AuthResponse {
        private String username;
        private String role;
        private String email;
        private String phone;
        private String token;

        public AuthResponse(String username, String role, String email, String phone, String token) {
            this.username = username;
            this.role = role;
            this.email = email;
            this.phone = phone;
            this.token = token;
        }

        public String getUsername() {
            return username;
        }

        public String getRole() {
            return role;
        }

        public String getEmail() {
            return email;
        }
        
        public String getPhone() {
            return phone;
        }

        public String getToken() {
            return token;
        }
    }
    
}