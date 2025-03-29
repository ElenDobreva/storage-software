package com.warehouse.backend;

public class AuthResponse {
    private Long id;
    private String username;
    private String role;
    private String email;
    private String phone;
    private String token;

    public AuthResponse(Long id, String username, String role, String email, String phone, String token) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.email = email;
        this.phone = phone;
        this.token = token;
    }

    public Long getId() {
        return id;
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