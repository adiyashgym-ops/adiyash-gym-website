import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false })
  }

  const sessionSecret = process.env.ADMIN_SESSION_SECRET
  const token = typeof req.body?.token === 'string' ? req.body.token : ''
  const [expires, signature] = token.split('.')

  if (!sessionSecret || !expires || !signature) {
    return res.status(200).json({ valid: false })
  }

  if (Date.now() > Number(expires)) {
    return res.status(200).json({ valid: false })
  }

  const expectedSignature = crypto
    .createHmac('sha256', sessionSecret)
    .update(expires)
    .digest('hex')

  const expectedBuffer = Buffer.from(expectedSignature)
  const givenBuffer = Buffer.from(signature)

  const valid =
    expectedBuffer.length === givenBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, givenBuffer)

  return res.status(200).json({ valid })
}
