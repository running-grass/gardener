import { execSync } from "child_process";
import dayjs from "dayjs";
import { existsSync, readdirSync, readFileSync } from "fs";
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

let allNotes: NoteMeta[] = [];
export const getAllNotes: () => NoteMeta[] = () => {
  if (allNotes.length === 0) {
    allNotes = getChildrens(noteRoot).map(absPath => {
      return {
        filePath: absPath,
        fileName: path.relative(noteRoot, absPath).replace('.md', ''),
        slug: path.relative(noteRoot, absPath).replace('.md', ''),
        updateTime: dayjs(getUpdateTime(absPath)),
        content: readFileSync(absPath).toString('utf-8'),
      }
    })
  }

  return allNotes
}

// export const allNotes = getAllNotes();