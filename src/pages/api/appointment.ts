import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { APPOINTMENT_URL } from '@lib/api-urls'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let url = APPOINTMENT_URL
    if (req.query.id) {
      url += `/${req.query.id}`
    }

    if (req.method === 'POST') {
      const response = await axios.post(url, req.body, {
        headers: { Authorization: `Bearer ${req.cookies.auth}` },
      })
      res.status(200).json(response.data)
      return
    }

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${req.cookies.auth}` },
    })
    res.status(200).json(response.data)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(200).json({ message: e.message })
  }
}
