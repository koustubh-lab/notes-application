package com.koustubh.notes_application.utils;

import com.koustubh.notes_application.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class OtpCleanupScheduler {

    private final OtpRepository otpRepository;

    // Runs every hour (adjust cron as needed)
    @Scheduled(cron = "0 0 * * * ?")
    public void deleteExpiredOtps() {
        int deleted = otpRepository.deleteByExpiryTimeBefore(OffsetDateTime.now());
        log.info("Deleted {} expired OTPs", deleted);
    }
}

