import { ServerError } from '../errors/server-error'

export type HttpRequestType = {
  body?: any
}

export type HttpResponseType = {
  statusCode: number
  body: any
}

export function badRequest (error: Error): HttpResponseType {
  return {
    statusCode: 400,
    body: error
  }
}

export function serverError (error: Error): HttpResponseType {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

export function ok (data: any): HttpResponseType {
  return {
    statusCode: 200,
    body: data
  }
}
