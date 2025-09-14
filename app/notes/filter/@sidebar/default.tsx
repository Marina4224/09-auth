import Link from "next/link";
import css from "./SidebarNotes.module.css";
import type { NoteTag } from "@/types/note";

export default async function SidebarNotes() {
  const tags: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link className={css.menuLink} href={`/notes/filter/All`}>
          All notes
        </Link>
      </li>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link className={css.menuLink} href={`/notes/filter/${tag}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
