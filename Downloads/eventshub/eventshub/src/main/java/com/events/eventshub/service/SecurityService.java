package com.events.eventshub.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SecurityService {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String encrypt(String plain) {
        return passwordEncoder.encode(plain);
    }

    public boolean matches(String plain, String encrypted) {
        return passwordEncoder.matches(plain, encrypted);
    }
}
