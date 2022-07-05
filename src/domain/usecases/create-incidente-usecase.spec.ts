import crypto from 'crypto'

type IncidentType = {
  title: string,
  description: string,
  value: number,
  ongId: string
}

function CreateIncidentUseCase (createIncidentRepository: any) {
  async function perform (incident: IncidentType) {
    createIncidentRepository.perform(incident)
  }
  return {
    perform
  }
}

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
  it('calls CreateIncidentRepository once', async () => {
    const createIncidentRepository = {
      perform: jest.fn()
    }
    const sut = CreateIncidentUseCase(createIncidentRepository)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')

    await sut.perform(makeFakeIncidentData())

    expect(createIncidentRepositorySpy).toHaveBeenCalledTimes(1)
  })
  it('throws if CreateIncidentRepository throws', async () => {
    const createIncidentRepository = {
      perform: jest.fn()
    }
    const sut = CreateIncidentUseCase(createIncidentRepository)
    jest.spyOn(createIncidentRepository, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(makeFakeIncidentData())

    expect(promise).rejects.toThrow()
  })
  it('calls CreateIncidentRepository with correct values', async () => {
    const createIncidentRepository = {
      perform: jest.fn()
    }
    const sut = CreateIncidentUseCase(createIncidentRepository)
    const fakeIncident = makeFakeIncidentData()

    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')
    await sut.perform(fakeIncident)

    expect(createIncidentRepositorySpy).toHaveBeenCalledWith(fakeIncident)
  })
})
