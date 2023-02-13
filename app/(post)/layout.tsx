import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

import './globals.css';
import { AnalyticsWrapper } from './components/analytics';
import { generateRssFeed } from "../../lib/rss";

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

generateRssFeed();

function Footer() {
  const rssImage = "https://cdn.sspai.com/2020/08/26/article/7aa30a38350fe1111ab32aeb5bc87aa5?imageView2/2/w/1120/q/90/interlace/1/ignore-error/1";
  return <footer>
    <p className="flex justify-center items-center">

    Copyright © 2023-Now · Powered by Next.js · <a target="_blank" href="/rss/feed.xml"><img alt="rss" src={rssImage} /></a>
    </p>
  </footer>
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head />
      <body className="p-4 prose lg:prose-xl m-auto" >
        {children}
        <AnalyticsWrapper />
        <Footer />
      </body>
    </html>
  )
};