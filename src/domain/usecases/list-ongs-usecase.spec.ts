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
  it('calls ListOngRepository once', async () => {
    const listOngsRepository = ListOngsRepository()
    const listOngsUseCase = ListOngsUseCase(listOngsRepository)
    const listOngsRepositorySpy = jest.spyOn(listOngsRepository, 'perform')

    await listOngsUseCase.perform()

    expect(listOngsRepositorySpy).toHaveBeenCalledTimes(1)
  })
})
