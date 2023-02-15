import { Dayjs } from "dayjs"

export type NoteMeta = {
  /**
   * 显示的笔记title
   */
  fileName : string

  /**
   * 发布后的路径
   */
  slug: string
  /**
   * 笔记的全路径
   */
  filePath: string
  /**
   * 最后一次更新时间
   */
  updateTime: string
  /**
   * 内容
   */
  content: string
}
