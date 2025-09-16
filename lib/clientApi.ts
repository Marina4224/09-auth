import { api } from "@/lib/api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";



export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

export interface SignUpParams {
  email: string;
  password: string;
};
export interface Category {
  id: string;
  name: string;
};

export interface SignInParams {
  email: string;
  password: string;
};

export const getNotes = async (page = 1, perPage = 12): Promise<Note[]> => {
  const res = await api.get("/notes", { params: { page, perPage } });
  return res.data;
};

export async function signInUser(data: SignInParams): Promise<User> {
  const response = await api.post<User>("/auth/sign-in", data, {
    withCredentials: true, 
  });
  return response.data;
};
export async function getCategories(): Promise<Category[]> {
  const response = await api.get<Category[]>("/categories");
  return response.data;
};
export async function signUpUser(data: SignUpParams): Promise<User> {
  const response = await api.post<User>("/auth/sign-up", data);
  return response.data;
};
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
};

export type CreateNoteInput = Omit<Note, "id" | "createdAt" | "updatedAt">;

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const response = await api.post<Note>("/notes", newNote);
  return response.data;
};

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await api.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};
export const getMe = async () => {
  const { data } = await api.get<User>('/auth/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
};

interface UpdateUsernameParams {
  username: string;
}

export async function updateUsername(data: UpdateUsernameParams): Promise<User> {
  const response = await api.put<User>('/users/update-username', data, {
    withCredentials: true, 
  });
  return response.data;
}