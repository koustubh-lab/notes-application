package com.koustubh.notes_application.repository;

import com.koustubh.notes_application.model.Note;
import com.koustubh.notes_application.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NoteRepository extends JpaRepository<Note, UUID> {
    Page<Note> findAllByUser(User user, Pageable pageable);
}
