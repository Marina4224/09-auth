import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";


export default function Header() {
  const userEmail = "user@example.com"; 

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.navigationLink}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
          <AuthNavigation userEmail={userEmail} />
        </ul>
      </nav>
    </header>
  );
}