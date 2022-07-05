import crypto from 'crypto'
import { CreateIncidentUseCase } from './create-incident-usecase'

function generateRandomText () {
  return crypto.randomBytes(20).toString('hex')
}

function generateRandomNumber () {
  return Math.random() * 2.5
}

function makeFakeIncidentData () {
  return {
    title: generateRandomText(),
    description: generateRandomText(),
    value: generateRandomNumber(),
    ongId: generateRandomText()
  }
}

describe('CreateIncidentUseCase', () => {
  const createIncidentRepository = { perform: jest.fn() }

  it('calls CreateIncidentRepository once', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')

    await sut.perform(makeFakeIncidentData())

    expect(createIncidentRepositorySpy).toHaveBeenCalledTimes(1)
  })
  it('throws if CreateIncidentRepository throws', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository)
    jest.spyOn(createIncidentRepository, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(makeFakeIncidentData())

    expect(promise).rejects.toThrow()
  })
  it('calls CreateIncidentRepository with correct values', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository)
    const fakeIncident = makeFakeIncidentData()

    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')
    await sut.perform(fakeIncident)

    expect(createIncidentRepositorySpy).toHaveBeenCalledWith(fakeIncident)
  })
  it('create a valid incident', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository)
    const fakeIncident = makeFakeIncidentData()
    const expectedIncident = {
      id: generateRandomText(),
      ...fakeIncident
    }

    jest.spyOn(createIncidentRepository, 'perform').mockResolvedValueOnce(expectedIncident)
    const incident = await sut.perform(fakeIncident)

    expect(incident).toEqual(expectedIncident)
  })
})
