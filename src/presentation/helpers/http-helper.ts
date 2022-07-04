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

export function serverError (): HttpResponseType {
  return {
    statusCode: 500,
    body: 'Unexpected server error'
  }
}

export function ok (data: any): HttpResponseType {
  return {
    statusCode: 200,
    body: data
  }
}
