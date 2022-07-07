import { CreateIncidentUseCase } from './create-incident-usecase'
import { GenerateRandomString } from '../../utils/helpers/generate-random-string'
import { InvalidParamError } from '../../utils/errors/invalid-param-error'

function generateRandomNumber () {
  return Math.random() * 2.5
}

function makeFakeIncidentData () {
  return {
    title: GenerateRandomString(),
    description: GenerateRandomString(),
    value: generateRandomNumber(),
    ongId: GenerateRandomString()
  }
}

describe('CreateIncidentUseCase', () => {
  const createIncidentRepository = { perform: jest.fn() }
  const getOngByIdRepository = { perform: jest.fn().mockReturnValue({}) }

  it('calls CreateIncidentRepository once', async () => {
    const createIncidentRepository = { perform: jest.fn() }
    const sut = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')

    await sut.perform(makeFakeIncidentData())

    expect(createIncidentRepositorySpy).toHaveBeenCalledTimes(1)
  })
  it('throws if CreateIncidentRepository throws', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    jest.spyOn(createIncidentRepository, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(makeFakeIncidentData())

    expect(promise).rejects.toThrow()
  })
  it('calls CreateIncidentRepository with correct values', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    const fakeIncident = makeFakeIncidentData()

    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')
    await sut.perform(fakeIncident)

    expect(createIncidentRepositorySpy).toHaveBeenCalledWith(fakeIncident)
  })
  it('calls getOngByIdRepository once', async () => {
    const getOngByIdRepository = { perform: jest.fn().mockResolvedValue({}) }
    const sut = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    const getOngByIdRepositorySpy = jest.spyOn(getOngByIdRepository, 'perform')

    await sut.perform(makeFakeIncidentData())

    expect(getOngByIdRepositorySpy).toHaveBeenCalledTimes(1)
  })
  it('calls getOngByIdRepository with correct value', async () => {
    const getOngByIdRepository = { perform: jest.fn().mockResolvedValue({}) }
    const sut = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    const getOngByIdRepositorySpy = jest.spyOn(getOngByIdRepository, 'perform')
    const fakeIncident = makeFakeIncidentData()

    await sut.perform(fakeIncident)

    expect(getOngByIdRepositorySpy).toHaveBeenCalledWith(fakeIncident.ongId)
  })
  it('throws if invalid ongId', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    const fakeIncident = makeFakeIncidentData()

    jest.spyOn(getOngByIdRepository, 'perform').mockResolvedValueOnce(null)
    const promise = sut.perform(fakeIncident)

    expect(promise).rejects.toThrow(new InvalidParamError('ongId'))
  })
  it('create a valid incident', async () => {
    const sut = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    const fakeIncident = makeFakeIncidentData()
    const expectedIncident = {
      id: GenerateRandomString(),
      ...fakeIncident
    }

    jest.spyOn(createIncidentRepository, 'perform').mockResolvedValueOnce(expectedIncident)
    const incident = await sut.perform(fakeIncident)

    expect(incident).toEqual(expectedIncident)
  })
})
