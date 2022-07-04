import { RouterType } from '../../presentation/helpers/router'
import { Request, Response } from 'express'

export function ExpressRouterAdapter (route: RouterType) {
  return async (request: Request, response: Response) => {
    const httpRequest = {
      body: request.body
    }
    const httpResponse = await route.perform(httpRequest)
    if (httpResponse.statusCode === 200) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
