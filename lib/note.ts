import fs, { existsSync, readdirSync } from "fs";
import path from "path";
import { env } from "process";


const getChildrens = (path: string) => {
  if (!existsSync(path)) {
    return []
  }
  const childNames = readdirSync(path);;

  const arr = []
  for (const name of childNames) {
    const childPath = `${path}/${name}`;
    if (fs.statSync(childPath).isDirectory()) {
      const childChild = getChildrens(childPath);
      childChild?.forEach(f => arr.push(f));
    } else {
      arr.push(childPath);
    }
  }

  return arr;
}

/**
 * 获取所有笔记的相对路径名，不包括
 * @returns 相对目录
 */
export const getNotes = () => {
  const path1 = env.PWD + '/notes';
  return getChildrens(path1).map(f => path.relative(path1, f).replace('.md', ''));
}