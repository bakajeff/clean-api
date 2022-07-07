import { MissingParamError } from '../../utils/errors/missing-param-error'
import { GenerateRandomString } from '../../utils/helpers/generate-random-string'
import { ServerError } from '../errors/server-error'
import { badRequest, HttpRequestType, ok, serverError } from '../helpers/http-helper'
import { CreateIncidentRouter } from './create-incident-router'

function makeFakeRequest (): HttpRequestType {
  return {
    body: {
      title: GenerateRandomString(),
      description: GenerateRandomString(),
      value: Math.random() * 2.5,
      ongId: GenerateRandomString()
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

    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  it('returns 200 on success', async () => {
    const sut = CreateIncidentRouter(createIncidentUseCase)
    const httpRequest = makeFakeRequest()
    const fakeOng = {
      id: GenerateRandomString(),
      ...httpRequest.body
    }
    jest.spyOn(createIncidentUseCase, 'perform').mockResolvedValueOnce(fakeOng)

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(ok(fakeOng))
  })
})
