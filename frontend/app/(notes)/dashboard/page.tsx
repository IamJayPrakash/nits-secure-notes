"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotes } from "@/context/notes-context";
import { Plus, Search, Trash2, Edit3, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import CommonButton from "@/components/common/CommonButton";
import CustomInputField from "@/components/common/CustomInputField";
import CommonConfirmModal from "@/components/common/CommonConfirmModal";
import { toast } from "sonner";

const ListNotes = () => {
  const router = useRouter();
  const { notes, deleteNote } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [noteToDelete, setNoteToDelete] = useState<{ id: string; title: string } | null>(null);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation(); // Prevent card navigation
    setNoteToDelete({ id, title });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        
        {/* Action Header bar: Add Note + Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <Link href="/create-notes" className="shrink-0">
            <CommonButton
              variant="default"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/95 px-5 py-6 rounded-xl font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Plus className="h-5 w-5" />
              <span>Add Note</span>
            </CommonButton>
          </Link>

          <CustomInputField
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-slate-400" />}
            wrapperClassName="flex-1"
            className="w-full bg-white border border-slate-200 focus-visible:ring-primary rounded-xl py-6 shadow-xs text-sm text-slate-800 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Notes list */}
        <div className="space-y-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Card
                key={note.id}
                onClick={() => router.push(`/edit-notes?id=${note.id}`)}
                className="group relative p-6 border border-slate-100 hover:border-primary/20 bg-white rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex gap-4 items-start"
              >
                {/* File/Doc Icon visual */}
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-slate-50 text-slate-500 group-hover:bg-primary/5 group-hover:text-primary transition-colors shrink-0">
                  <FileText className="h-6 w-6" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0 pr-12">
                  <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-snug group-hover:text-primary transition-colors truncate">
                    {note.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {note.description}
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-slate-400 mt-3 tracking-wide uppercase bg-slate-100/50 px-2 py-0.5 rounded-md">
                    {note.createdAt}
                  </span>
                </div>

                {/* Card Actions Hover */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <CommonButton
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/edit-notes?id=${note.id}`);
                    }}
                    className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-lg cursor-pointer"
                  >
                    <Edit3 className="h-4 w-4" />
                  </CommonButton>
                  <CommonButton
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDeleteClick(e, note.id, note.title)}
                    className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </CommonButton>
                </div>
              </Card>
            ))
          ) : (
            <Card className="flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-100 rounded-2xl shadow-xs">
              <div className="h-14 w-14 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mb-4">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No notes found</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-xs">
                {searchQuery ? "No matches found for your search query. Try typing something else." : "Create your first secure note to get started!"}
              </p>
              {!searchQuery && (
                <Link href="/create-notes" className="mt-4">
                  <CommonButton variant="outline" size="sm" className="rounded-lg cursor-pointer">
                    Create a Note
                  </CommonButton>
                </Link>
              )}
            </Card>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <CommonConfirmModal
          isOpen={!!noteToDelete}
          onClose={() => setNoteToDelete(null)}
          onConfirm={() => {
            if (noteToDelete) {
              deleteNote(noteToDelete.id);
              toast.success(`"${noteToDelete.title}" deleted successfully.`);
              setNoteToDelete(null);
            }
          }}
          title="Delete Note"
          description={
            <>
              Are you sure you want to delete this note? This action cannot be undone and will permanently delete{" "}
              <strong className="text-slate-800">&quot;{noteToDelete?.title}&quot;</strong>.
            </>
          }
          confirmText="Delete Note"
          variant="destructive"
        />

      </div>
    </div>
  );
};

export default ListNotes;