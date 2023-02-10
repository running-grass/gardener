import { existsSync, readFileSync } from "fs";
import { env } from "process";
import Mdit from 'markdown-it';
import wikilinks from 'markdown-it-wikitext';
import { getNotes } from "../../lib/note";

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
  const filePath = env.PWD + '/notes/'  + pathStr + '.md';

  if (!existsSync(filePath)) {
    return <div>404</div>
  }

  const fileContent = readFileSync(filePath).toString('utf-8');
  
  const html = {
    __html : md.render(fileContent)
  };
  return <>
    <div className="prose lg:prose-xl" dangerouslySetInnerHTML={html}>
    </div>
  </>
}

export function generateStaticParams() {
  const posts = getNotes()
  return posts.map((post) => ({
    path: post.split('/'),
  }));
}
