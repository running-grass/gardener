import Link from "next/link";
import { getAllNotes } from "../../lib/note";



export default function Home() {
  const notes = getAllNotes();
  
  return <>
    <div className="prose lg:prose-xl">
      <h1>我是小花匠</h1>
      <section>
        <header>所有文章</header>
        <ul>
          {notes.map(note => <li key={note.filePath}>
            <Link href={note.fileName}>{note.fileName}</Link>
          </li>)}
        </ul>
      </section>
    </div>
  </>
}
