package com.koustubh.notes_application.controller;

import com.koustubh.notes_application.mapper.NoteMapper;
import com.koustubh.notes_application.model.Note;
import com.koustubh.notes_application.model.User;
import com.koustubh.notes_application.repository.NoteRepository;
import com.koustubh.notes_application.service.AuthService;
import com.koustubh.notes_application.service.NoteService;
import com.koustubh.notes_application.utils.NoteDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    private final NoteRepository noteRepository;
    private final NoteService noteService;
    private final AuthService authService;

    public NotesController(NoteRepository noteRepository, NoteService noteService, AuthService authService) {
        this.noteRepository = noteRepository;
        this.noteService = noteService;
        this.authService = authService;
    }

    // ✅ Get all notes
    @GetMapping
    public List<NoteDto> getAllNotes(@RequestParam int page, @RequestParam int size, Authentication authentication) {
        return noteService.getNotesByPage(page, size, authentication.getName());
    }

    // ✅ Get single note by id
    @GetMapping("/{id}")
    public ResponseEntity<NoteDto> getNoteById(@PathVariable UUID id) {
        Note note = noteRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Note with ID: " + id + " was not found"));
        NoteDto noteDto = NoteMapper.toNoteDto(note);
        return ResponseEntity.ok(noteDto);
    }

    // ✅ Create a new note
    @PostMapping
    public ResponseEntity<NoteDto> createNote(@RequestBody NoteDto noteDto, Authentication authentication) {
        User user = authService.findbyEmail(authentication.getName());
        Note note = Note.builder()
                .user(user)
                .title(noteDto.title())
                .content(noteDto.content())
                .createdAt(OffsetDateTime.now())
                .build();
        Note saved = noteRepository.save(note);
        NoteDto responseNoteDto = NoteMapper.toNoteDto(saved);
        return ResponseEntity.status(201).body(responseNoteDto);
    }

    // ✅ Update an existing note
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(
            @PathVariable UUID id,
            @RequestBody Note updatedNote) {
        return noteRepository.findById(id)
                .map(note -> {
                    note.setTitle(updatedNote.getTitle());
                    note.setContent(updatedNote.getContent());
                    note.setCreatedAt(updatedNote.getCreatedAt());
                    note.setUpdatedAt(OffsetDateTime.now());
                    return ResponseEntity.ok(noteRepository.save(note));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete a note
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable UUID id) {
        if (noteRepository.existsById(id)) {
            noteRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}