import { execSync } from "child_process";
import dayjs from "dayjs";
import fs, { existsSync, fstat, readdirSync, readFileSync } from "fs";
import path from "path";
import { NoteMeta } from "./types";


const projectRoot = process.cwd();
const noteRoot = path.resolve(projectRoot, 'notes')

const getChildrens = (path: string) => {
  if (!existsSync(path)) {
    return []
  }
  const childNames = readdirSync(path, { withFileTypes: true });

  const arr = []
  for (const child of childNames) {
    if (child.name.startsWith('.')) {
      continue;
    }

    const childPath = `${path}/${child.name}`;

    if (child.isDirectory()) {
      const childChild = getChildrens(childPath);
      childChild?.forEach(f => arr.push(f));
    } else {
      arr.push(childPath);
    }
  }

  return arr;
}

export const getUpdateTime = (absPath: string) => {
  const t = execSync(`git log -n 1 --pretty="%ci" --  ${absPath}`, {
    cwd: path.resolve(process.cwd(), 'notes'),
  }).toString();
  return t;
}

let cachePath = './public/cache/notes.json';
let allNotes: NoteMeta[] = [];
export const getAllNotes: () => NoteMeta[] = () => {

  if (!fs.existsSync(cachePath)) {
    console.log('重新读取文件');
    allNotes = getChildrens(noteRoot).map(absPath => {
      return {
        filePath: absPath,
        fileName: path.relative(noteRoot, absPath).replace('.md', ''),
        slug: path.relative(noteRoot, absPath).replace('.md', ''),
        updateTime: dayjs(getUpdateTime(absPath)).format("YYYY-MM-DD HH:mm"),
        content: readFileSync(absPath).toString('utf-8'),
      }
    })


    fs.mkdirSync("./public/cache", { recursive: true });
    fs.writeFileSync("./public/cache/notes.json", JSON.stringify(allNotes));
  }

  return JSON.parse(fs.readFileSync(cachePath).toString('utf-8'));
}

// export const allNotes = getAllNotes();
