import { CreateOngUseCaseType } from '../../domain/usecases/create-ong-usecase'
import { InvalidParamError } from '../../utils/errors/invalid-param-error'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { EmailValidatorType } from '../../utils/helpers/email-validator'
import { WhatsappValidatorType } from '../../utils/helpers/whatsapp-validator'
import { badRequest, ok, HttpRequestType, HttpResponseType, serverError } from '../helpers/http-helper'
import { RouterType } from '../helpers/router'

export function CreateOngRouter (emailValidator: EmailValidatorType, whatsappValidator: WhatsappValidatorType, createOngUseCase: CreateOngUseCaseType): RouterType {
  const requiredFields = ['name', 'email', 'whatsapp', 'city', 'uf']

  async function perform (httpRequest: HttpRequestType): Promise<HttpResponseType> {
    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const { name, email, whatsapp, city, uf } = httpRequest.body

      const isEmailValid = emailValidator.perform(email)
      if (!isEmailValid) return badRequest(new InvalidParamError('email'))

      const isWhatsappValid = whatsappValidator.perform(whatsapp)
      if (!isWhatsappValid) return badRequest(new InvalidParamError('whatsapp'))

      const ong = await createOngUseCase.perform({
        name,
        email,
        whatsapp,
        city,
        uf
      })

      return ok(ong)
    } catch (error) {
      return serverError()
    }
  }

  return {
    perform
  }
}
