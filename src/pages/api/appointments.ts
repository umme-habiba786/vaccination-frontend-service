import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { USER_APPOINTMENT_URL } from '@lib/api-urls'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(USER_APPOINTMENT_URL, {
      headers: { Authorization: `Bearer ${req.cookies.auth}` },
    })
    res.status(200).json(response.data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(200).json({ message: e.message })
  }
}
