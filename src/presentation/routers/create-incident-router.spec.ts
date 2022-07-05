import { CreateIncidentRepositoryType } from '../../domain/repositories/create-incident-repository'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { badRequest, HttpRequestType, HttpResponseType, ok } from '../helpers/http-helper'

function CreateIncidentRouter (createIncidentRepository: CreateIncidentRepositoryType) {
  async function perform (httpRequest: HttpRequestType): Promise<HttpResponseType> {
    if (!httpRequest.body.title) return badRequest(new MissingParamError('title'))
    if (!httpRequest.body.description) return badRequest(new MissingParamError('description'))
    if (!httpRequest.body.value) return badRequest(new MissingParamError('value'))
    if (!httpRequest.body.ongId) return badRequest(new MissingParamError('ongId'))

    return ok('ok')
  }
  return {
    perform
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
})
