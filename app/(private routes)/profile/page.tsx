import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi"; 
import Image from "next/image";
import css from "./ProfilePage.module.css";
import { redirect } from "next/navigation";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile | NoteHub",
    description: "View and edit your profile information.",
    openGraph: {
      title: "Profile | NoteHub",
      description: "View and edit your profile information.",
      type: "website",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
    
        <div className={css.avatarWrapper}>
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
              priority
            />
          ) : (
            <div className={css.avatarPlaceholder}>No Avatar</div>
          )}
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username ?? "No username"}</p>
          <p>Email: {user.email ?? "No email"}</p>
        </div>
      </div>
    </main>
  );
}