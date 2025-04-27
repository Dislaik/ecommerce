package com.mnsalas.server.service;

import com.mnsalas.server.entity.Role;
import com.mnsalas.server.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RoleService {

    @Autowired
    RoleRepository roleRepository;

    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    public Optional<Role> getById(Integer id) {
        return roleRepository.findById(id);
    }

    public Optional<Role> getByRole(String role) {
        return roleRepository.findByRole(role);
    }

    public Boolean existsByRole(String role) {
        return roleRepository.existsByRole(role);
    }

    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public void delete(Role role) {
        roleRepository.delete(role);
    }
}
