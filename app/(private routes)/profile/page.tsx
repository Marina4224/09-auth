'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './ProfilePage.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  // Якщо користувач не авторизований — можна редіректнути
  if (!isAuthenticated) {
    router.push('/sign-in');
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <button
            className={css.editProfileButton}
            onClick={() => router.push('/profile/edit')}
          >
            Edit Profile
          </button>
        </div>

        <div className={css.avatarWrapper}>
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          ) : (
            <div className={css.avatarPlaceholder}>No Avatar</div>
          )}
        </div>

        <div className={css.profileInfo}>
          <p>
            Username: {user?.username ?? 'No username'}
          </p>
          <p>
            Email: {user?.email ?? 'No email'}
          </p>
        </div>
      </div>
    </main>
  );
}