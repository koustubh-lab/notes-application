package com.koustubh.notes_application.service;

import com.koustubh.notes_application.mapper.NoteMapper;
import com.koustubh.notes_application.model.Note;
import com.koustubh.notes_application.model.User;
import com.koustubh.notes_application.repository.NoteRepository;
import com.koustubh.notes_application.repository.UserRepository;
import com.koustubh.notes_application.utils.NoteDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserRepository userRepository;

    public NoteService(NoteRepository noteRepository, UserRepository userRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public List<NoteDto> getNotesByPage(int page, int size, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User with email: " + email + " was not found"));
        List<NoteDto> newList = noteRepository.findAllByUser(
                user, PageRequest.of(page - 1, size, Sort.by("createdAt").descending()))
                .getContent().stream().map(NoteMapper::toNoteDto).toList();
        log.info("Note List: {}", newList);
        return newList;
    }
}
