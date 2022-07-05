import { CreateIncidentRepositoryType } from '../../domain/repositories/create-incident-repository'
import { badRequest, HttpRequestType, HttpResponseType } from '../helpers/http-helper'

function CreateIncidentRouter (createIncidentRepository: CreateIncidentRepositoryType) {
  async function perform (httpRequest: HttpRequestType): Promise<HttpResponseType> {
    return badRequest(new Error('title is a required field'))
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

    expect(httpResponse.statusCode).toBe(400)
  })
})
