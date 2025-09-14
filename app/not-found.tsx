import { Metadata } from "next";
import Link from "next/link";
import css from "@/app/home.module.css";

export const metadata: Metadata = {
  title: "NoteHub 404",
  description: "Page Not Found",
  openGraph: {
    title: "NOTEHUB 404",
    description:
      "Page Not Found",
    url: "https://notehub.versel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NOTEHUB",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
