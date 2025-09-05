package com.koustubh.notes_application.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "notes")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Note {
    @Id
    @GeneratedValue
    private UUID id;

    private String title;
    @Lob
    @Basic(fetch = FetchType.EAGER)
    @Column(columnDefinition = "TEXT")
    private String content;

    @CreatedDate()
    @Column(updatable = false)
    private OffsetDateTime createdAt;

    @LastModifiedDate
    @Column(insertable = false)
    private OffsetDateTime updatedAt;

    @ManyToOne
    private User user;
}
