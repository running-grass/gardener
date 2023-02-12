import { Dayjs } from "dayjs"

export type NoteMeta = {
  fileName : string 
  filePath: string
  updateTime: Dayjs
  content: string
}