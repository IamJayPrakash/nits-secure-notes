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
  sortBy?: "createdAt" | "updatedAt";
  order?: "asc" | "desc";
}

export const notesService = {
  getAll: async (params?: NotesQuery): Promise<Note[]> => {
    const res = await api.get<{ success: boolean; data: Note[] }>("/notes", { params });
    return res.data.data.map(decryptNote);
  },

  getById: async (id: string): Promise<Note> => {
    const res = await api.get<{ success: boolean; data: Note }>(`/notes/${id}`);
    return decryptNote(res.data.data);
  },

  create: async (payload: NotePayload): Promise<Note> => {
    const encrypted = encryptNote(payload);
    const res = await api.post<{ success: boolean; data: Note }>("/notes", encrypted);
    return decryptNote(res.data.data);
  },

  update: async (id: string, payload: NotePayload): Promise<Note> => {
    const encrypted = encryptNote(payload);
    const res = await api.put<{ success: boolean; data: Note }>(`/notes/${id}`, encrypted);
    return decryptNote(res.data.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};
