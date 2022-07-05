import crypto from 'crypto'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { badRequest, HttpRequestType, ok, serverError } from '../helpers/http-helper'
import { CreateIncidentRouter } from './create-incident-router'

function generateRandomText () {
  return crypto.randomBytes(20).toString('hex')
}

function makeFakeRequest (): HttpRequestType {
  return {
    body: {
      title: generateRandomText(),
      description: generateRandomText(),
      value: Math.random() * 2.5,
      ongId: generateRandomText()
    }
  }
}

describe('CreateIncidentRouter', () => {
  const createIncidentUseCase = { perform: jest.fn() }

  it('returns 400 if no title', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const httpRequest = {
      body: {
        // title: 'any title',
        description: 'any description',
        value: 245453.53453,
        ongId: 'any ong id'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
  })
  it('returns 400 if no description', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const httpRequest = {
      body: {
        title: 'any title',
        // description: 'any description',
        value: 245453.53453,
        ongId: 'any ong id'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
  })
  it('returns 400 if no value', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        // value: 245453.53453,
        ongId: 'any ong id'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('value')))
  })
  it('returns 400 if no ongId', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        value: 245453.53453
        // ongId: 'any ong id'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('ongId')))
  })
  it('calls CreateIncidentUseCase once', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentUseCase, 'perform')

    const httpRequest = {
      body: {
        title: 'any title',
        description: 'any description',
        value: 245453.53453,
        ongId: 'any ong id'
      }
    }

    await sut.perform(httpRequest)

    expect(createIncidentRepositorySpy).toHaveBeenCalledTimes(1)
  })
  it('calls CreateIncidentUseCase with correct values', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentUseCase, 'perform')

    const httpRequest = makeFakeRequest()

    await sut.perform(httpRequest)

    expect(createIncidentRepositorySpy).toHaveBeenCalledWith(httpRequest.body)
  })
  it('returns 500 if CreateIncidentUseCase throws', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    jest.spyOn(createIncidentUseCase, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(serverError())
  })
  it('returns 200 on success', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const httpRequest = makeFakeRequest()
    const fakeOng = {
      id: generateRandomText(),
      ...httpRequest.body
    }
    jest.spyOn(createIncidentUseCase, 'perform').mockResolvedValueOnce(fakeOng)

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(ok(fakeOng))
  })
})
