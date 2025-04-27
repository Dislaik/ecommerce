package com.mnsalas.server.controller;

import com.mnsalas.server.entity.Role;
import com.mnsalas.server.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("role")
@CrossOrigin(origins = "http://localhost:3000")
public class RoleController {

  @Autowired
  RoleService roleService;

  @GetMapping("")
  public ResponseEntity<List<Role>> getAll() {
    return new ResponseEntity<List<Role>>(roleService.findAll(), HttpStatus.OK);
  }

  @GetMapping("by-id/{id}")
  public ResponseEntity<Optional<Role>> getById(@PathVariable Integer id) {
    return new ResponseEntity<>(roleService.getById(id), HttpStatus.OK);
  }

  @GetMapping("by-role/{role}")
  public ResponseEntity<Optional<Role>> getByRole(@PathVariable String role) {
    return new ResponseEntity<>(roleService.getByRole(role), HttpStatus.OK);
  }
}
