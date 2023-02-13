import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import './globals.css';
import { AnalyticsWrapper } from './components/analytics';
import { generateRssFeed } from "../../lib/rss";

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

generateRssFeed();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head />
      <body className="p-4 prose lg:prose-xl" >
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
};