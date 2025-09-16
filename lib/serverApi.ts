import { cookies } from "next/headers"
import { api } from "./api";
import type { Note } from "@/types/note";

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: `token=${token}`, 
    },
  });

  return response.data;
}

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await api.get('/auth/session', {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};