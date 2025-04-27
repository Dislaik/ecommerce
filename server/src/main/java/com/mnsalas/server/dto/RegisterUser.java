package com.mnsalas.server.dto;

import jakarta.validation.constraints.NotBlank;

public class RegisterUser {
  @NotBlank
  private String email;
  @NotBlank
  private String password;
  @NotBlank
  private String fullName;
  private Integer role;

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

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public Integer getRole() {
    return role;
  }

  public void setRole(Integer role) {
    this.role = role;
  }
}