import { CreateOngUseCase } from './create-ong-usecase'
import type { CreateOngRepositoryType } from '../repositories/create-ong-repository'

function CreateOngRepository (): CreateOngRepositoryType {
  return {
    perform: jest.fn().mockReturnValue(new Promise((resolve, reject) => resolve(makeFakeOng())))
  }
}

function makeFakeOngData () {
  return {
    name: 'any name',
    email: 'any@email.com',
    whatsapp: '98900000000',
    city: 'any city',
    uf: 'uf'
  }
}

function makeFakeOng () {
  return {
    id: 'valid id',
    ...makeFakeOngData()
  }
}

describe('CreateOngUseCase', () => {
  let createOngRepository: CreateOngRepositoryType

  const fakeOng = makeFakeOngData()

  beforeEach(() => {
    createOngRepository = CreateOngRepository()
  })

  it('calls CreateOngRepository with correct values', async () => {
    const sut = CreateOngUseCase(createOngRepository)

    const createOngRepositorySpy = jest.spyOn(createOngRepository, 'perform')

    await sut.perform(fakeOng)

    expect(createOngRepositorySpy).toHaveBeenCalledWith(fakeOng)
  })
  it('throws if CreateOngRepository throws', async () => {
    const sut = CreateOngUseCase(createOngRepository)

    jest.spyOn(createOngRepository, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(fakeOng)

    expect(promise).rejects.toThrow()
  })
  it('create a valid ong', async () => {
    const sut = CreateOngUseCase(createOngRepository)

    const ong = await sut.perform(fakeOng)

    expect(ong).toEqual(makeFakeOng())
  })
})
