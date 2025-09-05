package com.koustubh.notes_application.mapper;

import com.koustubh.notes_application.model.Note;
import com.koustubh.notes_application.utils.NoteDto;

public class NoteMapper {
    public static NoteDto toNoteDto(Note note) {
        return new NoteDto(note.getId(), note.getTitle(), note.getContent(), note.getCreatedAt(), note.getUpdatedAt());
    }

    public static Note toNote (NoteDto noteDto) {
        Note note = new Note();
        note.setId(noteDto.id());
        note.setTitle(noteDto.title());
        note.setContent(noteDto.content());
        note.setCreatedAt(noteDto.createdAt());
        note.setUpdatedAt(noteDto.updatedAt());
        return note;
    }
}
