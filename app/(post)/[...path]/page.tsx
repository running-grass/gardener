import { getAllNotes } from "../../../lib/note";
import { md } from '../../../lib/markdown';

type Ctx = {
  params: {
    path: [string]
  }
}

export default function Page({ params }: Ctx) {
  const { path } = params;
  const pathStr = path.map(decodeURI).join('/');

  const noteFiltered = getAllNotes().filter(note => note.fileName === pathStr);

  if (noteFiltered.length !== 1) {
    console.error(pathStr, '没找到');
    return <div>404</div>
  }

  const note = noteFiltered[0];

  const html = {
    __html: md.render(note.content)
  };
  return <main>
    <article>
      <header>
        <h1>{note.fileName}</h1>
        <section className='flex justify-between'>
          <address>
            作者：
            <a href="https://grass.show/">奔跑的小草</a>
          </address>
          <span>更新于: <time>{note.updateTime}</time> </span>
        </section>
      </header>

      <section dangerouslySetInnerHTML={html}></section>

    </article>
  </main>
}

export function generateStaticParams() {
  return getAllNotes().map((post) => ({
    path: post.fileName.split('/')
  }));
}
