import type { Note } from "@/lib/types";
import apiClient from "./AxiosApiService";

export async function fetchNotesApi(page: number, size: number) {
  return apiClient.get(`/api/notes?page=${page}&size=${size}`);
}

export async function createNoteApi(note: Omit<Note, "id" | "createdAt">) {
  return apiClient.post("/api/notes", note);
}

export async function deleteNoteApi(id: string) {
  return apiClient.delete(`/api/notes/${id}`);
}

export async function updateNoteApi(id: string, note: Note) {
  return apiClient.put(`/api/notes/${id}`, note);
}

export async function fetchNoteByIdApi(id: string) {
  return apiClient.get(`/api/notes/${id}`);
}