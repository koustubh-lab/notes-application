package com.koustubh.notes_application.utils;

import java.time.OffsetDateTime;
import java.util.UUID;

public record NoteDto(UUID id, String title, String content, OffsetDateTime createdAt, OffsetDateTime updatedAt) {
}
