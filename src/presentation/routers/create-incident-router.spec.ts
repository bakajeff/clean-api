import crypto from 'crypto'

import { CreateIncidentRepositoryType } from '../../domain/repositories/create-incident-repository'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { badRequest, HttpRequestType, HttpResponseType, ok, serverError } from '../helpers/http-helper'

function CreateIncidentRouter (createIncidentRepository: CreateIncidentRepositoryType) {
  const requiredFields = ['title', 'description', 'value', 'ongId']

  async function perform (httpRequest: HttpRequestType): Promise<HttpResponseType> {
    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const { title, description, value, ongId } = httpRequest.body

      const incident = await createIncidentRepository.perform({
        title,
        description,
        value,
        ongId
      })

      return ok(incident)
    } catch (error) {
      return serverError()
    }
  }
  return {
    perform
  }
}

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
  const createIncidentRepository = { perform: jest.fn() }

  it('returns 400 if no title', async () => {
    const sut = CreateIncidentRouter(createIncidentRepository)
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
    const sut = CreateIncidentRouter(createIncidentRepository)
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
    const sut = CreateIncidentRouter(createIncidentRepository)
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
    const sut = CreateIncidentRouter(createIncidentRepository)
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
  it('calls CreateInsidentRepository once', async () => {
    const sut = CreateIncidentRouter(createIncidentRepository)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')

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
  it('calls CreateInsidentRepository with correct values', async () => {
    const sut = CreateIncidentRouter(createIncidentRepository)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')

    const httpRequest = makeFakeRequest()

    await sut.perform(httpRequest)

    expect(createIncidentRepositorySpy).toHaveBeenCalledWith(httpRequest.body)
  })
  it('returns 500 if CreateInsidentRepository throws', async () => {
    const sut = CreateIncidentRouter(createIncidentRepository)
    jest.spyOn(createIncidentRepository, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeFakeRequest()

    await sut.perform(httpRequest)
  })
  it('returns 200 on success', async () => {
    const sut = CreateIncidentRouter(createIncidentRepository)
    const httpRequest = makeFakeRequest()
    const fakeOng = {
      id: generateRandomText(),
      ...httpRequest.body
    }
    jest.spyOn(createIncidentRepository, 'perform').mockResolvedValueOnce(fakeOng)

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(ok(fakeOng))
  })
})
