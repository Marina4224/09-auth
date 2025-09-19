
import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>
export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});



// export type User = {
//   id: string;
//   email: string;
//   userName?: string;
//   photoUrl?: string;
//   createdAt: Date;
//   updatedAt: Date;
// };




