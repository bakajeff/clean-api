import { ListOngsUseCaseType } from '../../domain/usecases/list-ongs-usecase'
import { HttpRequestType, HttpResponseType, ok, serverError } from '../helpers/http-helper'

function ListOngsUseCase () {
  return {
    perform: jest.fn()
  }
}

function ListOngsRouter (listOngsUseCase: ListOngsUseCaseType) {
  async function perform (httpRequest?: HttpRequestType): Promise<HttpResponseType> {
    try {
      const ongs = await listOngsUseCase.perform()
      return ok(ongs)
    } catch (error) {
      return serverError()
    }
  }
  return {
    perform
  }
}

describe('ListOngsRouter', () => {
  it('calls ListOngsUseCase once', async () => {
    const listOngsUseCase = ListOngsUseCase()
    const sut = ListOngsRouter(listOngsUseCase)
    const listOngsUseCaseSpy = jest.spyOn(listOngsUseCase, 'perform')

    await sut.perform()

    expect(listOngsUseCaseSpy).toHaveBeenCalledTimes(1)
  })
  it('retuns 500 if ListOngsUseCase throws', async () => {
    const listOngsUseCase = ListOngsUseCase()
    const sut = ListOngsRouter(listOngsUseCase)

    jest.spyOn(listOngsUseCase, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.perform()

    expect(httpResponse.statusCode).toBe(500)
  })
  it('returns 200 on success', async () => {
    const listOngsUseCase = ListOngsUseCase()
    const sut = ListOngsRouter(listOngsUseCase)

    const httpResponse = await sut.perform()

    expect(httpResponse.statusCode).toBe(200)
  })
})
