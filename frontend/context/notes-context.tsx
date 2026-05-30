"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notesService, Note, NotePayload, NotesQuery } from "@/services/notes.service";
import { useAuth } from "@/context/auth-context";

interface NotesContextType {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: NotesQuery["sortBy"];
  setSortBy: (s: NotesQuery["sortBy"]) => void;
  order: NotesQuery["order"];
  setOrder: (o: NotesQuery["order"]) => void;
  addNote: (payload: NotePayload) => Promise<void>;
  updateNote: (id: string, payload: NotePayload) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  getNoteById: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<NotesQuery["sortBy"]>("createdAt");
  const [order, setOrder] = useState<NotesQuery["order"]>("desc");

  const queryKey = ["notes", searchQuery, sortBy, order];

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: () => notesService.getAll({ search: searchQuery, sortBy, order }),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: notesService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NotePayload }) =>
      notesService.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: notesService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const addNote = async (payload: NotePayload) => {
    await createMutation.mutateAsync(payload);
  };

  const updateNote = async (id: string, payload: NotePayload) => {
    await updateMutation.mutateAsync({ id, payload });
  };

  const deleteNote = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const getNoteById = (id: string) => notes.find((n) => n._id === id);

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        isError,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        order,
        setOrder,
        addNote,
        updateNote,
        deleteNote,
        getNoteById,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
}
