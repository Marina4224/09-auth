import { api } from "@/lib/api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";



export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export interface SignUpParams {
  email: string;
  password: string;
}
export interface Category {
  id: string;
  name: string;
}

export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/categories");
  return response.data;
}
export async function signUpUser(data: SignUpParams): Promise<User> {
  const response = await api.post<User>("/auth/sign-up", data);
  return response.data;
}
export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const response = await api.get<FetchNotesResponse>("/notes", { params });
  return response.data;
}

export type CreateNoteInput = Omit<Note, "id" | "createdAt" | "updatedAt">;

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}