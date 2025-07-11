package com.mnsalas.server;

import com.mnsalas.server.entity.Role;
import com.mnsalas.server.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication implements CommandLineRunner {

  @Autowired
  RoleRepository roleRepository;

  public static void main(String[] args) {
    SpringApplication.run(ServerApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
    if (roleRepository.findAll().isEmpty()) {
      Role role = new Role("user");

      roleRepository.save(role);
    }
  }
}
