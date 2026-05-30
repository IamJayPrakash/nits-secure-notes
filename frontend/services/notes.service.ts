import api from "./api";
import { encryptNote, decryptNote } from "@/utils/crypto";

export interface Note {
  _id: string;
  title: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotePayload {
  title: string;
  description: string;
}

export interface NotesQuery {
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "title";
  order?: "asc" | "desc";
}

export const notesService = {
  // Fetch all notes, then decrypt each one before returning to the UI
  getAll: async (params?: NotesQuery): Promise<Note[]> => {
    const res = await api.get<{ success: boolean; data: Note[] }>("/notes", { params });
    return res.data.data.map(decryptNote);
  },

  // Fetch a single note by ID, then decrypt it
  getById: async (id: string): Promise<Note> => {
    const res = await api.get<{ success: boolean; data: Note }>(`/notes/${id}`);
    return decryptNote(res.data.data);
  },

  // Encrypt the note content BEFORE sending it to the server
  create: async (payload: NotePayload): Promise<Note> => {
    const encrypted = encryptNote(payload);
    const res = await api.post<{ success: boolean; data: Note }>("/notes", encrypted);
    return decryptNote(res.data.data);
  },

  // Encrypt on update too — server always stores ciphertext
  update: async (id: string, payload: NotePayload): Promise<Note> => {
    const encrypted = encryptNote(payload);
    const res = await api.put<{ success: boolean; data: Note }>(`/notes/${id}`, encrypted);
    return decryptNote(res.data.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};
