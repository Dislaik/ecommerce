package com.mnsalas.server.dto;

import com.mnsalas.server.entity.Role;

import jakarta.validation.constraints.NotBlank;

public class RegisterUser {
  @NotBlank
  private String email;

  @NotBlank
  private String password;

  @NotBlank
  private String first_name;

  @NotBlank
  private String last_name;

  private Role role;

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return first_name;
  }

  public void setFirstName(String first_name) {
    this.first_name = first_name;
  }

  public String getLastName() {
    return last_name;
  }

  public void setLastName(String last_name) {
    this.last_name = last_name;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}