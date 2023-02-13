import Mdit from 'markdown-it';
import wikilinks from 'markdown-it-wikitext';
import { getAllNotes } from "../../../lib/note";


type Ctx = {
  params: {
    path: [string]
  }
}


const md = Mdit().use(wikilinks({
  uriSuffix: '',
}));


export default function Page({ params } : Ctx) {
  const { path } = params;
  const pathStr = path.map(decodeURI ).join('/');

  const noteFiltered = getAllNotes().filter(note => note.fileName === pathStr);

  if (noteFiltered.length !== 1) {
    console.error(pathStr, '没找到');
    return <div>404</div>
  }

  const note = noteFiltered[0];
  
  const html = {
    __html : md.render(note.content)
  };
  return <>
    <h1>{note.fileName}</h1>
    <div>更新于: {note.updateTime.toNow()}</div>

    <div dangerouslySetInnerHTML={html}>
    </div>
  </>
}

export function generateStaticParams() {
  return getAllNotes().map((post) => ({
    path: post.fileName.split('/')
  }));
}
