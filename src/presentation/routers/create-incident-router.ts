import { CreateIncidentUseCaseType } from '../../domain/usecases/create-incident-usecase'
import { InvalidParamError } from '../../utils/errors/invalid-param-error'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { badRequest, HttpRequestType, HttpResponseType, ok, serverError } from '../helpers/http-helper'

export function CreateIncidentRouter (createIncidentUseCase: CreateIncidentUseCaseType) {
  const requiredFields = ['title', 'description', 'value', 'ongId']

  async function perform (httpRequest: HttpRequestType): Promise<HttpResponseType> {
    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const { title, description, value, ongId } = httpRequest.body

      const incident = await createIncidentUseCase.perform({
        title,
        description,
        value,
        ongId
      })

      return ok(incident)
    } catch (error) {
      if (error instanceof InvalidParamError) {
        return badRequest(error)
      }
      return serverError(error as Error)
    }
  }
  return {
    perform
  }
}
