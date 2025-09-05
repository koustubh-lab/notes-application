package com.koustubh.notes_application.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.OffsetDateTime;

public record ErrorResponseDto (
    String apiPath,
    HttpStatus httpStatus,
    String errorMessage,
    OffsetDateTime timestamp
) {}
