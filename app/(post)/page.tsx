import { getAllNotes } from "../../lib/note";
import { md } from '../../lib/markdown';

export default function Home() {
  const noteFiltered = getAllNotes().filter(note => note.fileName === 'README');

  const note = noteFiltered[0];

  const html = {
    __html: md.render(note.content)
  };
  return <main>
    <article>
      <section dangerouslySetInnerHTML={html}></section>
    </article>
  </main>
}
