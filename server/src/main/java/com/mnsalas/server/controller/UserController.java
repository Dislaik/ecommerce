package com.mnsalas.server.controller;

import com.mnsalas.server.entity.User;
import com.mnsalas.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

  @Autowired
  UserService userService;

  @GetMapping("")
  public ResponseEntity<List<User>> getAll() {
    return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
  }

  @GetMapping("by-id/{id}")
  public ResponseEntity<Optional<User>> getById(@PathVariable Integer id) {
    return new ResponseEntity<>(userService.getById(id), HttpStatus.OK);
  }

  @GetMapping("by-email/{email}")
  public ResponseEntity<Optional<User>> getByEmail(@PathVariable String email) {
    return new ResponseEntity<>(userService.getByEmail(email), HttpStatus.OK);
  }
}
