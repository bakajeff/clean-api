import { ListOngsUseCaseType } from '../../domain/usecases/list-ongs-usecase'
import { HttpRequestType, HttpResponseType, ok, serverError } from '../helpers/http-helper'

export function ListOngsRouter (listOngsUseCase: ListOngsUseCaseType) {
  async function perform (httpRequest?: HttpRequestType): Promise<HttpResponseType> {
    try {
      const ongs = await listOngsUseCase.perform()
      return ok(ongs)
    } catch (error) {
      return serverError(error as Error)
    }
  }
  return {
    perform
  }
}
