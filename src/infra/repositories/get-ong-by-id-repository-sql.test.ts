import { OngModel } from '../../domain/models/ong'
import { GenerateRandomString } from '../../utils/helpers/generate-random-string'
import { db } from '../helpers/pg-promise-helper'

function GetOngByIdRepository () {
  async function perform (ongId: string): Promise<OngModel | null> {
    return await db.oneOrNone<OngModel | null>('SELECT * FROM ongs WHERE id = $1', ongId)
  }
  return {
    perform
  }
}

describe('GetOngByIdRepository', () => {
  let ongId: string

  beforeEach(async () => {
    const { id } = await db.one<OngModel>('INSERT INTO ongs (id, name, email, whatsapp, city, uf) VALUES ($1, $2, $3, $4, $5, $6) returning *', [
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      'uf'
    ])

    ongId = id
  })

  afterAll(async () => {
    await db.none('DELETE FROM ongs')
  })

  it('retuns an ong', async () => {
    const getOngByIdRepository = GetOngByIdRepository()

    const ong = await getOngByIdRepository.perform(ongId)

    expect(ong).toBeTruthy()
  })
})
