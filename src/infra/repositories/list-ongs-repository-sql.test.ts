// import { GenerateRandomString } from '../../utils/helpers/generate-random-string'
import { GenerateRandomString } from '../../utils/helpers/generate-random-string'
import { db } from '../helpers/pg-promise-helper'
import { ListOngsRepository } from './list-ongs-repository-sql'

async function makeFakeOng () {
  return await db.none('INSERT INTO ongs (id, name, email, whatsapp, city, uf) values ($1, $2, $3, $4, $5, $6)',
    [
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      'uf'
    ])
}

describe('ListOngsRepositorySql', () => {
  beforeEach(async () => {
    await db.none('DELETE FROM incidents')
    await db.none('DELETE FROM ongs')
    await makeFakeOng()
    await makeFakeOng()
    await makeFakeOng()
  })

  afterEach(async () => {
    await db.none('DELETE FROM incidents')
    await db.none('DELETE FROM ongs')
  })

  it('returns ongs on success', async () => {
    const sut = ListOngsRepository()

    const ongs = await sut.perform()

    expect(ongs).toBeTruthy()
    expect(ongs).toHaveLength(3)
  })
})
