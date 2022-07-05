import { db } from '../helpers/pg-promise-helper'
import { CreateOngRepositorySql } from './create-ong-repository-sql'

function UniqueIdGenerator () {
  return {
    perform: jest.fn()
  }
}

describe('CreateOngRepositorySql', () => {
  beforeEach(async () => {
    await db.none('delete from incidents')
    await db.none('delete from ongs')
  })

  afterAll(async () => {
    await db.none('delete from incidents')
    await db.none('delete from ongs')
  })

  it('calls UniqueIdGenerator once', async () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const sut = CreateOngRepositorySql(uniqueIdGenerator)

    const uniqueIdGeneratorSpy = jest.spyOn(uniqueIdGenerator, 'perform').mockReturnValueOnce('any id')
    await sut.perform({
      name: 'any name',
      email: 'any@mail.com',
      whatsapp: '98900000000',
      city: 'any city',
      uf: 'uf'
    })

    expect(uniqueIdGeneratorSpy).toHaveBeenCalledTimes(1)
  })
  it('throws if UniqueIdGenerator throws', async () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const sut = CreateOngRepositorySql(uniqueIdGenerator)

    jest.spyOn(uniqueIdGenerator, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform({
      name: 'any name',
      email: 'any@mail.com',
      whatsapp: '98900000000',
      city: 'any city',
      uf: 'uf'
    })

    expect(promise).rejects.toThrow()
  })
  it('returns an valid ong on success', async () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const sut = CreateOngRepositorySql(uniqueIdGenerator)

    jest.spyOn(uniqueIdGenerator, 'perform').mockReturnValueOnce('valid id')

    const ong = await sut.perform({
      name: 'any name',
      email: 'any@mail.com',
      whatsapp: '98900000000',
      city: 'any city',
      uf: 'uf'
    })

    expect(ong).toBeTruthy()
    expect(ong.id).toBeTruthy()
    expect(ong.name).toBe('any name')
    expect(ong.email).toBe('any@mail.com')
    expect(ong.whatsapp).toBe('98900000000')
    expect(ong.city).toBe('any city')
    expect(ong.uf).toBe('uf')
  })
})
