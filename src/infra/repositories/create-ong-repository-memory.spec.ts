import { OngType } from '../../domain/models/ong'
import { CreateOngRepositoryMemory } from './create-ong-repository-memory'

const UniqueIdGenerator = () => {
  return {
    perform: jest.fn(() => 'valid id')
  }
}

function makeFakeOng (): OngType {
  return {
    name: 'any name',
    email: 'any@mail.com',
    whatsapp: '98900000000',
    city: 'any city',
    uf: 'uf'
  }
}

describe('CreateOngRepositoryMemory', () => {
  it('calls UniqueIdGerenerator once', async () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const sut = CreateOngRepositoryMemory(uniqueIdGenerator)
    const uniqueIdGeneratorSpy = jest.spyOn(uniqueIdGenerator, 'perform')

    await sut.perform(makeFakeOng())

    expect(uniqueIdGeneratorSpy).toHaveBeenCalledTimes(1)
  })
  it('throws if UniqueIdGerenerator throws', async () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const sut = CreateOngRepositoryMemory(uniqueIdGenerator)

    jest.spyOn(uniqueIdGenerator, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(makeFakeOng())

    expect(promise).rejects.toThrow()
  })
  it('returns an org in success', async () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const sut = CreateOngRepositoryMemory(uniqueIdGenerator)

    const ong = await sut.perform(makeFakeOng())

    expect(ong).toBeTruthy()
    expect(ong.id).toBeTruthy()
    expect(ong.name).toBe('any name')
    expect(ong.email).toBe('any@mail.com')
    expect(ong.whatsapp).toBe('98900000000')
    expect(ong.city).toBe('any city')
    expect(ong.uf).toBe('uf')
  })
})
