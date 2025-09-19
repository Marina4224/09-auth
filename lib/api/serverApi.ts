import { cookies } from "next/headers"
import { nextServer } from "@/lib/api/api";
import type { Note } from "@/types/note";
import { User } from '@/types/user';


export interface FetchNotesProps {
  search?: string;
  page?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async ({ search, page, tag }: FetchNotesProps) => {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      ...(search !== '' && { search }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies(); 
  const { data } = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export const checkServerSession = async () => {
    const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
    return data.success;
};

export const getMe = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};