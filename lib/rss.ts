import fs from "fs";
import { Feed } from "feed";
import { getAllNotes } from "./note";

let _feed: Feed | null = null

// export const generateSearchFile = async () => {
//   getA
// }

export const generateRssFeed = async () => {

  if (_feed) return _feed;

  const posts = await getAllNotes();
  const siteURL = process.env.SITE_URL || '';
  const date = new Date();
  const author = {
    name: "奔跑的小草",
    email: "467195537@qq.com",
    link: "https://grass.show/",
  };

  const feed = new Feed({
    title: "孤单的花园",
    description: "",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date,
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });
  posts.slice(0, 20).forEach((post) => {
    const url = `${siteURL}/${post.slug}`;
    feed.addItem({
      title: post.fileName,
      id: url,
      link: url,
      description: post.fileName,
      content: post.fileName,
      author: [author],
      contributor: [author],
      date: new Date(post.updateTime),
    });
  });

  _feed = feed;

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());

  return _feed;
};
