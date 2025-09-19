import { nextServer } from "@/lib/api/api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import { FetchNotesProps, FetchNotesResponse } from './serverApi';

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};  

export type LoginRequest = {
  email: string;
  password: string;
};

interface UpdateUsernameParams {
  username: string;
}

export type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get<User>('users/me');
  return res.data;
};
export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const res = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return res.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};

export async function updateUsername(data: UpdateUsernameParams): Promise<User> {
  const res = await nextServer.patch<User>('/users/me', data)
  return res.data;
}

export async function createNote(newNote: CreateNoteParams): Promise<Note> {
  const res = await nextServer.post<Note>("/notes", newNote);
  return res.data;
};

export async function deleteNote(id: string): Promise<Note> {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};