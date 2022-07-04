import crypto from 'crypto'
import { db } from '../helpers/pg-promise-helper'

function ListOngsRepository () {
  async function perform () {
    return db.many('SELECT * FROM ongs')
  }
  return {
    perform
  }
}

function generateRandomString (length: number = 20) {
  return crypto.randomBytes(length).toString('hex')
}

async function makeFakeOng () {
  await db.none('INSERT INTO ongs (id, name, email, whatsapp, city, uf) values ($1, $2, $3, $4, $5, $6)',
    [generateRandomString(),
      generateRandomString(),
      generateRandomString(),
      generateRandomString(),
      generateRandomString(),
      generateRandomString(1)
    ])
}

describe('ListOngsRepositorySql', () => {
  beforeEach(async () => {
    await makeFakeOng()
    await makeFakeOng()
    await makeFakeOng()
  })

  afterEach(async () => {
    await db.none('DELETE FROM ongs')
  })

  it('returns ongs on success', async () => {
    const sut = ListOngsRepository()

    const ongs = await sut.perform()

    expect(ongs).toBeTruthy()
    expect(ongs).toHaveLength(3)
  })
})
