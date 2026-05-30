"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Note {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, description: string) => void;
  updateNote: (id: string, title: string, description: string) => void;
  deleteNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const DEFAULT_NOTES: Note[] = [
  {
    id: "default-1",
    title: "Welcome to Secure Notes",
    description: "This is your dashboard. Here you can search, create, edit, or delete notes securely. All notes are saved automatically in your local storage.",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  },
  {
    id: "default-2",
    title: "Project Architecture Tasks",
    description: "Design and implement custom input fields, setup Next.js server middleware for route protection, write client forms using react-hook-form, and enforce strict Zod verification.",
    createdAt: new Date(Date.now() - 3600000 * 4).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  },
  {
    id: "default-3",
    title: "Tailwind Typography Styling",
    description: "Use tailwind typography plugin (prose class) to automatically style rich text content, layout lists, quotes, and standard headings consistently across the app.",
    createdAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  },
];

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("secure_notes");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotes(JSON.parse(stored));
      } else {
         
        setNotes(DEFAULT_NOTES);
        localStorage.setItem("secure_notes", JSON.stringify(DEFAULT_NOTES));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
       
      setNotes(DEFAULT_NOTES);
    }
    setIsLoaded(true);
  }, []);

  // Save notes to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("secure_notes", JSON.stringify(notes));
      } catch (e) {
        console.error("Error writing to localStorage", e);
      }
    }
  }, [notes, isLoaded]);

  const addNote = (title: string, description: string) => {
    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, title: string, description: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              title,
              description,
              createdAt: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const getNoteById = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, getNoteById }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
