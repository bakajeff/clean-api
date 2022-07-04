import { OngModel } from '../models/ong'

type ListOngsRepositoryType = {
  perform: () => Promise<OngModel[]>
}

function ListOngsRepository () {
  return {
    perform: jest.fn()
  }
}

function ListOngsUseCase (listOngsRepository: ListOngsRepositoryType) {
  async function perform () {
    await listOngsRepository.perform()
  }
  return {
    perform
  }
}

describe('ListOngsUseCase', () => {
  it('calls ListOngsRepository once', async () => {
    const listOngsRepository = ListOngsRepository()
    const listOngsUseCase = ListOngsUseCase(listOngsRepository)
    const listOngsRepositorySpy = jest.spyOn(listOngsRepository, 'perform')

    await listOngsUseCase.perform()

    expect(listOngsRepositorySpy).toHaveBeenCalledTimes(1)
  })
  it('throws if ListOngsRepository throws', async () => {
    const listOngsRepository = ListOngsRepository()
    const listOngsUseCase = ListOngsUseCase(listOngsRepository)

    jest.spyOn(listOngsRepository, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = listOngsUseCase.perform()

    expect(promise).rejects.toThrow()
  })
})
