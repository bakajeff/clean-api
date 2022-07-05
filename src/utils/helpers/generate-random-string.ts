import crypto from 'crypto'

export function GenerateRandomString () {
  return crypto.randomBytes(20).toString('hex')
}
