import crypto from 'crypto'
import { IncidentModel, IncidentType } from '../../domain/models/incident'
import { OngModel } from '../../domain/models/ong'
import { UniqueIdGeneratorType } from '../../utils/helpers/unique-id-generator-adapter'
import { db } from '../helpers/pg-promise-helper'

function IncidentAdapter () {
  function perform (id: string, title: string, description: string, value: string, ongId: string): IncidentModel {
    const parsedValue = parseFloat(value)

    return {
      id,
      title,
      description,
      value: parsedValue,
      ongId
    }
  }
  return {
    perform
  }
}

function CreateIncidentRepository (uniqueIdGenerator: UniqueIdGeneratorType) {
  async function perform (incident: IncidentType): Promise<IncidentModel> {
    const id = uniqueIdGenerator.perform()
    const newIncident = await db.one('INSERT INTO incidents (id, title, description, value, ong_id) VALUES ($1, $2, $3, $4, $5) returning id, title, description, CAST(value AS DECIMAL), ong_id', [id, incident.title, incident.description, incident.value, incident.ongId])
    return IncidentAdapter().perform(newIncident.id, newIncident.title, newIncident.description, newIncident.value, newIncident.ong_id)
  }
  return {
    perform
  }
}

function generateRandomText () {
  return crypto.randomBytes(20).toString('hex')
}

function makeFakeIncidentData (ongId: string): IncidentType {
  return {
    title: generateRandomText(),
    description: generateRandomText(),
    value: Math.random() * 2.5,
    ongId
  }
}

describe('CreateIncidentRepository', () => {
  const uniqueIdGenerator = { perform: jest.fn().mockReturnValue(generateRandomText()) }
  let ong: OngModel

  beforeEach(async () => {
    ong = await db.one('INSERT INTO ongs (id, name, email, whatsapp, city, uf) VALUES ($1, $2, $3, $4, $5, $6) returning *', [
      generateRandomText(),
      generateRandomText(),
      generateRandomText(),
      generateRandomText(),
      generateRandomText(),
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

    console.log(incident)

    expect(incident).toBeTruthy()
    expect(incident.id).toBeTruthy()
    expect(incident.title).toBe(fakeIncident.title)
    expect(incident.description).toBe(fakeIncident.description)
    expect(incident.value).toBe(fakeIncident.value)
    expect(incident.ongId).toBe(fakeIncident.ongId)
  })
})
