// import { GenerateRandomString } from '../../utils/helpers/generate-random-string'
import { db } from '../helpers/pg-promise-helper'
import { ListOngsRepository } from './list-ongs-repository-sql'

describe('ListOngsRepositorySql', () => {
  beforeEach(async () => {
    await db.none('DELETE FROM incidents')
    await db.none('DELETE FROM ongs')
    await db.none('INSERT INTO ongs (id, name, email, whatsapp, city, uf) values ($1, $2, $3, $4, $5, $6)',
      [
        'id 1',
        'name 1',
        'email 1',
        'whats 1',
        'city 1',
        'uf'
      ])
    await db.none('INSERT INTO ongs (id, name, email, whatsapp, city, uf) values ($1, $2, $3, $4, $5, $6)',
      [
        'id 2',
        'name 2',
        'email 2',
        'whats 2',
        'city 2',
        'uf'
      ])
    await db.none('INSERT INTO ongs (id, name, email, whatsapp, city, uf) values ($1, $2, $3, $4, $5, $6)',
      [
        'id 3',
        'name 3',
        'email 3',
        'whats 3',
        'city 3',
        'uf'
      ])
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
