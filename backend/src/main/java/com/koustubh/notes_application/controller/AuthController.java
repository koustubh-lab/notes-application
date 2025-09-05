package com.koustubh.notes_application.controller;

import com.koustubh.notes_application.model.OTP;
import com.koustubh.notes_application.repository.OtpRepository;
import com.koustubh.notes_application.service.AuthService;
import com.koustubh.notes_application.service.EmailService;
import com.koustubh.notes_application.utils.AuthResponse;
import com.koustubh.notes_application.utils.AuthRequest;
import com.koustubh.notes_application.utils.RegisterRequest;
import com.koustubh.notes_application.utils.TokenService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final AuthService authService;
    private final EmailService emailService;
    private final OtpRepository otpRepository;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService, AuthService authService, EmailService emailService, OtpRepository otpRepository) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.authService = authService;
        this.emailService = emailService;
        this.otpRepository = otpRepository;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Void> sendOtp(@RequestParam String email) {
        String otp = String.valueOf((int)(Math.random() * 900000) + 100000); // 6-digit OTP
        emailService.sendOtpEmail(email, "Your OTP Code", otp);
        OTP otp1 = OTP.builder()
                .expiryTime(OffsetDateTime.now().plusMinutes(5))
                .code(otp)
                .email(email)
                .verified(false)
                .build();
        otpRepository.save(otp1);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest authRequest) {
        authService.registerUser(authRequest);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public AuthResponse authenticate(@Valid @RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        return new AuthResponse(tokenService.generateToken(authentication));
    }

    @GetMapping("/is-token-valid")
    public ResponseEntity<Map<String, String>> isTokenValid(Authentication authentication) {
        return ResponseEntity.ok(Map.of("email", authentication.getName()));
    }
}
