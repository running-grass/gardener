import { getAllNotes } from '@/lib/note';
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const allNote = getAllNotes().map(it => ({
    fileName: it.fileName
  }));
  res.status(200).json(allNote)
}
