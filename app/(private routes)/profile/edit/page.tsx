'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from '@/app/(private routes)/profile/edit/EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUsername } from '@/lib/api/clientApi';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  // Встановлюємо початкове значення username
  useEffect(() => {
    if (user) setUsername(user.username);
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      if (!user) throw new Error('User not found');
      const updatedUser = await updateUsername({ username }); // запит на API
      setUser(updatedUser); // оновлюємо глобальний стан
      router.push('/profile'); // редірект на сторінку профілю
    } catch (err) {
      setError((err as Error).message || 'Failed to update username');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (!user) return null; // поки user не завантажений

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}