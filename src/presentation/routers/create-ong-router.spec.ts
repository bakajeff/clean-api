import { OngModel } from '../../domain/models/ong'
import { CreateOngUseCaseType } from '../../domain/usecases/create-ong-usecase'
import { InvalidParamError } from '../../utils/errors/invalid-param-error'
import { MissingParamError } from '../../utils/errors/missing-param-error'
import { EmailValidatorType } from '../../utils/helpers/email-validator'
import { WhatsappValidatorType } from '../../utils/helpers/whatsapp-validator'
import { ServerError } from '../errors/server-error'
import { badRequest, ok, HttpRequestType, serverError } from '../helpers/http-helper'
import { CreateOngRouter } from './create-ong-router'

function EmailValidator () {
  return {
    perform: jest.fn().mockReturnValue(true)
  }
}

function WhatsappValidator () {
  return {
    perform: jest.fn().mockReturnValue(true)
  }
}

function CreateOngUseCase () {
  return {
    perform: jest.fn().mockResolvedValue(makeFakeOng())
  }
}

function makeFakeRequest (): HttpRequestType {
  return {
    body: {
      name: 'any name',
      email: 'any@mail.com',
      whatsapp: '98900000000',
      city: 'any city',
      uf: 'uf'
    }
  }
}

function makeFakeOng (): OngModel {
  return {
    id: 'valid id',
    name: 'valid name',
    email: 'valid@mail.com',
    whatsapp: '98900000000',
    city: 'valid city',
    uf: 'uf'
  }
}

describe('CreateOngRouter', () => {
  let emailValidator: EmailValidatorType
  let whatsappValidator: WhatsappValidatorType
  let createOngUseCase: CreateOngUseCaseType

  beforeEach(() => {
    emailValidator = EmailValidator()
    whatsappValidator = WhatsappValidator()
    createOngUseCase = CreateOngUseCase()
  })

  it('returns 400 if no name', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = {
      body: {
        // name: 'any name',
        email: 'any@mail.com',
        whatsapp: '98900000000',
        city: 'any city',
        uf: 'uf'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
  it('returns 400 if no email', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = {
      body: {
        name: 'any name',
        // email: 'any@mail.com',
        whatsapp: '98900000000',
        city: 'any city',
        uf: 'uf'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
  it('returns 400 if no whatsapp', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any@mail.com',
        // whatsapp: 98900000000,
        city: 'any city',
        uf: 'uf'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('whatsapp')))
  })
  it('returns 400 if no city', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any@mail.com',
        whatsapp: '98900000000',
        // city: 'any city',
        uf: 'uf'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('city')))
  })
  it('returns 400 if no uf', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any@mail.com',
        whatsapp: '98900000000',
        city: 'any city'
        // uf: 'uf'
      }
    }

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('uf')))
  })
  it('call email validator with correct value', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = makeFakeRequest()

    const emailValidatorSpy = jest.spyOn(emailValidator, 'perform')
    await sut.perform(httpRequest)

    expect(emailValidatorSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })
  it('returns 400 if email is invalid', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'invalid@mail.com',
        whatsapp: '98900000000',
        city: 'any city',
        uf: 'uf'
      }
    }

    jest.spyOn(emailValidator, 'perform').mockReturnValueOnce(false)
    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })
  it('returns 500 if email validator throws', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = makeFakeRequest()

    jest.spyOn(emailValidator, 'perform').mockImplementation(() => {
      throw new Error()
    })
    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  it('calls whatsappValidator with correct value', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = makeFakeRequest()

    const whatsappValidatorSpy = jest.spyOn(whatsappValidator, 'perform')
    await sut.perform(httpRequest)

    expect(whatsappValidatorSpy).toHaveBeenCalledWith(httpRequest.body.whatsapp)
  })
  it('returns 400 if whatsapp is invalid', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = {
      body: {
        name: 'any name',
        email: 'any@mail.com',
        whatsapp: '9',
        city: 'any city',
        uf: 'uf'
      }
    }

    jest.spyOn(whatsappValidator, 'perform').mockReturnValueOnce(false)
    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('whatsapp')))
  })
  it('returns 500 if whatsapp validator throws', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = makeFakeRequest()

    jest.spyOn(whatsappValidator, 'perform').mockImplementation(() => {
      throw new Error()
    })
    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  it('calls CreateOngUseCase with correct values', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = makeFakeRequest()

    const createOngUseCaseSpy = jest.spyOn(createOngUseCase, 'perform')

    await sut.perform(httpRequest)

    expect(createOngUseCaseSpy).toHaveBeenCalledWith({
      name: 'any name',
      email: 'any@mail.com',
      whatsapp: '98900000000',
      city: 'any city',
      uf: 'uf'
    })
  })
  it('throws if CreateOngUseCase throws', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = makeFakeRequest()

    jest.spyOn(createOngUseCase, 'perform').mockImplementation(() => {
      throw new Error()
    })

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  it('returns 200 when valid data', async () => {
    const sut = CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
    const httpRequest = makeFakeRequest()

    const httpResponse = await sut.perform(httpRequest)

    expect(httpResponse).toEqual(ok(makeFakeOng()))
  })
})
