package com.mnsalas.server.controller;

import com.mnsalas.server.dto.LoginUser;
import com.mnsalas.server.dto.RegisterUser;
import com.mnsalas.server.entity.Role;
import com.mnsalas.server.entity.User;
import com.mnsalas.server.security.jwt.Provider;
import com.mnsalas.server.service.RoleService;
import com.mnsalas.server.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  RoleService roleService;

  @Autowired
  UserService userService;
  @Autowired
  private Provider provider;

  @PostMapping("login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginUser loginUser) {
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String token = provider.generateToken(authentication);

    return new ResponseEntity<String>(token, HttpStatus.OK);
  }

  @PostMapping("register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterUser registerUser) {
    try {
      System.out.println(registerUser);
      //Role userRole = roleService.getByName("user").get();
      //User user = new User(registerUser.getEmail(), encoder.encode(registerUser.getPassword()), registerUser.getFullName(), userRole);

      //userService.save(user);

      return new ResponseEntity<>("Usuario creado", HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>("Hubo un error inesperado", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @PostMapping("register/google")
  // public ResponseEntity<?> registerByGoogle(@Valid @RequestBody body) {

  // }
}
