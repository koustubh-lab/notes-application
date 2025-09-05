package com.koustubh.notes_application.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "otp_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class OTP {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String email; // user identifier

    @Column(nullable = false)
    private String code; // OTP value, could be numeric or alphanumeric

    @Column(nullable = false)
    private OffsetDateTime expiryTime; // OTP expiration time

    @Column(nullable = false)
    private boolean verified = false; // whether OTP has been used
}
