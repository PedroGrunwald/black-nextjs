// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  timestamp:Date
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const timestamp = new Date()
  res.status(200).json({ name: 'John Doe', timestamp })
}
