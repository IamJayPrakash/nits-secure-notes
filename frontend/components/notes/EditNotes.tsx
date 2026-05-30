"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useNotes } from "@/context/notes-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteSchema, NoteInput } from "@/utils/validations/note";
import { Card } from "@/components/ui/card";
import CustomInputField from "@/components/common/CustomInputField";
import CommonButton from "@/components/common/CommonButton";
import CommonErrorField from "@/components/common/CommonErrorField";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit3, AlertCircle } from "lucide-react";
import Link from "next/link";

const EditNotes = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { getNoteById, updateNote } = useNotes();
  const [loading, setLoading] = useState(false);

  const note = id ? getNoteById(id) : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
  });

  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        description: note.description,
      });
    }
  }, [note, reset]);

  const onSubmit = async (data: NoteInput) => {
    if (!id) return;
    setLoading(true);
    try {
      await updateNote(id, { title: data.title, description: data.description });
      toast.success("Note updated successfully!");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  if (!id || !note) {
    return (
      <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <Card className="p-8 border border-slate-100 shadow-md bg-white rounded-2xl text-center flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Note Not Found</h2>
            <p className="text-sm text-slate-500 mt-2 mb-6">
              The note you are trying to edit does not exist or may have been deleted.
            </p>
            <Link href="/dashboard" className="w-full">
              <CommonButton variant="outline" className="w-full rounded-xl cursor-pointer">
                Back to Dashboard
              </CommonButton>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Card className="p-8 border border-slate-100 shadow-md bg-white rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
              <Edit3 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Edit Note</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <CustomInputField
              id="title"
              label="Note Title"
              type="text"
              placeholder="Enter a descriptive title..."
              error={errors.title?.message}
              {...register("title")}
            />

            <div className="space-y-1.5 w-full">
              <Label htmlFor="description" className="text-sm font-semibold text-slate-700">
                Note Description
              </Label>
              <textarea
                id="description"
                placeholder="Write your note contents here..."
                rows={5}
                className={`w-full bg-slate-50/70 border border-slate-200 rounded-lg p-3 text-sm focus:bg-white focus:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/50 focus-visible:border-primary transition-all resize-y ${
                  errors.description ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive" : ""
                }`}
                {...register("description")}
              />
              <CommonErrorField message={errors.description?.message} />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <CommonButton
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="px-5 py-5 rounded-xl cursor-pointer"
              >
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                variant="default"
                loading={loading}
                className="px-5 py-5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl cursor-pointer"
              >
                Update Note
              </CommonButton>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EditNotes;
