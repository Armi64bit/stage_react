import { Note } from "../models/note";
import axiosInstance from "../utils/axiosInstance";

async function fetchData(iput: RequestInfo, inti?: RequestInit) {
  const response = await fetch(iput, inti);
  if (!response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}
export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await axiosInstance.get("/api/notes");
    return response.data.notes;
  } catch (error) {
    throw new Error("Failed to fetch notes");
  }
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  try {
    const response = await axiosInstance.post("/api/notes", note);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create note");
  }
}
export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  try {
    await axiosInstance.delete(`/api/notes/${noteId}`);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
