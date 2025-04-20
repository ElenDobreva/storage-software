package com.warehouse.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent())
            return ResponseEntity.ok(optionalUser.get());
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body("Err: User doesn't exist");
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            user.setRole(updatedUser.getRole());
            user.setAddress(updatedUser.getAddress());
            user.setContractDate(updatedUser.getContractDate());
            user.setContractNo(updatedUser.getContractNo());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        if (!userRepository.existsById(id))
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Err: User doesn't exist");
    
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok("SUCCESS");
        } catch (Exception e) {
            System.err.println("Error deleting user with ID " + id + ": " + e.getMessage());
            throw new RuntimeException("Failed to delete user with id " + id);
        }
    }
}