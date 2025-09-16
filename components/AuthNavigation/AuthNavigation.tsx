'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/clientApi';
import css from "./AuthNavigation.module.css";

interface AuthNavigationProps {
  userEmail?: string; 
}

const AuthNavigation = ({ userEmail }: AuthNavigationProps) => {
  const router = useRouter();
  const { isAuthenticated, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

    return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" className={css.navigationLink} prefetch={false}>
              Profile
            </Link>
          </li>
          {userEmail && (
            <li className={css.navigationItem}>
              <p className={css.userEmail}>{userEmail}</p>
              <button onClick={handleLogout} className={css.logoutButton}>
                Logout
              </button>
            </li>
          )}
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" className={css.navigationLink} prefetch={false}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;