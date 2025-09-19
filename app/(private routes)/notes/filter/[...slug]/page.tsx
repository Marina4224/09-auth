import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
  const { slug } = await params;
  const tag = slug[0];
    return {
        title: `Notes filtered by: ${tag}`,
    description: `Browse notes filtered by category: ${tag}`,
    openGraph: {
      title: `Notes filtered by: ${tag}`,
      description: `Browse notes filtered by category: ${tag}`,
      url: `https://notehub.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Filter ${tag}`,
                },],
        }
    }
}


export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { query: "", page: 1, tag: tag }],
    queryFn: () => fetchNotes({ search: "", page: 1, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
