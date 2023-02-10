import { existsSync, readdirSync } from "fs"
import Link from "next/link";
import path from "path";
import { env } from "process";
import { getNotes } from "../lib/note";



export default function Home() {
  const notes = getNotes();

  return <>
    <div className="prose lg:prose-xl">
      <h1>我是小花匠</h1>
      <section>
        <header>所有文章</header>
        <ul>
          {notes.map(note => <li key={note}>
            <Link href={note}>{note}</Link>
          </li>)}
        </ul>
      </section>
    </div>
  </>
}
