package com.koustubh.notes_application.repository;

import com.koustubh.notes_application.model.OTP;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.OffsetDateTime;
import java.util.Optional;
import java.util.UUID;

public interface OtpRepository extends JpaRepository<OTP, UUID> {
    Optional<OTP> findTopByEmailAndCodeOrderByExpiryTimeDesc(String email, String code);
    int deleteByExpiryTimeBefore(OffsetDateTime time);
}
