package com.koustubh.notes_application.service;

import com.koustubh.notes_application.model.OTP;
import com.koustubh.notes_application.model.User;
import com.koustubh.notes_application.repository.OtpRepository;
import com.koustubh.notes_application.repository.UserRepository;
import com.koustubh.notes_application.utils.AuthRequest;
import com.koustubh.notes_application.utils.RegisterRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final OtpRepository otpRepository;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, OtpRepository otpRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.otpRepository = otpRepository;
    }

    public void registerUser(RegisterRequest registerRequest) {
        Optional<OTP> otpOptional = otpRepository
                .findTopByEmailAndCodeOrderByExpiryTimeDesc(registerRequest.getEmail(), registerRequest.getOtp());

        if (otpOptional.isEmpty()) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        OTP otp = otpOptional.get();

        if (otp.isVerified()) {
            throw new IllegalArgumentException("OTP already used");
        }

        if (otp.getExpiryTime().isBefore(OffsetDateTime.now())) {
            throw new IllegalArgumentException("OTP expired");
        }

        // Mark OTP as verified
        otp.setVerified(true);
        otpRepository.save(otp);

        // 2. Save user
        User user = User.builder()
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .createdAt(OffsetDateTime.now())
                .build();

        userRepository.save(user);
    }

    public User findbyEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User with email: " + email + " was not found"));
    }
}
