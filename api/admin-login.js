import crypto from 'crypto'

const SESSION_HOURS = 8

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!adminPassword || !sessionSecret) {
    console.error('Admin auth environment variables are missing.')
    return res.status(500).json({ success: false, message: 'Admin login is not configured.' })
  }

  const password = typeof req.body?.password === 'string' ? req.body.password : ''

  if (password !== adminPassword) {
    return res.status(401).json({ success: false, message: 'Wrong password.' })
  }

  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000
  const signature = crypto
    .createHmac('sha256', sessionSecret)
    .update(String(expires))
    .digest('hex')

  return res.status(200).json({ success: true, token: `${expires}.${signature}` })
}
