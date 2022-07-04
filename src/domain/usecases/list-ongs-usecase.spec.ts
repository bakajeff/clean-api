import { ListOngsRepositoryType, ListOngsUseCase, ListOngsUseCaseType } from './list-ongs-usecase'

function ListOngsRepository (): ListOngsRepositoryType {
  return {
    perform: jest.fn()
  }
}

function makeFakeResponse () {
  return [
    {
      id: 'any id',
      email: 'any@mail.com',
      city: 'any city',
      name: 'any name',
      whatsapp: '98900000000',
      uf: 'uf'
    },
    {
      id: 'any other id',
      email: 'any_other@mail.com',
      city: 'any city',
      name: 'any other name',
      whatsapp: '98900000001',
      uf: 'uf'
    }
  ]
}

describe('ListOngsUseCase', () => {
  let listOngsRepository: ListOngsRepositoryType
  let sut: ListOngsUseCaseType

  beforeEach(() => {
    listOngsRepository = ListOngsRepository()
    sut = ListOngsUseCase(listOngsRepository)
  })

  it('calls ListOngsRepository once', async () => {
    const listOngsRepositorySpy = jest.spyOn(listOngsRepository, 'perform')

    await sut.perform()

    expect(listOngsRepositorySpy).toHaveBeenCalledTimes(1)
  })
  it('throws if ListOngsRepository throws', async () => {
    jest.spyOn(listOngsRepository, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform()

    expect(promise).rejects.toThrow()
  })
  it('retuns ongs on success', async () => {
    jest.spyOn(listOngsRepository, 'perform').mockResolvedValueOnce(makeFakeResponse())

    const ongs = await sut.perform()

    expect(ongs).toBeTruthy()
    expect(ongs).toEqual(makeFakeResponse())
  })
})
