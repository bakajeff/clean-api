import { ListOngsUseCaseType } from '../../domain/usecases/list-ongs-usecase'
import { HttpRequestType, HttpResponseType, ok } from '../helpers/http-helper'

function ListOngsUseCase () {
  return {
    perform: jest.fn()
  }
}

function ListOngsRouter (listOngsUseCase: ListOngsUseCaseType) {
  async function perform (httpRequest?: HttpRequestType): Promise<HttpResponseType> {
    const ongs = await listOngsUseCase.perform()
    return ok(ongs)
  }
  return {
    perform
  }
}

describe('ListOngsRouter', () => {
  it('calls ListOngsUseCase once', async () => {
    const listOngsUseCase = ListOngsUseCase()
    const listOngsRouter = ListOngsRouter(listOngsUseCase)
    const listOngsUseCaseSpy = jest.spyOn(listOngsUseCase, 'perform')

    await listOngsRouter.perform()

    expect(listOngsUseCaseSpy).toHaveBeenCalledTimes(1)
  })
  it('returns 200 on success', async () => {
    const listOngsUseCase = ListOngsUseCase()
    const listOngsRouter = ListOngsRouter(listOngsUseCase)

    const httpResponse = await listOngsRouter.perform()

    expect(httpResponse.statusCode).toBe(200)
  })
})
