import Link from "next/link";
import css from "./AuthNavigation.module.css";

interface AuthNavigationProps {
  userEmail?: string; 
}
export default function AuthNavigation({ userEmail }: AuthNavigationProps) {
  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink} prefetch={false}>
          Profile
        </Link>
      </li>
          {userEmail && (
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{userEmail}</p>
          <button className={css.logoutButton}>Logout</button>
        </li>
      )}
      <li className={css.navigationItem}>
        <p className={css.userEmail}>User email</p>
        <button className={css.logoutButton}>Logout</button>
      </li>

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
  );
}
