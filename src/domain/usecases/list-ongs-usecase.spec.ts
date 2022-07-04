import { OngModel } from '../models/ong'
import { ListOngsUseCase } from './list-ongs-usecase'

function ListOngsRepository () {
  return {
    perform: jest.fn()
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
  it('retuns ongs on success', async () => {
    const listOngsRepository = ListOngsRepository()
    const listOngsUseCase = ListOngsUseCase(listOngsRepository)

    const expectedResponse: OngModel[] = [
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

    jest.spyOn(listOngsRepository, 'perform').mockResolvedValueOnce(expectedResponse)

    const ongs = await listOngsUseCase.perform()

    expect(ongs).toBeTruthy()
    expect(ongs).toEqual(expectedResponse)
  })
})
