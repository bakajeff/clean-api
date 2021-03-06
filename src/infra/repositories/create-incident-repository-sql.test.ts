import { IncidentType } from '../../domain/models/incident'
import { OngModel } from '../../domain/models/ong'
import { GenerateRandomString } from '../../utils/helpers/generate-random-string'
import { db } from '../helpers/pg-promise-helper'
import { CreateIncidentRepository } from './create-incident-repository-sql'

function makeFakeIncidentData (ongId: string): IncidentType {
  return {
    title: GenerateRandomString(),
    description: GenerateRandomString(),
    value: Math.random() * 2.5,
    ongId
  }
}

describe('CreateIncidentRepository', () => {
  const uniqueIdGenerator = { perform: jest.fn().mockReturnValue(GenerateRandomString()) }
  let ong:OngModel

  beforeEach(async () => {
    await db.none('DELETE FROM incidents')
    await db.none('DELETE FROM ongs')

    ong = await db.one('INSERT INTO ongs (id, name, email, whatsapp, city, uf) VALUES ($1, $2, $3, $4, $5, $6) returning *', [
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      GenerateRandomString(),
      'uf'
    ])
  })

  afterEach(async () => {
    await db.none('DELETE FROM incidents')
    await db.none('DELETE FROM ongs')
  })

  it('calls UniqueIdGenerator once', async () => {
    const sut = CreateIncidentRepository(uniqueIdGenerator)
    const uniqueIdGeneratorSpy = jest.spyOn(uniqueIdGenerator, 'perform')

    await sut.perform(makeFakeIncidentData(ong.id))

    expect(uniqueIdGeneratorSpy).toHaveBeenCalledTimes(1)
  })
  it('throws if UniqueIdGenerator throws', async () => {
    const sut = CreateIncidentRepository(uniqueIdGenerator)
    jest.spyOn(uniqueIdGenerator, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(makeFakeIncidentData(ong.id))

    expect(promise).rejects.toThrow()
  })
  it('returns a valid incident', async () => {
    const sut = CreateIncidentRepository(uniqueIdGenerator)
    const fakeIncident = makeFakeIncidentData(ong.id)

    const incident = await sut.perform(fakeIncident)

    expect(incident).toBeTruthy()
    expect(incident.id).toBeTruthy()
    expect(incident.title).toBe(fakeIncident.title)
    expect(incident.description).toBe(fakeIncident.description)
    expect(incident.value).toBe(fakeIncident.value)
    expect(incident.ongId).toBe(fakeIncident.ongId)

    await db.none('DELETE FROM incidents')
    await db.none('DELETE FROM ongs WHERE id = $1', ong.id)
  })
})
